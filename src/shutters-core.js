// Import CSS - Vite will bundle this automatically
import './shutters-core.css';

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

    // Find containers (support multiple)
    if (typeof this.options.container === 'string') {
      this.containers = Array.from(document.querySelectorAll(this.options.container));
    } else if (this.options.container instanceof NodeList || Array.isArray(this.options.container)) {
      this.containers = Array.from(this.options.container);
    } else {
      this.containers = [this.options.container];
    }

    if (this.containers.length === 0) {
      throw new Error(`No containers found: ${this.options.container}`);
    }

    // Apply parent class to all containers
    if (this.options.parentClass) {
      this.containers.forEach(container => {
        container.classList.add(this.options.parentClass);
      });
    }

    // Initialize all containers
    this.init();
  }

  /**
   * Initialize the accordion
   */
  init() {
    // Add event listeners to all containers
    this.containers.forEach(container => {
      // Find all toggle checkboxes within this container
      const toggles = container.querySelectorAll('.shutters-toggle');
      
      // Add event listeners to handle opened class and auto-close
      toggles.forEach(toggle => {
        toggle.addEventListener('change', (e) => {
          const item = e.target.closest('.shutters-item');
          if (item) {
            if (e.target.checked) {
              item.classList.add('opened');
              
              // Auto-close: if container has shutters-autoclose class, close other items
              if (container.classList.contains('shutters-autoclose')) {
                toggles.forEach(otherToggle => {
                  if (otherToggle !== e.target && otherToggle.checked) {
                    otherToggle.checked = false;
                    const otherItem = otherToggle.closest('.shutters-item');
                    if (otherItem) {
                      otherItem.classList.remove('opened');
                    }
                  }
                });
              }
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
    });

    console.log(`ShuttersAccordion initialized with options:`, this.options, `(${this.containers.length} containers)`);
  }

  /**
   * Get the accordion item element at the specified global index
   * @private
   * @param {number} index - Global zero-based index of the item across all containers
   * @returns {Object|null} Object with {item, container} or null if not found
   */
  _getItem(index) {
    let currentIndex = 0;
    
    for (const container of this.containers) {
      const toggles = container.querySelectorAll('.shutters-toggle');
      
      if (currentIndex + toggles.length > index) {
        const localIndex = index - currentIndex;
        const toggle = toggles[localIndex];
        if (toggle && toggle.classList.contains('shutters-toggle')) {
          return {
            item: toggle.closest('.shutters-item'),
            container: container
          };
        }
      }
      
      currentIndex += toggles.length;
    }
    
    return null;
  }

  /**
   * Set the state of an accordion item at the specified global index
   * @private
   * @param {number} index - Global zero-based index of the item
   * @param {boolean} checked - Whether the item should be checked/opened
   */
  _setItemState(index, checked) {
    const result = this._getItem(index);
    if (result) {
      const { item, container } = result;
      const checkbox = item.querySelector('.shutters-toggle');
      if (checkbox) {
        // Handle auto-close behavior
        if (checked && container.classList.contains('shutters-autoclose')) {
          // Close all other items in this container
          const toggles = container.querySelectorAll('.shutters-toggle');
          toggles.forEach(otherToggle => {
            if (otherToggle !== checkbox && otherToggle.checked) {
              otherToggle.checked = false;
              const otherItem = otherToggle.closest('.shutters-item');
              if (otherItem) {
                otherItem.classList.remove('opened');
              }
            }
          });
        }
        
        checkbox.checked = checked;
        item.classList.toggle('opened', checked);
      }
    }
  }

    /**
   * Open an accordion item at the specified global index
   * @param {number} index - Global zero-based index of the item to open across all containers
   */
  open(index) {
    this._setItemState(index, true);
    console.log('Opening item at index:', index);
  }

  /**
   * Close an accordion item at the specified global index
   * @param {number} index - Global zero-based index of the item to close across all containers
   */
  close(index) {
    this._setItemState(index, false);
    console.log('Closing item at index:', index);
  }

  /**
   * Toggle an accordion item at the specified global index
   * @param {number} index - Global zero-based index of the item to toggle across all containers
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
    // Remove parent class from all containers
    if (this.options.parentClass) {
      this.containers.forEach(container => {
        container.classList.remove(this.options.parentClass);
      });
    }
    console.log('ShuttersAccordion destroyed');
  }
}

// Make ShuttersAccordion available globally
window.ShuttersAccordion = ShuttersAccordion;