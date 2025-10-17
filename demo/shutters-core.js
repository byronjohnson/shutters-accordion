// Import CSS - Vite will bundle this automatically
import './shutters-core.css';

/**
 * ShuttersAccordion - A simple, configurable accordion component
 * @version 1.0.0
 * @license MIT
 */
export class ShuttersAccordion {
  /**
   * The current version of ShuttersAccordion
   * @static
   * @type {string}
   */
  static VERSION = '1.0.0';
  /**
   * Create a new ShuttersAccordion instance
   * @param {Object} options - Configuration options
   * @param {string|Element|NodeList|Array} options.container - Container element(s) or selector
   * @param {number} options.animationDuration - Animation duration in milliseconds (default: 300)
   * @param {string} options.animationEasing - CSS easing function (default: 'ease-in-out')
   * @param {Array|string} options.defaultOpen - Default open items: array of indices, 'first', 'all', or 'none'
   */
  constructor(options = {}) {
    this.version = ShuttersAccordion.VERSION;
    this.options = { 
      container: '.shutters-accordion',
      animationDuration: 300,
      animationEasing: 'ease-in-out',
      defaultOpen: 'none',
      ...options 
    };
    this.containers = this._getContainers();
    
    if (this.containers.length === 0) {
      throw new Error(`No containers found: ${this.options.container}`);
    }
    
    this._applyAnimationSettings();
    this.init();
    this._applyDefaultOpen();
  }

  /**
   * Get container elements from various input types
   * @private
   */
  _getContainers() {
    const { container } = this.options;
    
    if (typeof container === 'string') {
      return Array.from(document.querySelectorAll(container));
    }
    if (container instanceof NodeList || Array.isArray(container)) {
      return Array.from(container);
    }
    return [container];
  }

  /**
   * Apply animation settings to containers via CSS custom properties
   * @private
   */
  _applyAnimationSettings() {
    const { animationDuration, animationEasing } = this.options;
    const durationInSeconds = animationDuration / 1000;
    
    this.containers.forEach(container => {
      container.style.setProperty('--shutters-animation-duration', `${durationInSeconds}s`);
      container.style.setProperty('--shutters-animation-easing', animationEasing);
    });
  }

  /**
   * Apply default open state
   * @private
   */
  _applyDefaultOpen() {
    const { defaultOpen } = this.options;
    
    if (defaultOpen === 'none') return;
    
    // Get all items across all containers
    let allIndices = [];
    let totalItems = 0;
    
    this.containers.forEach(container => {
      const itemCount = container.querySelectorAll('.shutters-header').length;
      totalItems += itemCount;
    });
    
    // Determine which indices to open
    if (defaultOpen === 'first') {
      allIndices = [0];
    } else if (defaultOpen === 'all') {
      allIndices = Array.from({ length: totalItems }, (_, i) => i);
    } else if (Array.isArray(defaultOpen)) {
      allIndices = defaultOpen.filter(i => i >= 0 && i < totalItems);
    }
    
    // Open the specified items
    allIndices.forEach(index => this.open(index));
  }

  /**
   * Initialize the accordion
   */
  init() {
    this.containers.forEach(container => {
      const headers = container.querySelectorAll('.shutters-header');
      
      headers.forEach(header => {
        // Combined event handler for both click and keyboard
        const handleActivation = (e) => {
          if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
          if (e.type === 'keydown') e.preventDefault();
          this._toggleItem(header, container);
        };
        
        header.addEventListener('click', handleActivation);
        header.addEventListener('keydown', handleActivation);
        
        // Set initial ARIA state
        const item = header.closest('.shutters-item');
        if (item?.classList.contains('opened')) {
          header.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /**
   * Close other items in auto-close containers
   * @private
   */
  _closeOtherItems(currentHeader, container) {
    if (!container.classList.contains('shutters-autoclose')) return;
    
    container.querySelectorAll('.shutters-header').forEach(header => {
      if (header !== currentHeader) {
        const item = header.closest('.shutters-item');
        if (item?.classList.contains('opened')) {
          item.classList.remove('opened');
          header.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }

  /**
   * Update item state
   * @private
   */
  _updateItemState(item, header, isOpen) {
    item.classList.toggle('opened', isOpen);
    header.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  /**
   * Toggle an accordion item
   * @private
   */
  _toggleItem(header, container) {
    const item = header.closest('.shutters-item');
    if (!item) return;
    
    const isOpened = item.classList.contains('opened');
    
    if (!isOpened) {
      this._closeOtherItems(header, container);
    }
    
    this._updateItemState(item, header, !isOpened);
  }

  /**
   * Get accordion item by global index
   * @private
   */
  _getItemByIndex(index) {
    let currentIndex = 0;
    
    for (const container of this.containers) {
      const headers = container.querySelectorAll('.shutters-header');
      
      if (index < currentIndex + headers.length) {
        const header = headers[index - currentIndex];
        return header ? {
          item: header.closest('.shutters-item'),
          header,
          container
        } : null;
      }
      
      currentIndex += headers.length;
    }
    
    return null;
  }

  /**
   * Set accordion item state by index
   * @private
   */
  _setItemStateByIndex(index, opened) {
    const result = this._getItemByIndex(index);
    if (!result) return;
    
    const { item, header, container } = result;
    
    if (opened) {
      this._closeOtherItems(header, container);
    }
    
    this._updateItemState(item, header, opened);
  }

  /**
   * Open an accordion item by index
   * @param {number} index - Zero-based index across all containers
   */
  open(index) {
    this._setItemStateByIndex(index, true);
  }

  /**
   * Close an accordion item by index
   * @param {number} index - Zero-based index across all containers
   */
  close(index) {
    this._setItemStateByIndex(index, false);
  }

  /**
   * Toggle an accordion item by index
   * @param {number} index - Zero-based index across all containers
   */
  toggle(index) {
    const result = this._getItemByIndex(index);
    if (result) {
      const isOpened = result.item.classList.contains('opened');
      this._setItemStateByIndex(index, !isOpened);
    }
  }

  /**
   * Destroy the accordion instance
   */
  destroy() {
    this.containers.forEach(container => {
      container.querySelectorAll('.shutters-header').forEach(header => {
        header.replaceWith(header.cloneNode(true));
      });
    });
  }
}

// Make ShuttersAccordion available globally
window.ShuttersAccordion = ShuttersAccordion;