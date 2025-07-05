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
            
            const modelURL = APP_CONFIG.MODEL.URL + 'model.json';
            const metadataURL = APP_CONFIG.MODEL.URL + 'metadata.json';

            // Check if model files exist
            await this.validateModelFiles(modelURL, metadataURL);

            // Load the model
            this.model = await tmImage.load(modelURL, metadataURL);
            this.maxPredictions = this.model.getTotalClasses();
            
            this.isLoaded = true;
            Utils.showNotification('Model loaded successfully!', 'success');
            
            return true;
        } catch (error) {
            Utils.logError('ModelManager.loadModel', error);
            Utils.showNotification(APP_CONFIG.MESSAGES.ERRORS.MODEL_LOAD_FAILED, 'error');
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
        const checkFile = async (url) => {
            const response = await fetch(url, { method: 'HEAD' });
            if (!response.ok) {
                throw new Error(`Model file not found: ${url}`);
            }
        };

        await Promise.all([
            checkFile(modelURL),
            checkFile(metadataURL)
        ]);
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
            // Load model in background without blocking UI
            setTimeout(() => {
                this.loadModel().catch(error => {
                    Utils.logError('ModelManager.preloadModel', error);
                });
            }, 1000);
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
