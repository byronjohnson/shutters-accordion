/**
 * Demo-only UI: copy buttons, framework snippet tabs, CDN SRI snippet loader
 */
import cdnIntegrity from './cdn-integrity.json' with { type: 'json' };

export function initCopyButtons(root = document) {
  for (const pre of root.querySelectorAll('.how-to-use pre, .snippet-panel pre')) {
    if (pre.closest('.code-block')) continue;

    const wrap = document.createElement('div');
    wrap.className = 'code-block';
    pre.parentNode.insertBefore(wrap, pre);
    wrap.append(pre);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.setAttribute('aria-label', 'Copy code to clipboard');
    wrap.append(btn);

    btn.addEventListener('click', async () => {
      const text = pre.querySelector('code')?.textContent ?? pre.textContent;
      try {
        await navigator.clipboard.writeText(text.trim());
        btn.textContent = 'Copied!';
        btn.classList.add('copy-btn--success');
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('copy-btn--success');
        }, 2000);
      } catch {
        btn.textContent = 'Failed';
        setTimeout(() => {
          btn.textContent = 'Copy';
        }, 2000);
      }
    });
  }
}

export function initSnippetTabs(root = document) {
  const tablist = root.querySelector('[data-snippet-tabs]');
  if (!tablist) return;

  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  const panels = [...root.querySelectorAll('[data-snippet-panel]')];

  function activate(id) {
    for (const tab of tabs) {
      const selected = tab.dataset.snippetTab === id;
      tab.setAttribute('aria-selected', selected ? 'true' : 'false');
      tab.tabIndex = selected ? 0 : -1;
    }
    for (const panel of panels) {
      const show = panel.dataset.snippetPanel === id;
      panel.hidden = !show;
    }
  }

  tablist.addEventListener('click', (e) => {
    const tab = e.target.closest('[role="tab"]');
    if (!tab || !tablist.contains(tab)) return;
    activate(tab.dataset.snippetTab);
    tab.focus();
  });

  tablist.addEventListener('keydown', (e) => {
    const idx = tabs.indexOf(document.activeElement);
    if (idx === -1) return;

    let next = idx;
    if (e.key === 'ArrowRight') next = (idx + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (idx - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    else return;

    e.preventDefault();
    activate(tabs[next].dataset.snippetTab);
    tabs[next].focus();
  });
}

export function loadCdnSriSnippet(root = document) {
  const el = root.querySelector('[data-cdn-sri]');
  if (el) el.textContent = cdnIntegrity.snippet;
}

export function initDemoUi() {
  initCopyButtons();
  initSnippetTabs();
  loadCdnSriSnippet();
}
