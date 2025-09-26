/**
 * Shutters CSS Accordion Utility - JavaScript Enhancements
 * Provides optional programmatic control and enhanced functionality
 * for the CSS-based accordion component.
 */

export class ShuttersAccordion {
  constructor(selector = '.shutters-accordion', options = {}) {
    this.container = typeof selector === 'string' 
      ? document.querySelector(selector) 
      : selector;
    
    if (!this.container) {
      throw new Error('Shutters accordion container not found');
    }

    // Configuration options
    this.options = {
      autoClose: false,
      animationDuration: 300,
      ...options
    };

    // Internal state
    this.items = [];
    this.eventListeners = new Map();

    this.initialize();
  }

  /**
   * Initialize the accordion with enhanced functionality
   */
  initialize() {
    this.collectAccordionItems();
    this.attachEventListeners();
    this.setupCustomEvents();
  }

  /**
   * Collect all accordion items and their components
   */
  collectAccordionItems() {
    const itemElements = this.container.querySelectorAll('.shutters-item');
    
    this.items = Array.from(itemElements).map((element, index) => {
      const toggle = element.querySelector('.shutters-toggle');
      const header = element.querySelector('.shutters-header');
      const content = element.querySelector('.shutters-content');
      
      if (!toggle || !header || !content) {
        console.warn(`Shutters: Incomplete accordion item structure at index ${index}`);
        return null;
      }

      return {
        element,
        toggle,
        header,
        content,
        index,
        id: toggle.id || `shutters-item-${index}`
      };
    }).filter(Boolean);
  }

  /**
   * Attach event listeners for enhanced functionality
   */
  attachEventListeners() {
    this.items.forEach(item => {
      // Enhanced click handling
      const clickHandler = (event) => this.handleItemClick(event, item);
      item.header.addEventListener('click', clickHandler);
      
      // Store reference for cleanup
      this.eventListeners.set(item.header, clickHandler);

      // Enhanced keyboard handling
      const keyHandler = (event) => this.handleKeyboardInteraction(event, item);
      item.header.addEventListener('keydown', keyHandler);
      this.eventListeners.set(`${item.id}-keyboard`, keyHandler);

      // State change monitoring
      const changeHandler = () => this.handleStateChange(item);
      item.toggle.addEventListener('change', changeHandler);
      this.eventListeners.set(item.toggle, changeHandler);
    });
  }

  /**
   * Setup custom event system for accordion state changes
   */
  setupCustomEvents() {
    // Listen for external control events
    document.addEventListener('shutters:open', (event) => {
      this.openItem(event.detail.id);
    });

    document.addEventListener('shutters:close', (event) => {
      this.closeItem(event.detail.id);
    });

    document.addEventListener('shutters:toggle', (event) => {
      this.toggleItem(event.detail.id);
    });
  }

  /**
   * Handle enhanced click interactions
   */
  handleItemClick(event, item) {
    // Auto-close functionality
    if (this.options.autoClose && !item.toggle.checked) {
      this.closeAllExcept(item.id);
    }

    // Dispatch custom event
    this.dispatchStateEvent('click', item);
  }

  /**
   * Handle keyboard interactions for accessibility
   */
  handleKeyboardInteraction(event, item) {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        item.toggle.click();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.focusNextItem(item.index);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusPreviousItem(item.index);
        break;
    }
  }

  /**
   * Handle state changes and dispatch events
   */
  handleStateChange(item) {
    const isExpanded = item.toggle.checked;
    const eventType = isExpanded ? 'expanded' : 'collapsed';
    
    this.dispatchStateEvent(eventType, item);
  }

  /**
   * Focus management for keyboard navigation
   */
  focusNextItem(currentIndex) {
    const nextIndex = (currentIndex + 1) % this.items.length;
    this.items[nextIndex]?.header.focus();
  }

  focusPreviousItem(currentIndex) {
    const prevIndex = currentIndex === 0 ? this.items.length - 1 : currentIndex - 1;
    this.items[prevIndex]?.header.focus();
  }

  /**
   * Dispatch custom events for state changes
   */
  dispatchStateEvent(type, item) {
    const event = new CustomEvent(`shutters:${type}`, {
      detail: {
        accordion: this,
        item: item.element,
        id: item.id,
        index: item.index,
        isExpanded: item.toggle.checked
      },
      bubbles: true
    });

    this.container.dispatchEvent(event);
  }

  /**
   * Programmatically open an accordion item
   */
  openItem(id) {
    const item = this.findItemById(id);
    if (!item) {
      console.warn(`Shutters: Item with id "${id}" not found`);
      return false;
    }

    if (!item.toggle.checked) {
      item.toggle.checked = true;
      item.toggle.dispatchEvent(new Event('change'));
    }
    
    return true;
  }

  /**
   * Programmatically close an accordion item
   */
  closeItem(id) {
    const item = this.findItemById(id);
    if (!item) {
      console.warn(`Shutters: Item with id "${id}" not found`);
      return false;
    }

    if (item.toggle.checked) {
      item.toggle.checked = false;
      item.toggle.dispatchEvent(new Event('change'));
    }
    
    return true;
  }

  /**
   * Programmatically toggle an accordion item
   */
  toggleItem(id) {
    const item = this.findItemById(id);
    if (!item) {
      console.warn(`Shutters: Item with id "${id}" not found`);
      return false;
    }

    item.toggle.checked = !item.toggle.checked;
    item.toggle.dispatchEvent(new Event('change'));
    
    return true;
  }

  /**
   * Close all accordion items except the specified one
   */
  closeAllExcept(excludeId) {
    this.items.forEach(item => {
      if (item.id !== excludeId && item.toggle.checked) {
        item.toggle.checked = false;
        item.toggle.dispatchEvent(new Event('change'));
      }
    });
  }

  /**
   * Close all accordion items
   */
  closeAll() {
    this.items.forEach(item => {
      if (item.toggle.checked) {
        item.toggle.checked = false;
        item.toggle.dispatchEvent(new Event('change'));
      }
    });
  }

  /**
   * Open all accordion items
   */
  openAll() {
    this.items.forEach(item => {
      if (!item.toggle.checked) {
        item.toggle.checked = true;
        item.toggle.dispatchEvent(new Event('change'));
      }
    });
  }

  /**
   * Get the current state of all accordion items
   */
  getState() {
    return this.items.map(item => ({
      id: item.id,
      index: item.index,
      isExpanded: item.toggle.checked
    }));
  }

  /**
   * Set the state of multiple accordion items
   */
  setState(states) {
    states.forEach(state => {
      if (state.isExpanded) {
        this.openItem(state.id);
      } else {
        this.closeItem(state.id);
      }
    });
  }

  /**
   * Enable auto-close functionality
   */
  enableAutoClose() {
    this.options.autoClose = true;
  }

  /**
   * Disable auto-close functionality
   */
  disableAutoClose() {
    this.options.autoClose = false;
  }

  /**
   * Find an accordion item by its ID
   */
  findItemById(id) {
    return this.items.find(item => item.id === id);
  }

  /**
   * Find an accordion item by its index
   */
  findItemByIndex(index) {
    return this.items[index];
  }

  /**
   * Get the number of accordion items
   */
  getItemCount() {
    return this.items.length;
  }

  /**
   * Check if an item is expanded
   */
  isItemExpanded(id) {
    const item = this.findItemById(id);
    return item ? item.toggle.checked : false;
  }

  /**
   * Dispatch custom events for external control
   */
  static dispatchControlEvent(type, id) {
    const event = new CustomEvent(`shutters:${type}`, {
      detail: { id },
      bubbles: true
    });
    document.dispatchEvent(event);
  }

  /**
   * Static methods for external control without instance reference
   */
  static open(id) {
    ShuttersAccordion.dispatchControlEvent('open', id);
  }

  static close(id) {
    ShuttersAccordion.dispatchControlEvent('close', id);
  }

  static toggle(id) {
    ShuttersAccordion.dispatchControlEvent('toggle', id);
  }

  /**
   * Cleanup event listeners
   */
  destroy() {
    this.eventListeners.forEach((handler, element) => {
      if (typeof element === 'string') {
        // Handle keyboard listeners stored with string keys
        const item = this.items.find(item => `${item.id}-keyboard` === element);
        if (item) {
          item.header.removeEventListener('keydown', handler);
        }
      } else {
        element.removeEventListener('click', handler);
        element.removeEventListener('change', handler);
      }
    });

    this.eventListeners.clear();
    this.items = [];
  }
}