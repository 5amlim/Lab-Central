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

  // Page changes and market changes only, not search keystrokes or refreshes.
  let route = location.hash;
  let routeFrame = 0;
  function pageMotion() {
    cancelAnimationFrame(routeFrame);
    routeFrame = requestAnimationFrame(() => {
      fade(main);
      initSegments();
    });
  }
  window.addEventListener('hashchange', () => {
    if (route === location.hash) return;
    route = location.hash;
    pageMotion();
  });
  document.addEventListener('labcentral:marketchange', () => {
    pageMotion();
    reveal(document.getElementById('labCentralMarketLabel'));
  });

  // Expand only a disclosure the user actually operated. Native details
  // semantics, keyboard behavior and instant closing are preserved.
  const openedByUser = new WeakSet();
  document.addEventListener('click', event => {
    const summary = event.target.closest?.('summary');
    if (summary && summary.parentElement?.matches('details')) {
      const detail = summary.parentElement;
      if (!detail.open) {
        openedByUser.add(detail);
        setTimeout(() => openedByUser.delete(detail), 400);
      }
    }
  }, true);
  document.addEventListener('toggle', event => {
    const detail = event.target;
    if (!detail.matches?.('details[open]') || !openedByUser.has(detail)) return;
    openedByUser.delete(detail);
    for (const child of Array.from(detail.children).filter(el => !el.matches('summary')).slice(0, 6)) {
      reveal(child);
    }
  }, true);

  // Keep the actual selected procedure mode and slide its surface, including
  // when the guide is rebuilt and the original buttons are replaced.
  const segmentState = new WeakMap();
  function initSegments(previous = null) {
    for (const group of main.querySelectorAll('.pfux-view-toggle,.guide-mode-switch')) {
      const buttons = [...group.querySelectorAll(':scope > button[data-guide-mode]')];
      if (buttons.length !== 2) continue;
      const selected = buttons.find(button => button.classList.contains('active') || button.getAttribute('aria-pressed') === 'true');
      if (!selected || !selected.offsetWidth) continue;
      let indicator = group.querySelector(':scope > .lc-motion-indicator');
      if (!indicator) {
        group.classList.add('lc-motion-segmented');
        indicator = document.createElement('span');
        indicator.className = 'lc-motion-indicator';
        indicator.setAttribute('aria-hidden', 'true');
        group.prepend(indicator);
      }
      const geom = [selected.offsetLeft, selected.offsetTop, selected.offsetWidth, selected.offsetHeight];
      const from = previous && previous.mode !== selected.dataset.guideMode
        ? buttons.find(button => button.dataset.guideMode === previous.mode) : null;
      Object.assign(indicator.style, {
        width: geom[2] + 'px', height: geom[3] + 'px',
        transform: 'translate(' + geom[0] + 'px,' + geom[1] + 'px)'
      });
      if (from) {
        animate(indicator, [
          { transform: 'translate(' + from.offsetLeft + 'px,' + from.offsetTop + 'px)', width: from.offsetWidth + 'px' },
          { transform: indicator.style.transform, width: geom[2] + 'px' }
        ], 300);
      }
      if (!segmentState.has(group) && typeof ResizeObserver === 'function') {
        const resize = new ResizeObserver(() => {
          if (!group.isConnected) { resize.disconnect(); return; }
          initSegments();
        });
        resize.observe(group);
        segmentState.set(group, resize);
      }
    }
  }
  initSegments();
  const mainObserver = new MutationObserver(() => initSegments());
  mainObserver.observe(main, { childList: true });


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
          positive(current);
        } else {
          const surface = rootClass ? main.querySelector(rootClass + ' [role="tabpanel"]:not([hidden])') :
            document.getElementById('calc2-lab-panel');
          if (surface && (!current || selected(current))) fade(surface);
          if (selected(current)) positive(current);
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


  // Move an outline between selected options rather than repainting complex
  // cards. Their existing selected colors, text and accessibility stay intact.
  const movingGroups = [
    '.tab-strip', '.api-guide-tabs', '.ao-directory-tabs', '.pfux-primary-nav',
    '.pfux-supporting', '.dqc-view-switch', '.tc-view-switch', '.calc2-tabs',
    '.dqc-market-buttons', '.tc-market-buttons', '.lcr-filter-buttons',
    '.lcr-categories', '.branch-options'
  ];
  const groupSelector = movingGroups.join(',');
  const currentSelector = 'button[aria-selected="true"],button[aria-pressed="true"],button[aria-current="page"],button.active,button.is-selected,button.selected';
  const shown = rect => rect.width > 0 && rect.height > 0 && rect.top < innerHeight &&
    rect.bottom > 0 && rect.left < innerWidth && rect.right > 0;
  let movingOutline = null;
  let pendingSelection = 0;
  function captureSelection(button) {
    const group = button.closest(groupSelector);
    if (!group || group.closest('.pfux-view-toggle,.guide-mode-switch')) return;
    const selector = movingGroups.find(value => group.matches(value));
    const old = group.querySelector(currentSelector);
    if (!old || old === button) return;
    const from = old.getBoundingClientRect();
    if (!shown(from)) return;
    const groupIndex = [...main.querySelectorAll(selector)].indexOf(group);
    const label = group.getAttribute('aria-label');
    const oldLabel = old.textContent.trim();
    const token = ++pendingSelection;
    const finish = () => {
      if (token !== pendingSelection || reduced.matches || printing.matches) return;
      const candidates = [...main.querySelectorAll(selector)];
      const nextGroup = group.isConnected ? group :
        (label && candidates.find(item => item.getAttribute('aria-label') === label)) || candidates[groupIndex];
      const next = nextGroup?.querySelector(currentSelector);
      if (!next || next.textContent.trim() === oldLabel) return;
      const to = next.getBoundingClientRect();
      if (!shown(to)) return;
      const dx = from.left - to.left, dy = from.top - to.top;
      // Don't fly across the screen if navigation changed layout or scroll.
      if (Math.abs(dy) > 180 || Math.abs(dx) > innerWidth * .85) return;
      movingOutline?.remove();
      const style = getComputedStyle(next);
      const ring = document.createElement('span');
      ring.className = 'lc-moving-selection';
      ring.setAttribute('aria-hidden','true');
      Object.assign(ring.style, {
        left: to.left + 'px', top: to.top + 'px', width: to.width + 'px',
        height: to.height + 'px', borderRadius: style.borderRadius,
        color: style.color
      });
      document.body.appendChild(ring);
      movingOutline = ring;
      const flight = ring.animate([
        { transform: 'translate(' + dx + 'px,' + dy + 'px)', width: from.width + 'px', height: from.height + 'px', opacity: .60 },
        { transform: 'translate(0,0)', width: to.width + 'px', height: to.height + 'px', opacity: .65, offset: .72 },
        { transform: 'translate(0,0)', width: to.width + 'px', height: to.height + 'px', opacity: 0 }
      ], { duration: 330, easing: 'cubic-bezier(.25,.75,.25,1)' });
      const clear = () => { ring.remove(); if (movingOutline === ring) movingOutline = null; };
      flight.addEventListener('finish', clear, { once:true });
      flight.addEventListener('cancel', clear, { once:true });
      setTimeout(clear, 400);
    };
    // Hash routes are rendered in a separate event. Give both in-place and
    // route-based controls one frame to commit their selected state.
    requestAnimationFrame(() => requestAnimationFrame(finish));
  }
  document.addEventListener('click', event => {
    const button = event.target.closest?.('button:not(:disabled)');
    if (button) captureSelection(button);
  }, true);
  document.addEventListener('keydown', event => {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    const group = event.target.closest?.(groupSelector);
    if (!group) return;
    const buttons = [...group.querySelectorAll('button:not(:disabled)')];
    const index = buttons.indexOf(event.target);
    if (index < 0) return;
    const next = event.key === 'Home' ? buttons[0] : event.key === 'End' ? buttons.at(-1) :
      buttons[(index + (event.key === 'ArrowLeft' ? -1 : 1) + buttons.length) % buttons.length];
    if (next) captureSelection(next);
  }, true);
  window.addEventListener('scroll', () => movingOutline?.remove(), { passive:true });
  window.addEventListener('beforeprint', () => movingOutline?.remove());
  reduced.addEventListener?.('change', event => { if (event.matches) movingOutline?.remove(); });

  // Workflow decisions remain immediately readable; animate only their
  // selected control after the existing handler has committed its state.
  document.addEventListener('click', event => {
    const button = event.target.closest?.('[data-reqbranch],[data-reqresolution],[data-sollis-patient]');
    if (!button || selected(button)) return;
    requestAnimationFrame(() => {
      const current = matchingControl(button, ['data-reqbranch','data-reqresolution','data-sollis-patient']);
      if (selected(current)) pulse(current);
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
    const previous = segment?.querySelector('button.active,button[aria-pressed="true"]')?.dataset.guideMode;
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
        if (previous) initSegments({ mode: previous });
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
