/**
 * Main Application Controller
 * Coordinates all application components and handles initialization
 */
class ForestFireApp {
    constructor() {
        this.modelManager = null;
        this.uiManager = null;
        this.isInitialized = false;
        
        // Bind methods to maintain context
        this.init = this.init.bind(this);
        this.handleError = this.handleError.bind(this);
        
        // Set up global error handling
        this.setupGlobalErrorHandling();
    }

    /**
     * Initializes the application
     */
    async init() {
        try {
            Utils.showNotification('Initializing Forest Fire Prediction App...', 'info');
            
            // Wait for DOM to be fully loaded
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }

            // Initialize managers
            this.modelManager = new ModelManager();
            this.uiManager = new UIManager();
            
            // Make managers globally accessible for backward compatibility
            window.modelManager = this.modelManager;
            window.uiManager = this.uiManager;
            
            // Ensure Teachable Machine library is available
            if (typeof tmImage === 'undefined') {
                throw new Error('Teachable Machine library not loaded. Please check your network connection and refresh the page.');
            }
            
            // Ensure TensorFlow.js is available
            if (typeof tf === 'undefined') {
                throw new Error('TensorFlow.js library not loaded. Please check your network connection and refresh the page.');
            }
            
            console.log('TensorFlow.js version:', tf.version);
            console.log('TensorFlow.js backend:', tf.getBackend());
            
            // Preload model in background with a retry mechanism
            this.initModelWithRetry();
            
            // Set up splash screen timer
            this.setupSplashScreen();
            
            this.isInitialized = true;
            Utils.showNotification('Application initialized successfully!', 'success');
            
            // Log app state for debugging
            console.log('App State:', this.getAppState());
            
        } catch (error) {
            this.handleError('App Initialization', error);
        }
    }

    /**
     * Initialize the model with a retry mechanism
     * @param {number} retryCount - Number of retries
     */
    async initModelWithRetry(retryCount = 3) {
        try {
            // First attempt to load the model
            await this.modelManager.preloadModel();
        } catch (error) {
            if (retryCount > 0) {
                Utils.showNotification(`Retrying model load (${retryCount} attempts left)...`, 'info');
                setTimeout(() => {
                    this.initModelWithRetry(retryCount - 1);
                }, 2000);
            } else {
                this.handleError('Model Loading', new Error('Failed to load model after multiple attempts'));
            }
        }
    }

    /**
     * Sets up the splash screen with proper timing
     */
    setupSplashScreen() {
        // Ensure splash screen shows for minimum duration
        setTimeout(() => {
            if (this.uiManager) {
                this.uiManager.showMainApplication();
            }
        }, APP_CONFIG.UI.SPLASH_DURATION);
    }

    /**
     * Sets up global error handling
     */
    setupGlobalErrorHandling() {
        // Handle uncaught errors
        window.addEventListener('error', (event) => {
            this.handleError('Uncaught Error', event.error);
        });

        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.handleError('Unhandled Promise Rejection', event.reason);
            event.preventDefault(); // Prevent default browser error handling
        });

        // Handle TensorFlow.js specific errors
        if (typeof tf !== 'undefined' && tf.ENV) {
            tf.ENV.set('DEBUG', false); // Disable debug mode in production
        }
    }

    /**
     * Global error handler
     * @param {string} context - Context where error occurred
     * @param {Error} error - Error object
     */
    handleError(context, error) {
        Utils.logError(context, error);
        
        // Show user-friendly error message
        const userMessage = this.getUserFriendlyErrorMessage(error);
        Utils.showNotification(userMessage, 'error');
        
        // Reset UI state if necessary
        if (this.uiManager && error.message.includes('model')) {
            this.uiManager.uncheckClassifyButton();
        }
    }

    /**
     * Converts technical errors to user-friendly messages
     * @param {Error} error - Error object
     * @returns {string} - User-friendly error message
     */
    getUserFriendlyErrorMessage(error) {
        if (!error) return 'An unknown error occurred';
        
        const message = error.message.toLowerCase();
        
        if (message.includes('network') || message.includes('fetch')) {
            return 'Network error. Please check your internet connection.';
        }
        
        if (message.includes('model') || message.includes('tensorflow')) {
            return 'Model loading failed. Please refresh the page and try again.';
        }
        
        if (message.includes('file') || message.includes('image')) {
            return 'Invalid image file. Please select a valid image.';
        }
        
        return 'Something went wrong. Please try again.';
    }

    /**
     * Gets current application state for debugging
     * @returns {Object} - Application state
     */
    getAppState() {
        return {
            isInitialized: this.isInitialized,
            modelStatus: this.modelManager?.getStatus() || null,
            uiState: this.uiManager?.getState() || null,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Safely shuts down the application
     */
    shutdown() {
        try {
            // Dispose of model to free memory
            if (this.modelManager) {
                this.modelManager.dispose();
            }
            
            // Clean up event listeners would go here if needed
            
            Utils.showNotification('Application shut down', 'info');
        } catch (error) {
            Utils.logError('App Shutdown', error);
        }
    }

    /**
     * Restarts the application
     */
    async restart() {
        this.shutdown();
        await Utils.delay(1000);
        window.location.reload();
    }
}

// Legacy function support for backward compatibility
function checker() {
    const checkbox = Utils.getElementById('button');
    if (!checkbox) return;
    
    const isChecked = checkbox.checked;
    
    if (isChecked) {
        // Trigger classification through UI manager
        if (window.uiManager) {
            window.uiManager.performClassification();
        } else {
            // Fallback to legacy init function
            if (typeof init === 'function') {
                init();
            }
        }
    } else {
        // Reset application
        if (window.uiManager) {
            window.uiManager.resetApplication();
        } else {
            // Fallback to legacy reload
            setTimeout(() => {
                if (typeof reload === 'function') {
                    reload();
                }
            }, 1000);
        }
    }
}

// Legacy loader function
function loader() {
    if (window.uiManager) {
        window.uiManager.showMainApplication();
    } else {
        // Fallback to original loader logic
        const splashLink = document.querySelector('link[href*="splash.css"]');
        if (splashLink) {
            splashLink.remove();
        }
        
        const mainElement = Utils.getElementById('main');
        const splasherElement = Utils.getElementById('splasher');
        
        if (mainElement) mainElement.style.display = 'block';
        if (splasherElement) splasherElement.style.display = 'none';
    }
}

// Initialize app when page loads
let app;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new ForestFireApp();
        app.init();
    });
} else {
    app = new ForestFireApp();
    app.init();
}

// Make app globally accessible for debugging
window.forestFireApp = app;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ForestFireApp;
}
