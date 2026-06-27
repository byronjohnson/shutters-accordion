/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ShuttersAccordion } from '../src/shutters-core.js';
import { initAll, destroyAuto, destroyAllAuto } from '../src/shutters-auto.js';

function accordionHTML({ autoclose = false, id = 'acc' } = {}) {
  const ac = autoclose ? ' shutters-autoclose' : '';
  return `
    <div id="${id}" class="shutters-accordion${ac}">
      <div class="shutters-item">
        <div class="shutters-header"><span class="shutters-title">One</span><span class="shutters-icon"></span></div>
        <div class="shutters-content"><div class="shutters-body"><p>A</p></div></div>
      </div>
      <div class="shutters-item">
        <div class="shutters-header"><span class="shutters-title">Two</span><span class="shutters-icon"></span></div>
        <div class="shutters-content"><div class="shutters-body"><p>B</p></div></div>
      </div>
    </div>
  `;
}

describe('ShuttersAccordion', () => {
  beforeEach(() => {
    document.body.innerHTML = accordionHTML();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('throws when no containers match', () => {
    expect(() => new ShuttersAccordion({ container: '.missing' })).toThrow(/no containers found/);
  });

  it('applies ARIA attributes on init', () => {
    new ShuttersAccordion({ container: '#acc' });
    const header = document.querySelector('.shutters-header');
    const content = document.querySelector('.shutters-content');
    expect(header.getAttribute('role')).toBe('button');
    expect(header.getAttribute('tabindex')).toBe('0');
    expect(header.getAttribute('aria-expanded')).toBe('false');
    expect(header.getAttribute('aria-controls')).toBe(content.id);
    expect(content.id).toBeTruthy();
  });

  it('preserves existing content id for aria-controls', () => {
    document.body.innerHTML = accordionHTML({ id: 'acc' }).replace(
      '<div class="shutters-content">',
      '<div class="shutters-content" id="custom-panel">'
    );
    new ShuttersAccordion({ container: '#acc' });
    const header = document.querySelector('.shutters-header');
    expect(header.getAttribute('aria-controls')).toBe('custom-panel');
  });

  it('isOpen returns panel state', () => {
    const accordion = new ShuttersAccordion({ container: '#acc' });
    expect(accordion.isOpen(0)).toBe(false);
    accordion.open(0);
    expect(accordion.isOpen(0)).toBe(true);
    accordion.close(0);
    expect(accordion.isOpen(0)).toBe(false);
    expect(accordion.isOpen(99)).toBe(false);
  });

  it('opens and closes by index', () => {
    const accordion = new ShuttersAccordion({ container: '#acc' });
    const items = document.querySelectorAll('.shutters-item');

    accordion.open(0);
    expect(items[0].classList.contains('opened')).toBe(true);
    expect(document.querySelector('.shutters-header').getAttribute('aria-expanded')).toBe('true');

    accordion.close(0);
    expect(items[0].classList.contains('opened')).toBe(false);
  });

  it('toggles panel state', () => {
    const accordion = new ShuttersAccordion({ container: '#acc' });
    accordion.toggle(1);
    expect(document.querySelectorAll('.shutters-item')[1].classList.contains('opened')).toBe(true);
    accordion.toggle(1);
    expect(document.querySelectorAll('.shutters-item')[1].classList.contains('opened')).toBe(false);
  });

  it('closes other panels in autoclose mode', () => {
    document.body.innerHTML = accordionHTML({ autoclose: true });
    const accordion = new ShuttersAccordion({ container: '#acc' });
    const items = () => document.querySelectorAll('.shutters-item');

    accordion.open(0);
    accordion.open(1);
    expect(items()[0].classList.contains('opened')).toBe(false);
    expect(items()[1].classList.contains('opened')).toBe(true);
  });

  it('dispatches custom events', () => {
    const accordion = new ShuttersAccordion({ container: '#acc' });
    const events = [];
    accordion.on('shutters:open', (e) => events.push(e.type));
    accordion.open(0);
    expect(events).toEqual(['shutters:open']);
  });

  it('defaultOpen first opens index 0', () => {
    new ShuttersAccordion({ container: '#acc', defaultOpen: 'first' });
    expect(document.querySelector('.shutters-item').classList.contains('opened')).toBe(true);
  });

  it('destroy removes listeners and timing properties', () => {
    const accordion = new ShuttersAccordion({ container: '#acc' });
    const container = document.getElementById('acc');
    accordion.destroy();
    expect(container.style.getPropertyValue('--shutters-animation-duration')).toBe('');
  });

  it('ArrowDown moves focus to next header', () => {
    const accordion = new ShuttersAccordion({ container: '#acc' });
    void accordion;
    const headers = document.querySelectorAll('.shutters-header');
    headers[0].focus();
    headers[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    expect(document.activeElement).toBe(headers[1]);
  });

  it('Space toggles panel open', () => {
    new ShuttersAccordion({ container: '#acc' });
    const headers = document.querySelectorAll('.shutters-header');
    headers[0].focus();
    headers[0].dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true }));
    expect(document.querySelector('.shutters-item').classList.contains('opened')).toBe(true);
  });

  it('Home focuses first header from last', () => {
    new ShuttersAccordion({ container: '#acc' });
    const headers = document.querySelectorAll('.shutters-header');
    headers[1].focus();
    headers[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    expect(document.activeElement).toBe(headers[0]);
  });
});

describe('initAll (auto-init)', () => {
  afterEach(() => {
    destroyAllAuto();
    document.body.innerHTML = '';
  });

  it('initializes [data-shutters] elements only', () => {
    document.body.innerHTML = `
      <div data-shutters class="shutters-accordion">
        <div class="shutters-item">
          <div class="shutters-header"><span class="shutters-title">A</span><span class="shutters-icon"></span></div>
          <div class="shutters-content"><div class="shutters-body">x</div></div>
        </div>
      </div>
      <div class="shutters-accordion" id="manual">
        <div class="shutters-item">
          <div class="shutters-header"><span class="shutters-title">B</span><span class="shutters-icon"></span></div>
          <div class="shutters-content"><div class="shutters-body">y</div></div>
        </div>
      </div>
    `;
    const created = initAll();
    expect(created).toHaveLength(1);
    created[0].open(0);
    expect(document.querySelector('[data-shutters] .shutters-item').classList.contains('opened')).toBe(true);
  });

  it('reads data-shutters-default-open', () => {
    document.body.innerHTML = `
      <div data-shutters data-shutters-default-open="first" class="shutters-accordion">
        <div class="shutters-item">
          <div class="shutters-header"><span class="shutters-title">A</span><span class="shutters-icon"></span></div>
          <div class="shutters-content"><div class="shutters-body">x</div></div>
        </div>
      </div>
    `;
    initAll();
    expect(document.querySelector('.shutters-item').classList.contains('opened')).toBe(true);
  });

  it('does not double-init the same element', () => {
    document.body.innerHTML = `
      <div data-shutters class="shutters-accordion">
        <div class="shutters-item">
          <div class="shutters-header"><span class="shutters-title">A</span><span class="shutters-icon"></span></div>
          <div class="shutters-content"><div class="shutters-body">x</div></div>
        </div>
      </div>
    `;
    expect(initAll()).toHaveLength(1);
    expect(initAll()).toHaveLength(0);
  });

  it('destroyAuto tears down an instance', () => {
    document.body.innerHTML = `
      <div data-shutters class="shutters-accordion" id="auto-acc">
        <div class="shutters-item">
          <div class="shutters-header"><span class="shutters-title">A</span><span class="shutters-icon"></span></div>
          <div class="shutters-content"><div class="shutters-body">x</div></div>
        </div>
      </div>
    `;
    initAll();
    destroyAuto(document.getElementById('auto-acc'));
    expect(initAll()).toHaveLength(1);
  });

  it('reads data-shutters-duration', () => {
    document.body.innerHTML = `
      <div data-shutters data-shutters-duration="500" class="shutters-accordion" id="dur-acc">
        <div class="shutters-item">
          <div class="shutters-header"><span class="shutters-title">A</span><span class="shutters-icon"></span></div>
          <div class="shutters-content"><div class="shutters-body">x</div></div>
        </div>
      </div>
    `;
    initAll();
    const el = document.getElementById('dur-acc');
    expect(el.style.getPropertyValue('--shutters-animation-duration')).toBe('0.5s');
  });

  it('reads data-shutters-easing', () => {
    document.body.innerHTML = `
      <div data-shutters data-shutters-easing="ease-out" class="shutters-accordion" id="ease-acc">
        <div class="shutters-item">
          <div class="shutters-header"><span class="shutters-title">A</span><span class="shutters-icon"></span></div>
          <div class="shutters-content"><div class="shutters-body">x</div></div>
        </div>
      </div>
    `;
    initAll();
    const el = document.getElementById('ease-acc');
    expect(el.style.getPropertyValue('--shutters-animation-easing')).toBe('ease-out');
  });

  it('reads data-shutters-default-open index list', () => {
    document.body.innerHTML = `
      <div data-shutters data-shutters-default-open="1" class="shutters-accordion">
        <div class="shutters-item">
          <div class="shutters-header"><span class="shutters-title">A</span><span class="shutters-icon"></span></div>
          <div class="shutters-content"><div class="shutters-body">x</div></div>
        </div>
        <div class="shutters-item">
          <div class="shutters-header"><span class="shutters-title">B</span><span class="shutters-icon"></span></div>
          <div class="shutters-content"><div class="shutters-body">y</div></div>
        </div>
      </div>
    `;
    initAll();
    const items = document.querySelectorAll('.shutters-item');
    expect(items[0].classList.contains('opened')).toBe(false);
    expect(items[1].classList.contains('opened')).toBe(true);
  });
});
