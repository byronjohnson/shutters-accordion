var h = Object.defineProperty;
var u = (r, t, e) => t in r ? h(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var c = (r, t, e) => u(r, typeof t != "symbol" ? t + "" : t, e);
/**
 * ShuttersAccordion - A simple, configurable accordion component
 * @version 1.0.0
 * @license MIT
 */
const a = class a {
  /**
   * Create a new ShuttersAccordion instance
   * @param {Object} options - Configuration options
   * @param {string|Element|NodeList|Array} options.container - Container element(s) or selector
   * @param {number} options.animationDuration - Animation duration in milliseconds (default: 300)
   * @param {string} options.animationEasing - CSS easing function (default: 'ease-in-out')
   * @param {Array|string} options.defaultOpen - Default open items: array of indices, 'first', 'all', or 'none'
   */
  constructor(t = {}) {
    if (this.version = a.VERSION, this.options = {
      container: ".shutters-accordion",
      animationDuration: 300,
      animationEasing: "ease-in-out",
      defaultOpen: "none",
      ...t
    }, this.containers = this._getContainers(), this.containers.length === 0)
      throw new Error(`No containers found: ${this.options.container}`);
    this._applyAnimationSettings(), this.init(), this._applyDefaultOpen();
  }
  /**
   * Get container elements from various input types
   * @private
   */
  _getContainers() {
    const { container: t } = this.options;
    return typeof t == "string" ? Array.from(document.querySelectorAll(t)) : t instanceof NodeList || Array.isArray(t) ? Array.from(t) : [t];
  }
  /**
   * Apply animation settings to containers via CSS custom properties
   * @private
   */
  _applyAnimationSettings() {
    const { animationDuration: t, animationEasing: e } = this.options, s = t / 1e3;
    this.containers.forEach((n) => {
      n.style.setProperty("--shutters-animation-duration", `${s}s`), n.style.setProperty("--shutters-animation-easing", e);
    });
  }
  /**
   * Apply default open state
   * @private
   */
  _applyDefaultOpen() {
    const { defaultOpen: t } = this.options;
    if (t === "none") return;
    let e = [], s = 0;
    this.containers.forEach((n) => {
      const i = n.querySelectorAll(".shutters-header").length;
      s += i;
    }), t === "first" ? e = [0] : t === "all" ? e = Array.from({ length: s }, (n, i) => i) : Array.isArray(t) && (e = t.filter((n) => n >= 0 && n < s)), e.forEach((n) => this.open(n));
  }
  /**
   * Initialize the accordion
   */
  init() {
    this.containers.forEach((t) => {
      t.querySelectorAll(".shutters-header").forEach((s) => {
        const n = (o) => {
          o.type === "keydown" && o.key !== "Enter" && o.key !== " " || (o.type === "keydown" && o.preventDefault(), this._toggleItem(s, t));
        };
        s.addEventListener("click", n), s.addEventListener("keydown", n), s.closest(".shutters-item")?.classList.contains("opened") && s.setAttribute("aria-expanded", "true");
      });
    });
  }
  /**
   * Close other items in auto-close containers
   * @private
   */
  _closeOtherItems(t, e) {
    e.classList.contains("shutters-autoclose") && e.querySelectorAll(".shutters-header").forEach((s) => {
      if (s !== t) {
        const n = s.closest(".shutters-item");
        n?.classList.contains("opened") && (n.classList.remove("opened"), s.setAttribute("aria-expanded", "false"));
      }
    });
  }
  /**
   * Update item state
   * @private
   */
  _updateItemState(t, e, s) {
    t.classList.toggle("opened", s), e.setAttribute("aria-expanded", s ? "true" : "false");
  }
  /**
   * Toggle an accordion item
   * @private
   */
  _toggleItem(t, e) {
    const s = t.closest(".shutters-item");
    if (!s) return;
    const n = s.classList.contains("opened");
    n || this._closeOtherItems(t, e), this._updateItemState(s, t, !n);
  }
  /**
   * Get accordion item by global index
   * @private
   */
  _getItemByIndex(t) {
    let e = 0;
    for (const s of this.containers) {
      const n = s.querySelectorAll(".shutters-header");
      if (t < e + n.length) {
        const i = n[t - e];
        return i ? {
          item: i.closest(".shutters-item"),
          header: i,
          container: s
        } : null;
      }
      e += n.length;
    }
    return null;
  }
  /**
   * Set accordion item state by index
   * @private
   */
  _setItemStateByIndex(t, e) {
    const s = this._getItemByIndex(t);
    if (!s) return;
    const { item: n, header: i, container: o } = s;
    e && this._closeOtherItems(i, o), this._updateItemState(n, i, e);
  }
  /**
   * Open an accordion item by index
   * @param {number} index - Zero-based index across all containers
   */
  open(t) {
    this._setItemStateByIndex(t, !0);
  }
  /**
   * Close an accordion item by index
   * @param {number} index - Zero-based index across all containers
   */
  close(t) {
    this._setItemStateByIndex(t, !1);
  }
  /**
   * Toggle an accordion item by index
   * @param {number} index - Zero-based index across all containers
   */
  toggle(t) {
    const e = this._getItemByIndex(t);
    if (e) {
      const s = e.item.classList.contains("opened");
      this._setItemStateByIndex(t, !s);
    }
  }
  /**
   * Destroy the accordion instance
   */
  destroy() {
    this.containers.forEach((t) => {
      t.querySelectorAll(".shutters-header").forEach((e) => {
        e.replaceWith(e.cloneNode(!0));
      });
    });
  }
};
/**
 * The current version of ShuttersAccordion
 * @static
 * @type {string}
 */
c(a, "VERSION", "1.0.0");
let l = a;
window.ShuttersAccordion = l;
export {
  l as ShuttersAccordion
};
