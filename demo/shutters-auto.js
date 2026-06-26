/**
 * Opt-in auto-initialization for [data-shutters] containers
 * @license MIT
 */
import { ShuttersAccordion } from './shutters-core.js';

const instances = new WeakMap();

/**
 * Parse data-shutters-* attributes on a container element
 * @param {Element} el
 * @returns {Object}
 */
function optionsFromElement(el) {
  const opts = { container: el };

  const duration = el.getAttribute('data-shutters-duration');
  if (duration != null && duration !== '') {
    opts.animationDuration = Number(duration);
  }

  const easing = el.getAttribute('data-shutters-easing');
  if (easing) opts.animationEasing = easing;

  const defaultOpen = el.getAttribute('data-shutters-default-open');
  if (defaultOpen === 'first' || defaultOpen === 'all' || defaultOpen === 'none') {
    opts.defaultOpen = defaultOpen;
  } else if (defaultOpen) {
    opts.defaultOpen = defaultOpen.split(',').map((n) => Number(n.trim())).filter((n) => !Number.isNaN(n));
  }

  return opts;
}

/**
 * Initialize accordions on all [data-shutters] elements within root
 * @param {ParentNode} [root=document]
 * @param {Object} [defaults={}] merged into each instance (container wins)
 * @returns {ShuttersAccordion[]}
 */
export function initAll(root = document, defaults = {}) {
  const created = [];
  for (const el of root.querySelectorAll('[data-shutters]')) {
    if (instances.has(el)) continue;
    const accordion = new ShuttersAccordion({ ...defaults, ...optionsFromElement(el) });
    instances.set(el, accordion);
    created.push(accordion);
  }
  return created;
}

/**
 * Destroy auto-init instance for an element and remove from registry
 * @param {Element} el
 */
export function destroyAuto(el) {
  const accordion = instances.get(el);
  if (!accordion) return;
  accordion.destroy();
  instances.delete(el);
}

/**
 * Destroy every auto-init instance
 */
export function destroyAllAuto() {
  for (const el of document.querySelectorAll('[data-shutters]')) {
    destroyAuto(el);
  }
}
