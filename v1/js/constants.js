/**
 * Application Constants
 */
const APP_CONFIG = {
    MODEL: {
        URL: 'model/',
        MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
        SUPPORTED_FORMATS: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
        CLASSES: ['FIRE', 'NO-FIRE', 'SMOKE', 'SMOKE-FIRE']
    },
    UI: {
        SPLASH_DURATION: 2500,
        ANIMATION_DURATION: 1000,
        PROGRESS_ELEMENTS: ['fire', 'nofire', 'smoke', 'sfire'],
        PROGRESS_VALUES: ['fireval', 'nfval', 'smokeval', 'sfval']
    },
    MESSAGES: {
        ERRORS: {
            INVALID_FILE: 'Please select a valid image file (JPEG, PNG, WebP)',
            FILE_TOO_LARGE: 'File size must be less than 10MB',
            MODEL_LOAD_FAILED: 'Failed to load the prediction model. Please try again.',
            PREDICTION_FAILED: 'Failed to analyze the image. Please try again.',
            NO_IMAGE_SELECTED: 'Please select an image before classification'
        },
        SUCCESS: {
            MODEL_LOADED: 'Model loaded successfully',
            IMAGE_UPLOADED: 'Image uploaded successfully'
        }
    }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = APP_CONFIG;
}
