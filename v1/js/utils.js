/**
 * Utility functions for the Forest Fire Prediction app
 */
class Utils {
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
     */
    static showNotification(message, type = 'info') {
        // For now, use console. In a real app, you'd implement a toast system
        const styles = {
            success: 'color: green; font-weight: bold;',
            error: 'color: red; font-weight: bold;',
            info: 'color: blue; font-weight: bold;'
        };
        
        console.log(`%c${type.toUpperCase()}: ${message}`, styles[type] || styles.info);
        
        // You could also create a simple toast element
        this.createToast(message, type);
    }

    /**
     * Creates a simple toast notification element
     * @param {string} message - Message to show
     * @param {string} type - Type of notification
     */
    static createToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 4px;
            color: white;
            z-index: 10000;
            font-family: Arial, sans-serif;
            font-size: 14px;
            max-width: 300px;
            word-wrap: break-word;
            opacity: 0;
            transition: opacity 0.3s ease;
            ${type === 'error' ? 'background-color: #dc3545;' : ''}
            ${type === 'success' ? 'background-color: #28a745;' : ''}
            ${type === 'info' ? 'background-color: #17a2b8;' : ''}
        `;

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.style.opacity = '1';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}
