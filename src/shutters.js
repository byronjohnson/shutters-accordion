/**
 * Shutters CSS Accordion - Optional JavaScript Enhancements
 * ES6 module for programmatic control and enhanced functionality
 */

export class ShuttersAccordion {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      autoClose: false,
      ...options
    };
    
    this.init();
  }
  
  init() {
    this.bindEvents();
  }
  
  bindEvents() {
    // Enhanced event handling can be added here
    this.element.addEventListener('change', this.handleToggle.bind(this));
    this.element.addEventListener('keydown', this.handleKeydown.bind(this));
  }
  
  handleKeydown(event) {
    if (event.target.classList.contains('shutters-header')) {
      // Handle Enter and Space keys for accessibility
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const toggle = event.target.previousElementSibling;
        if (toggle && toggle.classList.contains('shutters-toggle')) {
          toggle.checked = !toggle.checked;
          toggle.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    }
  }
  
  handleToggle(event) {
    if (event.target.classList.contains('shutters-toggle')) {
      this.updateAriaAttributes(event.target);
      this.dispatchStateChange(event.target);
      
      if (this.options.autoClose && event.target.checked) {
        this.closeOthers(event.target);
      }
    }
  }
  
  updateAriaAttributes(toggle) {
    const header = toggle.nextElementSibling;
    if (header && header.classList.contains('shutters-header')) {
      header.setAttribute('aria-expanded', toggle.checked.toString());
    }
  }
  
  dispatchStateChange(toggle) {
    const customEvent = new CustomEvent('shutters:toggle', {
      detail: {
        element: toggle,
        isOpen: toggle.checked
      }
    });
    
    this.element.dispatchEvent(customEvent);
  }
  
  closeOthers(currentToggle) {
    const otherToggles = this.element.querySelectorAll('.shutters-toggle:not([id="' + currentToggle.id + '"])');
    otherToggles.forEach(toggle => {
      toggle.checked = false;
      this.updateAriaAttributes(toggle);
    });
  }
  
  open(itemId) {
    const toggle = this.element.querySelector(`#${itemId}`);
    if (toggle) {
      toggle.checked = true;
      this.updateAriaAttributes(toggle);
      this.dispatchStateChange(toggle);
    }
  }
  
  close(itemId) {
    const toggle = this.element.querySelector(`#${itemId}`);
    if (toggle) {
      toggle.checked = false;
      this.updateAriaAttributes(toggle);
      this.dispatchStateChange(toggle);
    }
  }
  
  closeAll() {
    const toggles = this.element.querySelectorAll('.shutters-toggle');
    toggles.forEach(toggle => {
      toggle.checked = false;
      this.updateAriaAttributes(toggle);
    });
  }
}

// Auto-initialize accordions with data-shutters attribute
document.addEventListener('DOMContentLoaded', () => {
  const accordions = document.querySelectorAll('[data-shutters]');
  accordions.forEach(accordion => {
    const options = accordion.dataset.shutters ? JSON.parse(accordion.dataset.shutters) : {};
    const instance = new ShuttersAccordion(accordion, options);
    
    // Initialize ARIA attributes for all toggles
    const toggles = accordion.querySelectorAll('.shutters-toggle');
    toggles.forEach(toggle => {
      instance.updateAriaAttributes(toggle);
    });
  });
});