/**
 * ShuttersAccordion - A minimal, accessible accordion component
 * @license MIT
 */
class a {
  /**
   * @param {Object} opts
   * @param {string|Element|NodeList|Array} opts.container - Container(s) or selector
   * @param {number} opts.animationDuration - Duration in ms (default: 300)
   * @param {string} opts.animationEasing - CSS easing (default: 'ease-in-out')
   * @param {Array|string} opts.defaultOpen - 'first', 'all', 'none', or index array
   */
  constructor(t = {}) {
    if (this.options = {
      container: ".shutters-accordion",
      animationDuration: 300,
      animationEasing: "ease-in-out",
      defaultOpen: "none",
      ...t
    }, this._handlers = [], this.containers = this._resolve(this.options.container), !this.containers.length)
      throw new Error(`Shutters: no containers found for "${this.options.container}"`);
    this._applyTiming(), this._init(), this._applyDefaultOpen();
  }
  /* ---- internal helpers ---- */
  /** Resolve container option to an array of elements */
  _resolve(t) {
    return typeof t == "string" ? [...document.querySelectorAll(t)] : t instanceof NodeList || Array.isArray(t) ? [...t] : [t];
  }
  /** Set animation CSS custom properties on each container */
  _applyTiming() {
    const t = `${this.options.animationDuration / 1e3}s`, e = this.options.animationEasing;
    for (const s of this.containers)
      s.style.setProperty("--shutters-animation-duration", t), s.style.setProperty("--shutters-animation-easing", e);
  }
  /** Set up ARIA attributes and attach delegated listeners */
  _init() {
    for (const t of this.containers) {
      for (const n of t.querySelectorAll(".shutters-header")) {
        n.setAttribute("role", "button"), n.setAttribute("tabindex", "0");
        const o = n.closest(".shutters-item");
        n.setAttribute("aria-expanded", o?.classList.contains("opened") ? "true" : "false");
      }
      const e = (n) => {
        const o = n.target.closest(".shutters-header");
        o && t.contains(o) && this._toggle(o, t);
      }, s = (n) => {
        const o = n.target.closest(".shutters-header");
        if (!o || !t.contains(o)) return;
        const r = [...t.querySelectorAll(".shutters-header")];
        switch (n.key) {
          case "Enter":
          case " ":
            n.preventDefault(), this._toggle(o, t);
            break;
          case "ArrowDown":
            n.preventDefault(), r[(r.indexOf(o) + 1) % r.length]?.focus();
            break;
          case "ArrowUp":
            n.preventDefault(), r[(r.indexOf(o) - 1 + r.length) % r.length]?.focus();
            break;
          case "Home":
            n.preventDefault(), r[0]?.focus();
            break;
          case "End":
            n.preventDefault(), r[r.length - 1]?.focus();
            break;
        }
      };
      t.addEventListener("click", e), t.addEventListener("keydown", s), this._handlers.push({ container: t, onClick: e, onKey: s });
    }
  }
  /** Open default items after initialization */
  _applyDefaultOpen() {
    const { defaultOpen: t } = this.options;
    if (t === "none") return;
    if (t === "first") {
      this.open(0);
      return;
    }
    const e = this._totalItems();
    if (t === "all")
      for (let s = 0; s < e; s++) this.open(s);
    else if (Array.isArray(t))
      for (const s of t) s >= 0 && s < e && this.open(s);
  }
  /** Count total header items across all containers */
  _totalItems() {
    let t = 0;
    for (const e of this.containers) t += e.querySelectorAll(".shutters-header").length;
    return t;
  }
  /** Toggle a specific header within its container */
  _toggle(t, e) {
    const s = t.closest(".shutters-item");
    if (!s) return;
    const n = !s.classList.contains("opened");
    n && this._closeOthers(t, e), this._setState(s, t, n), this._emit(e, n ? "shutters:open" : "shutters:close", t, s);
  }
  /** In auto-close containers, close every item except the current one */
  _closeOthers(t, e) {
    if (e.classList.contains("shutters-autoclose"))
      for (const s of e.querySelectorAll(".shutters-header")) {
        if (s === t) continue;
        const n = s.closest(".shutters-item");
        n?.classList.contains("opened") && (this._setState(n, s, !1), this._emit(e, "shutters:close", s, n));
      }
  }
  /** Apply open/closed state to an item */
  _setState(t, e, s) {
    t.classList.toggle("opened", s), e.setAttribute("aria-expanded", String(s));
  }
  /** Dispatch a custom event on a container */
  _emit(t, e, s, n) {
    t.dispatchEvent(new CustomEvent(e, {
      bubbles: !0,
      detail: { header: s, item: n }
    }));
  }
  /** Locate an item by global index across all containers */
  _byIndex(t) {
    let e = 0;
    for (const s of this.containers) {
      const n = s.querySelectorAll(".shutters-header");
      if (t < e + n.length) {
        const o = n[t - e];
        return o ? { item: o.closest(".shutters-item"), header: o, container: s } : null;
      }
      e += n.length;
    }
    return null;
  }
  /* ---- public API ---- */
  /** Open an item by index */
  open(t) {
    const e = this._byIndex(t);
    e && (e.item.classList.contains("opened") || (this._closeOthers(e.header, e.container), this._setState(e.item, e.header, !0), this._emit(e.container, "shutters:open", e.header, e.item)));
  }
  /** Close an item by index */
  close(t) {
    const e = this._byIndex(t);
    e && e.item.classList.contains("opened") && (this._setState(e.item, e.header, !1), this._emit(e.container, "shutters:close", e.header, e.item));
  }
  /** Toggle an item by index */
  toggle(t) {
    const e = this._byIndex(t);
    e && (e.item.classList.contains("opened") ? this.close(t) : this.open(t));
  }
  /** Open every item in all containers */
  openAll() {
    for (let t = 0, e = this._totalItems(); t < e; t++) this.open(t);
  }
  /** Close every item in all containers */
  closeAll() {
    for (let t = 0, e = this._totalItems(); t < e; t++) this.close(t);
  }
  /** Subscribe to accordion events ('shutters:open' | 'shutters:close') */
  on(t, e) {
    for (const s of this.containers) s.addEventListener(t, e);
    return this;
  }
  /** Unsubscribe from accordion events */
  off(t, e) {
    for (const s of this.containers) s.removeEventListener(t, e);
    return this;
  }
  /** Tear down: remove listeners and clean up state */
  destroy() {
    for (const { container: t, onClick: e, onKey: s } of this._handlers)
      t.removeEventListener("click", e), t.removeEventListener("keydown", s), t.style.removeProperty("--shutters-animation-duration"), t.style.removeProperty("--shutters-animation-easing");
    this._handlers = [], this.containers = [];
  }
}
export {
  a as ShuttersAccordion
};
