/**
 * Model Manager for handling TensorFlow.js model operations
 */
class ModelManager {
    constructor() {
        this.model = null;
        this.maxPredictions = 0;
        this.isLoading = false;
        this.isLoaded = false;
    }

    /**
     * Loads the TensorFlow.js model
     * @returns {Promise<boolean>} - Success status
     */
    async loadModel() {
        if (this.isLoaded) {
            return true;
        }

        if (this.isLoading) {
            // Wait for existing load to complete
            while (this.isLoading) {
                await Utils.delay(100);
            }
            return this.isLoaded;
        }

        this.isLoading = true;

        try {
            Utils.showNotification('Loading prediction model...', 'info');
            
            // Special handling for local file:// protocol
            let modelURL, metadataURL;
            
            if (window.location.protocol === 'file:') {
                // For local files, we need absolute paths
                // The simplest solution is to use a relative path from the current HTML file
                modelURL = APP_CONFIG.MODEL.URL + 'model.json';
                metadataURL = APP_CONFIG.MODEL.URL + 'metadata.json';
                console.log('Using local file paths:', { modelURL, metadataURL });
            } else {
                // For HTTP/HTTPS
                modelURL = APP_CONFIG.MODEL.URL + 'model.json';
                metadataURL = APP_CONFIG.MODEL.URL + 'metadata.json';
            }
            
            console.log('Loading model from:', modelURL);
            console.log('Loading metadata from:', metadataURL);

            // Check if model files exist
            await this.validateModelFiles(modelURL, metadataURL);

            // Check if tmImage is defined
            if (typeof tmImage === 'undefined') {
                throw new Error('Teachable Machine library not loaded. Check script imports.');
            }

            // Set correct TensorFlow.js backend for better compatibility
            if (typeof tf !== 'undefined') {
                try {
                    // WebGL is faster but may have compatibility issues
                    // CPU is more compatible but slower
                    if (window.location.protocol === 'file:') {
                        // For local files, prefer CPU backend for compatibility
                        if (tf.findBackend('cpu')) {
                            await tf.setBackend('cpu');
                            console.log('Set TensorFlow.js backend to CPU for better local file compatibility');
                        }
                    }
                    console.log('Using TensorFlow.js backend:', tf.getBackend());
                } catch (backendError) {
                    console.warn('Could not set TensorFlow.js backend:', backendError);
                }
            }

            // Load the model with explicit error handling
            try {
                console.log('Starting model load from:', modelURL);
                this.model = await tmImage.load(modelURL, metadataURL);
                console.log('Model loaded successfully');
            } catch (modelError) {
                console.error('Model loading error details:', modelError);
                throw new Error(`Model loading failed: ${modelError.message}`);
            }
            
            this.maxPredictions = this.model.getTotalClasses();
            console.log(`Model loaded with ${this.maxPredictions} classes`);
            
            this.isLoaded = true;
            Utils.showNotification('Model loaded successfully!', 'success');
            
            return true;
        } catch (error) {
            Utils.logError('ModelManager.loadModel', error);
            // Provide more detailed error message
            const errorMessage = `${APP_CONFIG.MESSAGES.ERRORS.MODEL_LOAD_FAILED} Details: ${error.message}`;
            Utils.showNotification(errorMessage, 'error');
            return false;
        } finally {
            this.isLoading = false;
        }
    }

    /**
     * Validates that model files are accessible
     * @param {string} modelURL - Model JSON URL
     * @param {string} metadataURL - Metadata JSON URL
     */
    async validateModelFiles(modelURL, metadataURL) {
        // For local file:// protocol, we'll skip validation as fetch() won't work
        // due to CORS restrictions in browsers
        if (window.location.protocol === 'file:') {
            console.log('Running from local file system - skipping model file validation');
            console.log('Model URL:', modelURL);
            console.log('Metadata URL:', metadataURL);
            return true;
        }
        
        const checkFile = async (url, fileType) => {
            try {
                console.log(`Checking ${fileType} file at: ${url}`);
                const response = await fetch(url, { 
                    method: 'HEAD',
                    cache: 'no-cache'  // Avoid caching issues
                });
                
                if (!response.ok) {
                    throw new Error(`${fileType} file not found (Status ${response.status}): ${url}`);
                }
                
                console.log(`${fileType} file found successfully`);
                return true;
            } catch (error) {
                console.error(`Error checking ${fileType} file:`, error);
                throw new Error(`Failed to access ${fileType} file: ${error.message}`);
            }
        };

        try {
            await Promise.all([
                checkFile(modelURL, 'Model'),
                checkFile(metadataURL, 'Metadata')
            ]);
            
            // Also check if weights.bin is accessible by deriving its path from modelURL
            const weightsURL = modelURL.replace('model.json', 'weights.bin');
            await checkFile(weightsURL, 'Weights');
            
            console.log('All model files validated successfully');
        } catch (error) {
            console.error('Model files validation failed:', error);
            throw error;
        }
    }

    /**
     * Makes prediction on an image element
     * @param {HTMLImageElement} imageElement - Image element to predict
     * @returns {Promise<Array>} - Prediction results
     */
    async predict(imageElement) {
        if (!this.isLoaded || !this.model) {
            throw new Error('Model not loaded');
        }

        if (!imageElement || !imageElement.src) {
            throw new Error('Invalid image element');
        }

        try {
            const predictions = await this.model.predict(imageElement);
            
            // Validate predictions
            if (!Array.isArray(predictions) || predictions.length === 0) {
                throw new Error('Invalid prediction results');
            }

            return predictions.map(pred => ({
                className: pred.className,
                probability: Math.max(0, Math.min(1, pred.probability)), // Clamp between 0-1
                percentage: Utils.formatPercentage(pred.probability)
            }));
        } catch (error) {
            Utils.logError('ModelManager.predict', error);
            throw new Error(APP_CONFIG.MESSAGES.ERRORS.PREDICTION_FAILED);
        }
    }

    /**
     * Gets model status information
     * @returns {Object} - Model status
     */
    getStatus() {
        return {
            isLoaded: this.isLoaded,
            isLoading: this.isLoading,
            maxPredictions: this.maxPredictions,
            hasModel: !!this.model
        };
    }

    /**
     * Preloads the model in the background
     */
    async preloadModel() {
        if (!this.isLoaded && !this.isLoading) {
            console.log('Preloading model in background...');
            // Load model in background without blocking UI
            setTimeout(async () => {
                try {
                    const success = await this.loadModel();
                    if (success) {
                        console.log('Model preloaded successfully');
                    } else {
                        console.warn('Model preloading did not complete successfully');
                    }
                } catch (error) {
                    Utils.logError('ModelManager.preloadModel', error);
                    console.error('Error during model preloading:', error);
                }
            }, 1000);
        } else {
            console.log('Model already loaded or loading, skipping preload');
        }
    }

    /**
     * Disposes of the model to free memory
     */
    dispose() {
        if (this.model && typeof this.model.dispose === 'function') {
            this.model.dispose();
        }
        this.model = null;
        this.isLoaded = false;
        this.isLoading = false;
        this.maxPredictions = 0;
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModelManager;
}
