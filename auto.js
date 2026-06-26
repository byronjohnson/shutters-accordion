/**
 * Opt-in auto-init entry — scans for [data-shutters] on load.
 * Import core CSS separately: import 'shutters-accordion/core.css'
 * @module shutters-accordion/auto
 * @license MIT
 */

import { ShuttersAccordion } from './src/shutters-core.js';
import { initAll, destroyAuto, destroyAllAuto } from './src/shutters-auto.js';

function boot() {
  initAll();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
}

export { ShuttersAccordion, initAll, destroyAuto, destroyAllAuto };
export default initAll;
