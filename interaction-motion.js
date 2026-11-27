/* Lab Central motion layer: observes actual UI changes, never owns navigation. */
(() => {
  'use strict';
  const main = document.getElementById('mainContent');
  if (!main || typeof Element.prototype.animate !== 'function') return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const printing = window.matchMedia('print');
  const active = new WeakMap();
  const running = new Set();
  function animate(element, keyframes, duration = 240) {
    if (!element || !element.isConnected || !element.getClientRects().length ||
        reduced.matches || printing.matches) return;
    active.get(element)?.cancel();
    const motion = element.animate(keyframes, {
      duration, easing: 'cubic-bezier(.2,.75,.3,1)'
    });
    active.set(element, motion);
    running.add(motion);
    const cleanup = () => {
      running.delete(motion);
      if (active.get(element) === motion) active.delete(element);
    };
    motion.addEventListener('finish', cleanup, { once: true });
    motion.addEventListener('cancel', cleanup, { once: true });
  }
  const fade = element => animate(element, [{ opacity: .78 }, { opacity: 1 }], 230);
  const reveal = element => animate(element, [
    { opacity: .7, translate: '0 5px' }, { opacity: 1, translate: '0 0' }
  ], 240);
  const pulse = element => animate(element, [
    { scale: '1' }, { scale: '.975', offset: .3 }, { scale: '1' }
  ], 180);
  const stop = () => { for (const motion of [...running]) motion.cancel(); };
  window.addEventListener('beforeprint', stop);
  reduced.addEventListener?.('change', event => { if (event.matches) stop(); });

  // Animate completed navigation (including same-route clicks), not search
  // keystrokes, startup refreshes or unrelated DOM changes.
  let route = location.hash;
  let routeFrame = 0;
  function pageMotion() {
    cancelAnimationFrame(routeFrame);
    routeFrame = requestAnimationFrame(() => {
      animate(main, [
        { opacity: .28, translate: '0 10px' },
        { opacity: 1, translate: '0 0' }
      ], 300);
    });
  }
  document.addEventListener('labcentral:navigation-rendered', pageMotion);
  window.addEventListener('hashchange', () => {
    if (route === location.hash) return;
    route = location.hash;
    pageMotion();
  });
  document.addEventListener('labcentral:marketchange', () => {
    pageMotion();
    reveal(document.getElementById('labCentralMarketLabel'));
  });

  // Results render immediately. Animate only newly visible result cards after
  // typing settles, preserving the search field, focus and keyboard navigation.
  const searchCardSelector = '.gs-result,.lab-panel-search-result,.grid-cards .card,.gs-empty,.empty-state';
  let searchTimer = 0, previousResults = new Set();
  function resultKey(card) {
    const title = card.querySelector('h3,h2,strong')?.textContent?.trim() || card.textContent.trim();
    const link = card.matches('a,button') ? card : card.querySelector('a,button[data-go]');
    const source = card.closest('.lab-search-source,.gs-group')?.getAttribute('aria-label') || '';
    return [source, title, link?.getAttribute('href'), link?.getAttribute('data-go'),
      link?.getAttribute('data-target-tab'), card.querySelector('.gs-test-code')?.textContent].join('|');
  }
  function inViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 && rect.bottom > 0 &&
      rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth;
  }
  function resetSearchMotion() {
    clearTimeout(searchTimer);
    previousResults = new Set();
  }
  document.addEventListener('labcentral:search-rendered', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      if (document.getElementById('currentCrumb')?.textContent !== 'Search') {
        resetSearchMotion(); return;
      }
      const cards = [...main.querySelectorAll(searchCardSelector)];
      const next = new Set(cards.map(resultKey));
      const fresh = cards.filter(card => !previousResults.has(resultKey(card)) && inViewport(card)).slice(0,10);
      previousResults = next;
      fresh.forEach((card,i) => {
        // Keep staggering short and do not animate stale, disconnected cards.
        setTimeout(() => {
          if (card.isConnected && document.getElementById('currentCrumb')?.textContent === 'Search')
            animate(card,[{opacity:.55,translate:'0 6px'},{opacity:1,translate:'0 0'}],210);
        },i*15);
      });
    },90);
  });
  window.addEventListener('hashchange',resetSearchMotion);
  document.addEventListener('labcentral:navigation-rendered',resetSearchMotion);
  document.getElementById('search')?.addEventListener('input',event => {
    if (!event.target.value.trim()) resetSearchMotion();
  });
  document.addEventListener('labcentral:search-suggestions-rendered',event => {
    if (!event.detail?.opened) return;
    const popup = document.getElementById('searchSuggestions');
    if (popup && !popup.hidden) animate(popup,[
      {opacity:.6,translate:'0 -4px'},{opacity:1,translate:'0 0'}
    ],180);
  });

  // Animate actual layout size after the built-in action runs. Closed
  // content stays hidden immediately; no cloned or stale clinical content.
  function measuredHeight(element) {
    return element.getBoundingClientRect().height;
  }
  const resizing = new WeakMap();
  function resizeFrom(element, before) {
    if (!element?.isConnected || reduced.matches || printing.matches) return;
    resizing.get(element)?.cancel();
    const after = measuredHeight(element);
    if (!after || Math.abs(after - before) < 2) return;
    const style = getComputedStyle(element);
    if (style.display === 'contents' || style.display === 'inline') return;
    const duration = Math.min(340, 220 + Math.abs(after - before) * .08);
    const extras = style.boxSizing === 'border-box' ? 0 :
      ['paddingTop','paddingBottom','borderTopWidth','borderBottomWidth']
        .reduce((sum, key) => sum + (parseFloat(style[key]) || 0), 0);
    const px = height => Math.max(0,height - extras) + 'px';
    const motion = element.animate([
      { height: px(before), overflow: 'clip' },
      { height: px(after), overflow: 'clip' }
    ], { duration, easing: 'cubic-bezier(.22,.72,.25,1)' });
    resizing.set(element, motion);
    running.add(motion);
    const cleanup = () => {
      running.delete(motion);
      if (resizing.get(element) === motion) resizing.delete(element);
    };
    motion.addEventListener('finish',cleanup,{once:true});
    motion.addEventListener('cancel',cleanup,{once:true});
  }
  // Native disclosures (including keyboard activation) retain their normal
  // semantics. Measure the whole disclosure, including its summary.
  document.addEventListener('click', event => {
    if (reduced.matches || printing.matches) return;
    const summary = event.target.closest?.('summary');
    if (summary && summary.parentElement?.matches('details')) {
      const detail = summary.parentElement;
      const wasOpen = detail.open;
      const before = measuredHeight(detail);
      requestAnimationFrame(() => {
        if (!detail.isConnected || detail.open === wasOpen) return;
        resizeFrom(detail,before);
      });
      return;
    }
    const button = event.target.closest?.('button:not(:disabled)');
    if (!button) return;
    let wrapper = null;
    if (button.matches('[data-expand]')) {
      const first = main.querySelector('[data-toggle]');
      wrapper = first?.closest('ol') || first?.closest('.step-row')?.parentElement;
    } else if (button.matches('[data-toggle]')) {
      wrapper = document.getElementById(button.dataset.toggle)?.parentElement;
    } else if (button.matches('[data-calculator-upload-guide-toggle]')) {
      wrapper = button.closest('.calculator-chart-upload');
    } else if (button.matches('[data-walkin-guide]')) {
      wrapper = button.closest('.walkin-athena-guides');
    } else if (button.matches('[data-athena-doc-expand],[data-athena-doc-close]')) {
      wrapper = document.getElementById('ae-document-expanded')?.parentElement;
    } else if (button.hasAttribute('aria-expanded')) {
      const panel = document.getElementById(button.getAttribute('aria-controls') || '');
      if (panel && main.contains(panel) && !panel.matches('[role="listbox"],[role="menu"],dialog') &&
          panel.parentElement?.contains(button) &&
          !['absolute','fixed'].includes(getComputedStyle(panel).position)) wrapper = panel.parentElement;
    }
    if (!wrapper || wrapper === main || !main.contains(wrapper)) return;
    const before = measuredHeight(wrapper);
    requestAnimationFrame(() => resizeFrom(wrapper,before));
  }, true);

  // Feedback for tool tabs, local filters, favorites and site selection.
  // Read the post-action state; never infer a successful clinical operation.
  const toolTabs = '[data-dqc-view],[data-tc-view],[data-calc2-lab]';
  const toolFilters = '[data-dqc-market],[data-dqc-clinic-option],[data-tc-market],[data-tc-clinic-option],[data-calc2-market],[data-calc2-clinic]';
  const galleryFilters = '[data-lcr-lab],[data-lcr-cat]';
  const selected = button => button?.getAttribute('aria-pressed') === 'true' ||
    button?.getAttribute('aria-selected') === 'true' || button?.classList.contains('active');
  const positive = element => animate(element, [
    { scale: '1' }, { scale: '1.10', offset: .44 }, { scale: '1' }
  ], 300);
  function matchingControl(button, attributes) {
    const key = attributes.find(name => button.hasAttribute(name));
    if (!key) return null;
    return [...main.querySelectorAll('[' + key + ']')]
      .find(el => el.getAttribute(key) === button.getAttribute(key));
  }
  const localAttributes = ['data-dqc-market','data-dqc-clinic-option','data-tc-market',
    'data-tc-clinic-option','data-calc2-market','data-calc2-clinic','data-lcr-lab','data-lcr-cat'];
  function handleToolAction(button) {
    if (button.matches(toolTabs)) {
      const panelId = button.getAttribute('aria-controls');
      const wasSelected = selected(button);
      requestAnimationFrame(() => {
        const panel = panelId && document.getElementById(panelId);
        if (!wasSelected && panel && !panel.hidden) reveal(panel);
      });
    } else if (button.matches(toolFilters + ',' + galleryFilters)) {
      const wasSelected = selected(button);
      const root = button.closest('.dqc-page,.tc-portal');
      const rootClass = root?.classList.contains('dqc-page') ? '.dqc-page' :
        root?.classList.contains('tc-portal') ? '.tc-portal' : null;
      requestAnimationFrame(() => {
        const current = matchingControl(button, localAttributes);
        if (wasSelected) return;
        if (button.matches(galleryFilters)) {
          if (!selected(current)) return;
          const cards = [...main.querySelectorAll('#lcrGrid .lcr-card')].slice(0, 8);
          cards.forEach((card, i) => {
            // A very small stagger, only on an explicit filter click.
            setTimeout(() => reveal(card), i * 18);
          });
          if (!cards.length) fade(document.getElementById('lcrGrid'));

        } else {
          const surface = rootClass ? main.querySelector(rootClass + ' [role="tabpanel"]:not([hidden])') :
            document.getElementById('calc2-lab-panel');
          if (surface && (!current || selected(current))) fade(surface);

        }
      });
    } else if (button.matches('[data-favorite]')) {
      const id = button.getAttribute('data-favorite');
      requestAnimationFrame(() => {
        const replacement = [...main.querySelectorAll('[data-favorite]')]
          .find(el => el.getAttribute('data-favorite') === id);
        if (replacement) positive(replacement.querySelector('svg') || replacement);
      });
    }
  }
  document.addEventListener('click', event => {
    const button = event.target.closest?.('button:not(:disabled):not([aria-disabled="true"])');
    if (button) handleToolAction(button);
  }, true);
  document.addEventListener('keydown', event => {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    const tab = event.target.closest?.(toolTabs);
    if (!tab) return;
    const group = tab.closest('[role="tablist"]');
    const before = group?.querySelector('[aria-selected="true"]')?.id;
    requestAnimationFrame(() => {
      const current = document.activeElement?.closest?.(toolTabs);
      if (!current || current.id === before || !selected(current)) return;
      const panel = document.getElementById(current.getAttribute('aria-controls'));
      if (panel && !panel.hidden) reveal(panel);
    });
  }, true);

  // Planner dates update only on committed input, not on each typed digit.
  document.addEventListener('change', event => {
    if (!event.target.matches?.('[data-tc-start]')) return;
    requestAnimationFrame(() => {
      for (const due of main.querySelectorAll('[data-tc-due]')) reveal(due);
    });
  }, true);


  // Selected states transition in place. No floating outlines, sliding
  // overlays or changes to the portal's existing selection backgrounds.
  const groupSelector = '.tab-strip,.api-guide-tabs,.ao-directory-tabs,.pfux-primary-nav,.pfux-supporting,.dqc-view-switch,.tc-view-switch,.calc2-tabs,.dqc-market-buttons,.tc-market-buttons,.lcr-filter-buttons,.lcr-categories,.branch-options,.pfux-view-toggle,.guide-mode-switch';
  const currentSelector = 'button[aria-selected="true"],button[aria-pressed="true"],button[aria-current="page"],button.active,button.is-selected,button.selected';
  let selectionToken = 0;
  function captureSelection(button) {
    if (reduced.matches || printing.matches) return;
    const group = button.closest(groupSelector);
    if (!group || button.matches(currentSelector)) return;
    const selector = groupSelector.split(',').find(value => group.matches(value));
    const index = [...main.querySelectorAll(selector)].indexOf(group);
    const label = group.getAttribute('aria-label');
    const identity = button.textContent.trim();
    const style = getComputedStyle(button);
    const before = { backgroundColor: style.backgroundColor, color: style.color,
      borderColor: style.borderColor, boxShadow: style.boxShadow };
    const token = ++selectionToken;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (token !== selectionToken) return;
      const candidates = [...main.querySelectorAll(selector)];
      const nextGroup = group.isConnected ? group :
        (label && candidates.find(item => item.getAttribute('aria-label') === label)) || candidates[index];
      const next = [...(nextGroup?.querySelectorAll(currentSelector) || [])]
        .find(item => item.textContent.trim() === identity);
      if (!next) return;
      const final = getComputedStyle(next);
      animate(next,[before,{ backgroundColor:final.backgroundColor,color:final.color,
        borderColor:final.borderColor,boxShadow:final.boxShadow }],220);
    }));
  }
  document.addEventListener('click',event => {
    const button = event.target.closest?.('button:not(:disabled)');
    if (button) captureSelection(button);
  },true);
  document.addEventListener('keydown',event => {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    const group = event.target.closest?.(groupSelector);
    if (!group) return;
    const buttons = [...group.querySelectorAll('button:not(:disabled)')];
    const index = buttons.indexOf(event.target);
    if (index < 0) return;
    const next = event.key === 'Home' ? buttons[0] : event.key === 'End' ? buttons.at(-1) :
      buttons[(index + (event.key === 'ArrowLeft' ? -1 : 1) + buttons.length) % buttons.length];
    if (next) captureSelection(next);
  },true);

  // Workflow decisions remain immediately readable; animate only their
  // selected control after the existing handler has committed its state.
  document.addEventListener('click', event => {
    const button = event.target.closest?.('[data-reqbranch],[data-reqresolution],[data-sollis-patient]');
    if (!button || selected(button)) return;
    requestAnimationFrame(() => {
      const current = matchingControl(button, ['data-reqbranch','data-reqresolution','data-sollis-patient']);
      if (selected(current) && !current.closest(groupSelector)) fade(current);
    });
  }, true);

  // Target intentional actions rather than every DOM mutation.
  document.addEventListener('click', event => {
    const button = event.target.closest?.('button:not(:disabled):not([aria-disabled="true"])');
    if (!button) return;
    const isStep = button.matches('[data-guide-step]');
    const isMode = button.matches('[data-guide-mode]');
    const isBranch = button.matches('[data-sollis-patient], [data-orders-market-option]');
    const segment = button.closest('.pfux-view-toggle,.guide-mode-switch');
    const oldStep = main.querySelector('#guideStageDetails .guide-card-index')?.textContent;
    const controls = (button.getAttribute('aria-controls') || '').split(/\s+/).filter(Boolean);
    const opening = button.getAttribute('aria-expanded') === 'false';
    requestAnimationFrame(() => {
      if (isStep) {
        const card = main.querySelector('#guideStageDetails .guide-card');
        const newStep = card?.querySelector('.guide-card-index')?.textContent;
        if (card && newStep !== oldStep) {
          reveal(card.querySelector('.guide-card-title'));
          for (const child of [...card.children].filter(el => !el.matches('.guide-card-head'))) reveal(child);
        }
      } else if (isMode) {
        fade(main.querySelector('#guideStageDetails') || main.querySelector('.procedure-flow'));
      } else if (isBranch) {
        fade(main.querySelector('.sollis-patient-branch') || main);
      }
      if (opening) {
        for (const id of controls) {
          const panel = document.getElementById(id);
          if (panel && !panel.hidden && !panel.matches('#labCentralMarketOptions,#searchSuggestions,#printOptions,.lc-orders-market-options')) {
            reveal(panel);
          }
        }
      }
      if (!segment && button.matches('.guide-button,.back-link,.primary-button,.soft-button,.lc-print-trigger,.lc-global-market-trigger')) {
        pulse(button);
      }
    });
  }, true);
})();
