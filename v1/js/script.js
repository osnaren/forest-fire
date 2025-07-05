/**
 * Legacy script functions - maintained for backward compatibility
 * New functionality is handled by the modular app architecture
 */

/**
 * Legacy function for reading uploaded files
 * @param {HTMLInputElement} input - File input element
 * @deprecated Use UIManager.handleFileUpload instead
 */
function readURL(input) {
    // This function is now handled by UIManager but kept for compatibility
    console.warn('readURL is deprecated. File handling is now managed by UIManager.');
    
    if (window.uiManager && input.files && input.files[0]) {
        // Delegate to new system
        const event = { target: input };
        window.uiManager.handleFileUpload(event);
    }
}

/**
 * Legacy jQuery-based file upload handler
 * @deprecated Replaced by modern event handling in UIManager
 */
$(function () {
    // Legacy jQuery support - modern handling is in UIManager
    $('#upload').on('change', function () {
        const input = document.getElementById('upload');
        if (input) {
            readURL(input);
        }
    });
});

/**
 * Legacy function for showing file names
 * @param {Event} event - File input change event
 * @deprecated Integrated into UIManager.handleFileUpload
 */
function showFileName(event) {
    console.warn('showFileName is deprecated. File name display is now handled by UIManager.');
    
    if (!event.target.files || !event.target.files[0]) return;
    
    const fileName = event.target.files[0].name;
    const infoArea = document.getElementById('upload-label');
    const inputImg = document.getElementById('inputimg');
    
    if (infoArea) {
        infoArea.textContent = 'File name: ' + Utils.sanitizeHTML(fileName);
    }
    
    if (inputImg) {
        inputImg.style.marginTop = "100px";
    }
}

/**
 * Legacy button wrapper functionality
 * @deprecated Modern button handling is in UIManager
 */
var wrapper = $("#button-wrapper");

$(".submit").click(function() {
    if (wrapper.not(".checked")) {
        wrapper.addClass("checked");
        setTimeout(function(){
            wrapper.removeClass("checked");
        }, 8000);
    }
});

// Legacy global variables for backward compatibility
var input = document.getElementById('upload');
var infoArea = document.getElementById('upload-label');

// Maintain legacy event listener if UIManager is not available
if (input && !window.uiManager) {
    input.addEventListener('change', showFileName);
}
