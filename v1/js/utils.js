/**
 * Utility functions for the Forest Fire Prediction app
 */
class Utils {
    // Track active toasts to prevent duplicates
    static activeToasts = new Set();
    
    // Track toast container
    static toastContainer = null;
    
    /**
     * Initializes the toast container once
     * @returns {HTMLElement} - The toast container element
     */
    static getToastContainer() {
        if (!this.toastContainer) {
            const container = document.createElement('div');
            container.id = 'toast-container';
            container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                display: flex;
                flex-direction: column;
                gap: 10px;
                z-index: 10000;
                pointer-events: none;
            `;
            document.body.appendChild(container);
            this.toastContainer = container;
        }
        return this.toastContainer;
    }

    /**
     * Validates if a file is a supported image format
     * @param {File} file - The file to validate
     * @returns {Object} - Validation result with isValid boolean and error message
     */
    static validateImageFile(file) {
        if (!file) {
            return {
                isValid: false,
                error: APP_CONFIG.MESSAGES.ERRORS.NO_IMAGE_SELECTED
            };
        }

        // Check file size
        if (file.size > APP_CONFIG.MODEL.MAX_FILE_SIZE) {
            return {
                isValid: false,
                error: APP_CONFIG.MESSAGES.ERRORS.FILE_TOO_LARGE
            };
        }

        // Check file type
        if (!APP_CONFIG.MODEL.SUPPORTED_FORMATS.includes(file.type)) {
            return {
                isValid: false,
                error: APP_CONFIG.MESSAGES.ERRORS.INVALID_FILE
            };
        }

        return { isValid: true };
    }

    /**
     * Safely reads a file as data URL
     * @param {File} file - The file to read
     * @returns {Promise<string>} - Promise that resolves to data URL
     */
    static readFileAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (event) => {
                resolve(event.target.result);
            };
            
            reader.onerror = () => {
                reject(new Error('Failed to read file'));
            };
            
            reader.readAsDataURL(file);
        });
    }

    /**
     * Debounce function to limit rapid function calls
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} - Debounced function
     */
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Safely gets element by ID with error handling
     * @param {string} id - Element ID
     * @returns {HTMLElement|null} - Element or null if not found
     */
    static getElementById(id) {
        const element = document.getElementById(id);
        if (!element) {
            console.warn(`Element with ID '${id}' not found`);
        }
        return element;
    }

    /**
     * Sanitizes HTML content to prevent XSS
     * @param {string} html - HTML string to sanitize
     * @returns {string} - Sanitized HTML
     */
    static sanitizeHTML(html) {
        const temp = document.createElement('div');
        temp.textContent = html;
        return temp.innerHTML;
    }

    /**
     * Formats percentage with proper precision
     * @param {number} value - Value to format
     * @param {number} precision - Decimal places
     * @returns {string} - Formatted percentage
     */
    static formatPercentage(value, precision = 1) {
        return (value * 100).toFixed(precision);
    }

    /**
     * Creates a delay using Promise
     * @param {number} ms - Milliseconds to delay
     * @returns {Promise} - Promise that resolves after delay
     */
    static delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Logs errors with context
     * @param {string} context - Context where error occurred
     * @param {Error} error - Error object
     */
    static logError(context, error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        const errorStack = error instanceof Error ? error.stack : 'No stack trace available';
        
        console.error(`[${context}] Error:`, {
            message: errorMessage,
            stack: errorStack,
            originalError: error
        });
        
        // Log additional debugging information that might help diagnose model loading issues
        if (context.includes('model') || context.includes('Model')) {
            console.log('Browser information:', navigator.userAgent);
            console.log('Current URL:', window.location.href);
            
            // Check TensorFlow.js status
            if (typeof tf !== 'undefined') {
                console.log('TensorFlow.js version:', tf.version);
                console.log('TensorFlow.js backend:', tf.getBackend());
            } else {
                console.error('TensorFlow.js is not loaded');
            }
            
            // Check if Teachable Machine library is loaded
            if (typeof tmImage !== 'undefined') {
                console.log('Teachable Machine library is loaded');
            } else {
                console.error('Teachable Machine library is not loaded');
            }
        }
        
        // In production, you might want to send this to an error tracking service
        if (window.analytics && typeof window.analytics.track === 'function') {
            window.analytics.track('Error', {
                context,
                error: errorMessage,
                stack: errorStack,
                timestamp: new Date().toISOString()
            });
        }
    }

    /**
     * Shows toast notification to user
     * @param {string} message - Message to show
     * @param {string} type - Type of notification (success, error, info)
     * @param {number} duration - Duration in milliseconds to show the toast (default 3000ms)
     */
    static showNotification(message, type = 'info', duration = 3000) {
        // For now, use console. In a real app, you'd implement a toast system
        const styles = {
            success: 'color: green; font-weight: bold;',
            error: 'color: red; font-weight: bold;',
            info: 'color: blue; font-weight: bold;'
        };
        
        console.log(`%c${type.toUpperCase()}: ${message}`, styles[type] || styles.info);
        
        // Check for duplicate messages within a short time window
        const toastKey = `${message}-${type}`;
        if (this.activeToasts.has(toastKey)) {
            return; // Avoid duplicates
        }
        
        this.createToast(message, type, duration, toastKey);
    }

    /**
     * Creates a toast notification element in the toast container
     * @param {string} message - Message to show
     * @param {string} type - Type of notification
     * @param {number} duration - Duration in milliseconds
     * @param {string} toastKey - Unique identifier for the toast
     */
    static createToast(message, type, duration, toastKey) {
        // Add to active toasts to prevent duplicates
        this.activeToasts.add(toastKey);
        
        // Get or create container
        const container = this.getToastContainer();
        
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            padding: 12px 20px;
            border-radius: 4px;
            color: white;
            font-family: Arial, sans-serif;
            font-size: 14px;
            max-width: 300px;
            word-wrap: break-word;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: auto;
        `;

        // Add to container instead of document.body
        container.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.style.opacity = '1';
        }, 10);

        // Remove after duration
        setTimeout(() => {
            toast.style.opacity = '0';
            
            // Remove from DOM and active toasts list
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
                this.activeToasts.delete(toastKey);
            }, 300);
        }, duration);
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}
