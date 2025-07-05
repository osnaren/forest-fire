/**
 * Simple test utility for validating Forest Fire Prediction app functionality
 * This is a basic test suite for manual testing
 */

class AppTester {
  constructor() {
    this.tests = [];
    this.results = [];
    this.init();
  }

  init() {
    console.log("🧪 Forest Fire App Test Suite Initialized");
    this.setupTests();
  }

  setupTests() {
    // DOM Tests
    this.addTest("DOM Elements Exist", this.testDOMElements.bind(this));
    this.addTest("Scripts Loaded", this.testScriptsLoaded.bind(this));
    this.addTest("CSS Loaded", this.testCSSLoaded.bind(this));

    // Functionality Tests
    this.addTest("Utils Available", this.testUtils.bind(this));
    this.addTest("Model Manager Available", this.testModelManager.bind(this));
    this.addTest("UI Manager Available", this.testUIManager.bind(this));
    this.addTest("App Instance Available", this.testAppInstance.bind(this));

    // Accessibility Tests
    this.addTest("ARIA Labels Present", this.testARIALabels.bind(this));
    this.addTest("Keyboard Navigation", this.testKeyboardNavigation.bind(this));

    // Performance Tests
    this.addTest("TensorFlow.js Loaded", this.testTensorFlowLoaded.bind(this));
    this.addTest(
      "Teachable Machine Loaded",
      this.testTeachableMachineLoaded.bind(this)
    );
  }

  addTest(name, testFunction) {
    this.tests.push({ name, test: testFunction });
  }

  async runTests() {
    console.log(`🚀 Running ${this.tests.length} tests...`);

    for (const { name, test } of this.tests) {
      try {
        const result = await test();
        this.results.push({ name, passed: result, error: null });
        console.log(`✅ ${name}: PASS`);
      } catch (error) {
        this.results.push({ name, passed: false, error: error.message });
        console.error(`❌ ${name}: FAIL - ${error.message}`);
      }
    }

    this.printSummary();
  }

  printSummary() {
    const passed = this.results.filter((r) => r.passed).length;
    const total = this.results.length;
    const percentage = Math.round((passed / total) * 100);

    console.log("\n📊 Test Summary");
    console.log("=".repeat(40));
    console.log(`Total Tests: ${total}`);
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${total - passed}`);
    console.log(`Success Rate: ${percentage}%`);

    if (percentage >= 90) {
      console.log("🎉 Excellent! App is working well.");
    } else if (percentage >= 70) {
      console.log("⚠️ Good, but some issues need attention.");
    } else {
      console.log("🚨 Multiple issues detected. Review required.");
    }
  }

  // Test Implementations
  testDOMElements() {
    const criticalElements = [
      "upload",
      "imageResult",
      "button",
      "main",
      "splasher",
      "fire",
      "nofire",
      "smoke",
      "sfire",
    ];

    for (const id of criticalElements) {
      if (!document.getElementById(id)) {
        throw new Error(`Critical element missing: ${id}`);
      }
    }
    return true;
  }

  testScriptsLoaded() {
    const requiredClasses = [
      "Utils",
      "ModelManager",
      "UIManager",
      "ForestFireApp",
    ];

    for (const className of requiredClasses) {
      if (typeof window[className] === "undefined") {
        throw new Error(`Required class not loaded: ${className}`);
      }
    }
    return true;
  }

  testCSSLoaded() {
    const testElement = document.createElement("div");
    testElement.className = "progress";
    document.body.appendChild(testElement);

    const computedStyle = window.getComputedStyle(testElement);
    const hasProgressStyles = computedStyle.display !== "inline";

    document.body.removeChild(testElement);

    if (!hasProgressStyles) {
      throw new Error("CSS not properly loaded");
    }
    return true;
  }

  testUtils() {
    if (typeof Utils === "undefined") {
      throw new Error("Utils class not available");
    }

    // Test key utility functions
    const methods = ["validateImageFile", "readFileAsDataURL", "sanitizeHTML"];
    for (const method of methods) {
      if (typeof Utils[method] !== "function") {
        throw new Error(`Utils.${method} not available`);
      }
    }
    return true;
  }

  testModelManager() {
    if (typeof ModelManager === "undefined") {
      throw new Error("ModelManager class not available");
    }

    if (!window.modelManager) {
      throw new Error("ModelManager instance not created");
    }

    const status = window.modelManager.getStatus();
    if (!status || typeof status !== "object") {
      throw new Error("ModelManager status not available");
    }
    return true;
  }

  testUIManager() {
    if (typeof UIManager === "undefined") {
      throw new Error("UIManager class not available");
    }

    if (!window.uiManager) {
      throw new Error("UIManager instance not created");
    }

    const state = window.uiManager.getState();
    if (!state || typeof state !== "object") {
      throw new Error("UIManager state not available");
    }
    return true;
  }

  testAppInstance() {
    if (typeof ForestFireApp === "undefined") {
      throw new Error("ForestFireApp class not available");
    }

    if (!window.forestFireApp) {
      throw new Error("ForestFireApp instance not created");
    }

    const appState = window.forestFireApp.getAppState();
    if (!appState || typeof appState !== "object") {
      throw new Error("App state not available");
    }
    return true;
  }

  testARIALabels() {
    const elementsNeedingAria = document.querySelectorAll(
      'input, button, [role="progressbar"]'
    );
    let missingLabels = 0;

    elementsNeedingAria.forEach((element) => {
      const hasLabel =
        element.hasAttribute("aria-label") ||
        element.hasAttribute("aria-labelledby") ||
        element.hasAttribute("aria-describedby");

      if (!hasLabel && element.tagName !== "INPUT") {
        missingLabels++;
      }
    });

    if (missingLabels > 0) {
      throw new Error(`${missingLabels} elements missing ARIA labels`);
    }
    return true;
  }

  testKeyboardNavigation() {
    const interactiveElements = document.querySelectorAll(
      'input, button, [tabindex]:not([tabindex="-1"])'
    );

    if (interactiveElements.length === 0) {
      throw new Error("No keyboard-accessible elements found");
    }

    // Test that elements are focusable
    const firstElement = interactiveElements[0];
    firstElement.focus();

    if (document.activeElement !== firstElement) {
      throw new Error("Elements not properly focusable");
    }
    return true;
  }

  testTensorFlowLoaded() {
    if (typeof tf === "undefined") {
      throw new Error("TensorFlow.js not loaded");
    }

    if (typeof tf.version === "undefined") {
      throw new Error("TensorFlow.js not properly initialized");
    }
    return true;
  }

  testTeachableMachineLoaded() {
    if (typeof tmImage === "undefined") {
      throw new Error("Teachable Machine library not loaded");
    }

    if (typeof tmImage.load !== "function") {
      throw new Error("Teachable Machine library not properly initialized");
    }
    return true;
  }

  // Manual test helpers
  async testFileUpload() {
    console.log("📁 Manual Test: File Upload");
    console.log("1. Click the file upload button");
    console.log("2. Select a valid image file");
    console.log("3. Verify image appears below");
    console.log("4. Check console for any errors");
  }

  async testClassification() {
    console.log("🔍 Manual Test: Classification");
    console.log("1. Upload an image first");
    console.log("2. Click the Classify button");
    console.log("3. Wait for progress bars to animate");
    console.log("4. Verify percentages are displayed");
    console.log("5. Click Classify again to reset");
  }

  async testMobileResponsiveness() {
    console.log("📱 Manual Test: Mobile Responsiveness");
    console.log("1. Open browser dev tools");
    console.log("2. Switch to mobile view");
    console.log("3. Test various screen sizes");
    console.log("4. Verify all elements are accessible");
  }

  async testAccessibility() {
    console.log("♿ Manual Test: Accessibility");
    console.log("1. Use Tab key to navigate");
    console.log("2. Test with screen reader");
    console.log("3. Verify all actions are keyboard accessible");
    console.log("4. Check color contrast");
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.appTester = new AppTester();
  });
} else {
  window.appTester = new AppTester();
}

// Make available globally for manual testing
window.AppTester = AppTester;

console.log(
  "🧪 App Tester loaded. Use window.appTester.runTests() to run automated tests."
);
console.log("📋 Manual tests available:");
console.log("  - window.appTester.testFileUpload()");
console.log("  - window.appTester.testClassification()");
console.log("  - window.appTester.testMobileResponsiveness()");
console.log("  - window.appTester.testAccessibility()");
