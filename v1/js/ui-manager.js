/**
 * UI Manager for handling user interface operations
 */
class UIManager {
    constructor() {
        this.elements = {};
        this.isInitialized = false;
        this.currentImageFile = null;
        
        this.initializeElements();
        this.attachEventListeners();
    }

    /**
     * Initializes DOM element references
     */
    initializeElements() {
        this.elements = {
            // Main containers
            splasher: Utils.getElementById('splasher'),
            main: Utils.getElementById('main'),
            
            // Image upload elements
            uploadInput: Utils.getElementById('upload'),
            uploadLabel: Utils.getElementById('upload-label'),
            imageResult: Utils.getElementById('imageResult'),
            inputImgContainer: Utils.getElementById('inputimg'),
            
            // Classification elements
            classifyButton: Utils.getElementById('button'),
            predictionContainer: Utils.getElementById('pred'),
            
            // Progress bars
            fireProgress: Utils.getElementById('fire'),
            nofireProgress: Utils.getElementById('nofire'),
            smokeProgress: Utils.getElementById('smoke'),
            sfireProgress: Utils.getElementById('sfire'),
            
            // Progress values
            fireValue: Utils.getElementById('fireval'),
            nfValue: Utils.getElementById('nfval'),
            smokeValue: Utils.getElementById('smokeval'),
            sfValue: Utils.getElementById('sfval')
        };

        // Validate critical elements exist
        this.validateCriticalElements();
        this.isInitialized = true;
    }

    /**
     * Validates that critical DOM elements exist
     */
    validateCriticalElements() {
        const critical = ['uploadInput', 'imageResult', 'classifyButton'];
        const missing = critical.filter(key => !this.elements[key]);
        
        if (missing.length > 0) {
            Utils.logError('UIManager', new Error(`Critical elements missing: ${missing.join(', ')}`));
        }
    }

    /**
     * Attaches event listeners to UI elements
     */
    attachEventListeners() {
        // File upload handling
        if (this.elements.uploadInput) {
            this.elements.uploadInput.addEventListener('change', 
                this.handleFileUpload.bind(this)
            );
        }

        // Classification button handling
        if (this.elements.classifyButton) {
            this.elements.classifyButton.addEventListener('change', 
                this.handleClassifyToggle.bind(this)
            );
        }

        // Keyboard accessibility
        document.addEventListener('keydown', this.handleKeyboardNavigation.bind(this));
        
        // Prevent drag and drop on the page
        this.preventDefaultDragDrop();
    }

    /**
     * Handles file upload events with validation
     * @param {Event} event - File input change event
     */
    async handleFileUpload(event) {
        try {
            const file = event.target.files[0];
            
            // Validate file
            const validation = Utils.validateImageFile(file);
            if (!validation.isValid) {
                Utils.showNotification(validation.error, 'error');
                this.resetFileInput();
                return;
            }

            // Read and display image
            const dataURL = await Utils.readFileAsDataURL(file);
            this.displayUploadedImage(dataURL, file.name);
            this.currentImageFile = file;
            
            Utils.showNotification(APP_CONFIG.MESSAGES.SUCCESS.IMAGE_UPLOADED, 'success');
            
        } catch (error) {
            Utils.logError('UIManager.handleFileUpload', error);
            Utils.showNotification('Failed to upload image. Please try again.', 'error');
            this.resetFileInput();
        }
    }

    /**
     * Displays the uploaded image in the UI
     * @param {string} dataURL - Image data URL
     * @param {string} fileName - Original file name
     */
    displayUploadedImage(dataURL, fileName) {
        if (this.elements.imageResult) {
            this.elements.imageResult.src = dataURL;
            this.elements.imageResult.alt = `Uploaded image: ${Utils.sanitizeHTML(fileName)}`;
            this.elements.imageResult.style.display = 'block';
        }

        if (this.elements.uploadLabel) {
            this.elements.uploadLabel.textContent = `File: ${fileName}`;
        }

        if (this.elements.inputImgContainer) {
            this.elements.inputImgContainer.style.marginTop = '100px';
        }

        // Reset any previous predictions
        this.resetPredictionDisplay();
    }

    /**
     * Handles classify button toggle
     * @param {Event} event - Checkbox change event
     */
    async handleClassifyToggle(event) {
        const isChecked = event.target.checked;
        
        if (isChecked) {
            await this.performClassification();
        } else {
            this.resetApplication();
        }
    }

    /**
     * Performs image classification
     */
    async performClassification() {
        if (!this.currentImageFile) {
            Utils.showNotification(APP_CONFIG.MESSAGES.ERRORS.NO_IMAGE_SELECTED, 'error');
            this.uncheckClassifyButton();
            return;
        }

        try {
            // Show loading state
            this.showLoadingState();
            
            // Ensure model is loaded
            const modelLoaded = await window.modelManager.loadModel();
            if (!modelLoaded) {
                throw new Error('Failed to load model');
            }

            // Make prediction
            const predictions = await window.modelManager.predict(this.elements.imageResult);
            
            // Display results
            this.displayPredictionResults(predictions);
            
        } catch (error) {
            Utils.logError('UIManager.performClassification', error);
            Utils.showNotification(error.message || 'Classification failed', 'error');
            this.uncheckClassifyButton();
        } finally {
            this.hideLoadingState();
        }
    }

    /**
     * Displays prediction results in progress bars
     * @param {Array} predictions - Array of prediction objects
     */
    displayPredictionResults(predictions) {
        const progressElements = APP_CONFIG.UI.PROGRESS_ELEMENTS;
        const valueElements = APP_CONFIG.UI.PROGRESS_VALUES;

        predictions.forEach((prediction, index) => {
            if (index < progressElements.length) {
                const progressBar = this.elements[progressElements[index] + 'Progress'] || 
                                  Utils.getElementById(progressElements[index]);
                const valueDisplay = this.elements[valueElements[index] + 'Value'] || 
                                   Utils.getElementById(valueElements[index]);

                if (progressBar && valueDisplay) {
                    const percentage = parseFloat(prediction.percentage);
                    
                    // Animate progress bar
                    this.animateProgressBar(progressBar, percentage);
                    
                    // Update value display
                    valueDisplay.textContent = `${prediction.percentage}%`;
                    valueDisplay.setAttribute('aria-label', 
                        `${prediction.className}: ${prediction.percentage} percent`);
                }
            }
        });

        // Show prediction container
        if (this.elements.predictionContainer) {
            this.elements.predictionContainer.style.display = 'block';
        }
    }

    /**
     * Animates a progress bar to a target width
     * @param {HTMLElement} progressBar - Progress bar element
     * @param {number} targetWidth - Target width percentage
     */
    animateProgressBar(progressBar, targetWidth) {
        if (!progressBar) return;

        // Reset progress bar
        progressBar.style.width = '0%';
        progressBar.style.transition = 'width 0.8s ease-in-out';
        
        // Animate to target width
        setTimeout(() => {
            progressBar.style.width = `${targetWidth}%`;
        }, 100);
    }

    /**
     * Shows loading state during classification
     */
    showLoadingState() {
        // Disable classify button during processing
        if (this.elements.classifyButton) {
            this.elements.classifyButton.disabled = true;
        }

        // You could add a loading spinner here
        Utils.showNotification('Analyzing image...', 'info');
    }

    /**
     * Hides loading state after classification
     */
    hideLoadingState() {
        if (this.elements.classifyButton) {
            this.elements.classifyButton.disabled = false;
        }
    }

    /**
     * Resets the prediction display
     */
    resetPredictionDisplay() {
        const progressElements = APP_CONFIG.UI.PROGRESS_ELEMENTS;
        const valueElements = APP_CONFIG.UI.PROGRESS_VALUES;

        progressElements.forEach((elementId, index) => {
            const progressBar = Utils.getElementById(elementId);
            const valueDisplay = Utils.getElementById(valueElements[index]);

            if (progressBar) {
                progressBar.style.width = '0%';
                progressBar.style.transition = 'none';
            }

            if (valueDisplay) {
                valueDisplay.textContent = '~';
            }
        });
    }

    /**
     * Resets the entire application state
     */
    resetApplication() {
        setTimeout(() => {
            // Reset file input
            this.resetFileInput();
            
            // Reset image display
            if (this.elements.imageResult) {
                this.elements.imageResult.src = '#';
                this.elements.imageResult.style.display = 'none';
            }

            // Reset upload label
            if (this.elements.uploadLabel) {
                this.elements.uploadLabel.textContent = 'Choose file';
            }

            // Reset container margin
            if (this.elements.inputImgContainer) {
                this.elements.inputImgContainer.style.marginTop = '200px';
            }

            // Reset predictions
            this.resetPredictionDisplay();
            
            // Clear current file
            this.currentImageFile = null;
            
            Utils.showNotification('Application reset', 'info');
        }, APP_CONFIG.UI.ANIMATION_DURATION);
    }

    /**
     * Resets the file input element
     */
    resetFileInput() {
        if (this.elements.uploadInput) {
            this.elements.uploadInput.value = '';
        }
    }

    /**
     * Unchecks the classify button
     */
    uncheckClassifyButton() {
        if (this.elements.classifyButton) {
            this.elements.classifyButton.checked = false;
        }
    }

    /**
     * Handles keyboard navigation for accessibility
     * @param {KeyboardEvent} event - Keyboard event
     */
    handleKeyboardNavigation(event) {
        // ESC key to reset
        if (event.key === 'Escape') {
            this.uncheckClassifyButton();
            this.resetApplication();
        }

        // Enter/Space on file input
        if ((event.key === 'Enter' || event.key === ' ') && 
            event.target === this.elements.uploadInput) {
            event.target.click();
        }
    }

    /**
     * Prevents default drag and drop behavior
     */
    preventDefaultDragDrop() {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            document.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        });
    }

    /**
     * Shows the main application (hides splash screen)
     */
    showMainApplication() {
        if (this.elements.splasher) {
            this.elements.splasher.style.display = 'none';
        }
        
        if (this.elements.main) {
            this.elements.main.style.display = 'block';
        }

        // Remove splash CSS to clean up
        const splashLink = document.querySelector('link[href*="splash.css"]');
        if (splashLink) {
            splashLink.remove();
        }
    }

    /**
     * Gets current UI state
     * @returns {Object} - Current state information
     */
    getState() {
        return {
            isInitialized: this.isInitialized,
            hasImage: !!this.currentImageFile,
            isClassifyButtonChecked: this.elements.classifyButton?.checked || false,
            currentFileName: this.currentImageFile?.name || null
        };
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIManager;
}
