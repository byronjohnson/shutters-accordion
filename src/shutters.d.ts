/**
 * Type definitions for shutters-accordion (vanilla JS library)
 * @packageDocumentation
 */

export interface ShuttersAccordionOptions {
  /** CSS selector, element, NodeList, or array of container elements */
  container?: string | Element | NodeList | Element[];
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** CSS easing function for transitions */
  animationEasing?: string;
  /** Initial open panels: 'none', 'first', 'all', or index array */
  defaultOpen?: 'none' | 'first' | 'all' | number[];
}

export interface ShuttersEventDetail {
  header: Element;
  item: Element;
}

export type ShuttersEvent = CustomEvent<ShuttersEventDetail>;

export declare class ShuttersAccordion {
  constructor(opts?: ShuttersAccordionOptions);
  open(index: number): void;
  close(index: number): void;
  toggle(index: number): void;
  openAll(): void;
  closeAll(): void;
  on(event: 'shutters:open' | 'shutters:close', callback: (e: ShuttersEvent) => void): this;
  off(event: 'shutters:open' | 'shutters:close', callback: (e: ShuttersEvent) => void): this;
  destroy(): void;
}

export declare function initAll(
  root?: ParentNode,
  defaults?: ShuttersAccordionOptions
): ShuttersAccordion[];

export declare function destroyAuto(el: Element): void;
export declare function destroyAllAuto(): void;

export default ShuttersAccordion;
