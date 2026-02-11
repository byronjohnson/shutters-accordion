/**
 * ShuttersAccordion - A minimal, accessible accordion component
 * @license MIT
 */
export class ShuttersAccordion {
  /**
   * @param {Object} opts
   * @param {string|Element|NodeList|Array} opts.container - Container(s) or selector
   * @param {number} opts.animationDuration - Duration in ms (default: 300)
   * @param {string} opts.animationEasing - CSS easing (default: 'ease-in-out')
   * @param {Array|string} opts.defaultOpen - 'first', 'all', 'none', or index array
   */
  constructor(opts = {}) {
    this.options = {
      container: '.shutters-accordion',
      animationDuration: 300,
      animationEasing: 'ease-in-out',
      defaultOpen: 'none',
      ...opts
    };
    this._handlers = [];
    this.containers = this._resolve(this.options.container);

    if (!this.containers.length) {
      throw new Error(`Shutters: no containers found for "${this.options.container}"`);
    }

    this._applyTiming();
    this._init();
    this._applyDefaultOpen();
  }

  /* ---- internal helpers ---- */

  /** Resolve container option to an array of elements */
  _resolve(c) {
    if (typeof c === 'string') return [...document.querySelectorAll(c)];
    if (c instanceof NodeList || Array.isArray(c)) return [...c];
    return [c];
  }

  /** Set animation CSS custom properties on each container */
  _applyTiming() {
    const dur = `${this.options.animationDuration / 1000}s`;
    const ease = this.options.animationEasing;
    for (const el of this.containers) {
      el.style.setProperty('--shutters-animation-duration', dur);
      el.style.setProperty('--shutters-animation-easing', ease);
    }
  }

  /** Set up ARIA attributes and attach delegated listeners */
  _init() {
    for (const container of this.containers) {
      // Auto-setup ARIA on every header
      for (const header of container.querySelectorAll('.shutters-header')) {
        header.setAttribute('role', 'button');
        header.setAttribute('tabindex', '0');
        const item = header.closest('.shutters-item');
        header.setAttribute('aria-expanded', item?.classList.contains('opened') ? 'true' : 'false');
      }

      // One delegated click listener per container
      const onClick = (e) => {
        const header = e.target.closest('.shutters-header');
        if (header && container.contains(header)) this._toggle(header, container);
      };

      // One delegated keydown listener per container
      const onKey = (e) => {
        const header = e.target.closest('.shutters-header');
        if (!header || !container.contains(header)) return;

        const headers = [...container.querySelectorAll('.shutters-header')];

        switch (e.key) {
          case 'Enter':
          case ' ':
            e.preventDefault();
            this._toggle(header, container);
            break;
          case 'ArrowDown':
            e.preventDefault();
            headers[(headers.indexOf(header) + 1) % headers.length]?.focus();
            break;
          case 'ArrowUp':
            e.preventDefault();
            headers[(headers.indexOf(header) - 1 + headers.length) % headers.length]?.focus();
            break;
          case 'Home':
            e.preventDefault();
            headers[0]?.focus();
            break;
          case 'End':
            e.preventDefault();
            headers[headers.length - 1]?.focus();
            break;
        }
      };

      container.addEventListener('click', onClick);
      container.addEventListener('keydown', onKey);
      this._handlers.push({ container, onClick, onKey });
    }
  }

  /** Open default items after initialization */
  _applyDefaultOpen() {
    const { defaultOpen } = this.options;
    if (defaultOpen === 'none') return;
    if (defaultOpen === 'first') { this.open(0); return; }

    const total = this._totalItems();
    if (defaultOpen === 'all') {
      for (let i = 0; i < total; i++) this.open(i);
    } else if (Array.isArray(defaultOpen)) {
      for (const i of defaultOpen) if (i >= 0 && i < total) this.open(i);
    }
  }

  /** Count total header items across all containers */
  _totalItems() {
    let n = 0;
    for (const c of this.containers) n += c.querySelectorAll('.shutters-header').length;
    return n;
  }

  /** Toggle a specific header within its container */
  _toggle(header, container) {
    const item = header.closest('.shutters-item');
    if (!item) return;

    const opening = !item.classList.contains('opened');
    if (opening) this._closeOthers(header, container);
    this._setState(item, header, opening);
    this._emit(container, opening ? 'shutters:open' : 'shutters:close', header, item);
  }

  /** In auto-close containers, close every item except the current one */
  _closeOthers(currentHeader, container) {
    if (!container.classList.contains('shutters-autoclose')) return;
    for (const h of container.querySelectorAll('.shutters-header')) {
      if (h === currentHeader) continue;
      const item = h.closest('.shutters-item');
      if (item?.classList.contains('opened')) {
        this._setState(item, h, false);
        this._emit(container, 'shutters:close', h, item);
      }
    }
  }

  /** Apply open/closed state to an item */
  _setState(item, header, isOpen) {
    item.classList.toggle('opened', isOpen);
    header.setAttribute('aria-expanded', String(isOpen));
  }

  /** Dispatch a custom event on a container */
  _emit(container, type, header, item) {
    container.dispatchEvent(new CustomEvent(type, {
      bubbles: true,
      detail: { header, item }
    }));
  }

  /** Locate an item by global index across all containers */
  _byIndex(index) {
    let offset = 0;
    for (const container of this.containers) {
      const headers = container.querySelectorAll('.shutters-header');
      if (index < offset + headers.length) {
        const header = headers[index - offset];
        return header ? { item: header.closest('.shutters-item'), header, container } : null;
      }
      offset += headers.length;
    }
    return null;
  }

  /* ---- public API ---- */

  /** Open an item by index */
  open(index) {
    const r = this._byIndex(index);
    if (!r) return;
    if (r.item.classList.contains('opened')) return;
    this._closeOthers(r.header, r.container);
    this._setState(r.item, r.header, true);
    this._emit(r.container, 'shutters:open', r.header, r.item);
  }

  /** Close an item by index */
  close(index) {
    const r = this._byIndex(index);
    if (!r) return;
    if (!r.item.classList.contains('opened')) return;
    this._setState(r.item, r.header, false);
    this._emit(r.container, 'shutters:close', r.header, r.item);
  }

  /** Toggle an item by index */
  toggle(index) {
    const r = this._byIndex(index);
    if (!r) return;
    r.item.classList.contains('opened') ? this.close(index) : this.open(index);
  }

  /** Open every item in all containers */
  openAll() {
    for (let i = 0, n = this._totalItems(); i < n; i++) this.open(i);
  }

  /** Close every item in all containers */
  closeAll() {
    for (let i = 0, n = this._totalItems(); i < n; i++) this.close(i);
  }

  /** Subscribe to accordion events ('shutters:open' | 'shutters:close') */
  on(event, callback) {
    for (const c of this.containers) c.addEventListener(event, callback);
    return this;
  }

  /** Unsubscribe from accordion events */
  off(event, callback) {
    for (const c of this.containers) c.removeEventListener(event, callback);
    return this;
  }

  /** Tear down: remove listeners and clean up state */
  destroy() {
    for (const { container, onClick, onKey } of this._handlers) {
      container.removeEventListener('click', onClick);
      container.removeEventListener('keydown', onKey);
      container.style.removeProperty('--shutters-animation-duration');
      container.style.removeProperty('--shutters-animation-easing');
    }
    this._handlers = [];
    this.containers = [];
  }
}
