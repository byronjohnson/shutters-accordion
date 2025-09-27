/**
 * ShuttersAccordion - A simple, configurable accordion component
 * Minimal framework for building accordion interfaces
 */
export class ShuttersAccordion {
  /**
   * Create a new ShuttersAccordion instance
   * @param {Object} options - Configuration options
   * @param {string|Element} options.container - Container element or selector
   * @param {string} options.parentClass - CSS class for the accordion container
   * @param {number} options.duration - Animation duration in milliseconds
   */
  constructor(options = {}) {
    // Default options
    this.options = {
      container: '.shutters-accordion',
      parentClass: 'shutters-accordion',
      duration: 300,
      ...options
    };

    // Find container
    this.container = typeof this.options.container === 'string'
      ? document.querySelector(this.options.container)
      : this.options.container;

    if (!this.container) {
      throw new Error(`Container not found: ${this.options.container}`);
    }

    // Apply parent class
    if (this.options.parentClass) {
      this.container.classList.add(this.options.parentClass);
    }

    // Initialize
    this.init();
  }

  /**
   * Initialize the accordion
   */
  init() {
    // Find all toggle checkboxes within the container
    const toggles = this.container.querySelectorAll('.shutters-toggle');
    
    // Add event listeners to handle opened class
    toggles.forEach(toggle => {
      toggle.addEventListener('change', (e) => {
        const item = e.target.closest('.shutters-item');
        if (item) {
          if (e.target.checked) {
            item.classList.add('opened');
          } else {
            item.classList.remove('opened');
          }
        }
      });
      
      // Set initial state based on checkbox
      const item = toggle.closest('.shutters-item');
      if (item && toggle.checked) {
        item.classList.add('opened');
      }
    });

    console.log('ShuttersAccordion initialized with options:', this.options);
  }

  /**
   * Get the accordion item element at the specified index
   * @private
   * @param {number} index - Zero-based index of the item
   * @returns {Element|null} The .shutters-item element or null if not found
   */
  _getItem(index) {
    const toggles = this.container.querySelectorAll('.shutters-toggle');
    const toggle = toggles[index];
    if (toggle && toggle.classList.contains('shutters-toggle')) {
      return toggle.closest('.shutters-item');
    }
    return null;
  }

  /**
   * Set the state of an accordion item at the specified index
   * @private
   * @param {number} index - Zero-based index of the item
   * @param {boolean} checked - Whether the item should be checked/opened
   */
  _setItemState(index, checked) {
    const item = this._getItem(index);
    if (item) {
      const checkbox = item.querySelector('.shutters-toggle');
      if (checkbox) {
        checkbox.checked = checked;
        item.classList.toggle('opened', checked);
      }
    }
  }

  /**
   * Open an accordion item at the specified index
   * @param {number} index - Zero-based index of the item to open
   */
  open(index) {
    this._setItemState(index, true);
    console.log('Opening item at index:', index);
  }

  /**
   * Close an accordion item at the specified index
   * @param {number} index - Zero-based index of the item to close
   */
  close(index) {
    this._setItemState(index, false);
    console.log('Closing item at index:', index);
  }

  /**
   * Toggle an accordion item at the specified index
   * @param {number} index - Zero-based index of the item to toggle
   */
  toggle(index) {
    const item = this._getItem(index);
    if (item) {
      const checkbox = item.querySelector('.shutters-toggle');
      if (checkbox) {
        this._setItemState(index, !checkbox.checked);
      }
    }
    console.log('Toggling item at index:', index);
  }

  /**
   * Destroy the accordion instance
   */
  destroy() {
    if (this.options.parentClass) {
      this.container.classList.remove(this.options.parentClass);
    }
    console.log('ShuttersAccordion destroyed');
  }
}

// Make ShuttersAccordion available globally
window.ShuttersAccordion = ShuttersAccordion;