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
    for (const group of main.querySelectorAll('.pfux-view-toggle')) {
      const buttons = [...group.querySelectorAll(':scope > button[data-guide-mode]')];
      if (buttons.length !== 2) continue;
      const selected = buttons.find(button => button.classList.contains('active'));
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

  // Target intentional actions rather than every DOM mutation.
  document.addEventListener('click', event => {
    const button = event.target.closest?.('button:not(:disabled):not([aria-disabled="true"])');
    if (!button) return;
    const isStep = button.matches('[data-guide-step]');
    const isMode = button.matches('[data-guide-mode]');
    const isBranch = button.matches('[data-sollis-patient], [data-orders-market-option]');
    const segment = button.closest('.pfux-view-toggle');
    const previous = segment?.querySelector('button.active')?.dataset.guideMode;
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
