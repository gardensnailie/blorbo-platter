/* Runs after card.js has built the cards. Builds the sidebar from card tags, filters cards, and handles version tabs.
   No libraries. Text is inserted with textContent/append only (never innerHTML). */
(() => {
  'use strict';

  /* ===== SETTINGS ===== */
  const CATEGORY_ORDER = ['gender', 'setting', 'role', 'age']; // sidebar order; others follow in page order

  const $ = id => document.getElementById(id);
  const grid = $('grid'), filters = $('filters'), clearBtn = $('clear-filters'),
        emptyMsg = $('empty-state'), drawer = $('drawer');
  if (!grid || !filters || !clearBtn || !emptyMsg) return;

  const norm = s => s.trim().toLowerCase().replace(/\s+/g, '-');
  const pretty = s => { const t = s.replace(/-/g, ' '); return t.charAt(0).toUpperCase() + t.slice(1); };
  const split = key => { const i = key.indexOf(':'); return [key.slice(0, i), key.slice(i + 1)]; };

  /* ===== 1. READ CARDS (once) ===== */
  // Parse "setting: space ship; role: crew" into a Set of "category:value" keys
  function parseTags(card) {
    const tags = new Set();
    for (const group of (card.dataset.tags || '').split(';')) {
      const i = group.indexOf(':');
      if (i < 1) { if (group.trim()) console.warn('[cast] Skipped tag group without "category:":', group.trim()); continue; }
      const cat = norm(group.slice(0, i));
      for (const v of group.slice(i + 1).trim().split(/\s+/)) if (v) tags.add(cat + ':' + v.toLowerCase());
    }
    // Gender is read from <li class="gender"> so it is never typed twice
    const g = card.querySelector('.info li.gender');
    if (g) { const v = norm(g.textContent); if (v) tags.add('gender:' + v); }
    return tags;
  }

  const chars = [], byEl = new WeakMap(), tagCount = new Map();
  for (const el of grid.querySelectorAll(':scope > .character')) {
    const cards = [...el.querySelectorAll(':scope > .card')];
    if (!cards.length) continue;
    const ch = { el, active: 0, tablist: null,
      versions: cards.map(card => ({ card, tags: parseTags(card), ok: true, btn: null })) };
    for (const v of ch.versions) for (const k of v.tags) tagCount.set(k, (tagCount.get(k) || 0) + 1);
    if (cards.length > 1) buildTabs(ch);
    chars.push(ch); byEl.set(el, ch);
  }

  function buildTabs(ch) {
    const list = document.createElement('div');
    list.className = 'tabs'; list.hidden = true;
    list.setAttribute('role', 'tablist'); list.setAttribute('aria-label', 'Versions');
    ch.versions.forEach((v, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.setAttribute('role', 'tab'); b.dataset.i = i;
      const h = v.card.querySelector('h3');
      const name = (v.card.dataset.label || (h && h.textContent) || 'Version ' + (i + 1)).trim().replace(/\s+/g, ' ');
      const ico = (v.card.dataset.icon || '').trim();
      if (/^fa-[a-z0-9-]+$/.test(ico)) {          // the version's own icon; only plain icon class names accepted
        const ic = document.createElement('i');
        ic.className = window.CastCard.iconClass(ico);
        ic.setAttribute('aria-hidden', 'true');
        b.append(ic);
        if (v.card.dataset.iconColor) b.style.setProperty('--icon-color', v.card.dataset.iconColor); // CSS tints it
      } else {
        b.textContent = (i + 1) + '.';             // no custom icon: show the number
      }
      b.title = name; b.setAttribute('aria-label', name); // full name for hover and screen readers
      v.btn = b; list.append(b);
    });
    ch.tablist = list;
  }

  /* ===== 2. BUILD SIDEBAR ===== */
  const cats = new Map(); // category -> Set of values
  for (const key of tagCount.keys()) {
    const [c, v] = split(key);
    if (!cats.has(c)) cats.set(c, new Set());
    cats.get(c).add(v);
  }
  const rank = c => { const i = CATEGORY_ORDER.indexOf(c); return i < 0 ? 1e9 : i; };
  const inputs = new Map(); // "category:value" -> checkbox (also the allow-list for URL hashes)
  const frag = document.createDocumentFragment();
  for (const c of [...cats.keys()].sort((a, b) => rank(a) - rank(b))) {
    const set = document.createElement('fieldset');
    const legend = document.createElement('legend');
    legend.textContent = pretty(c);
    set.append(legend);
    for (const v of [...cats.get(c)].sort((a, b) => a.localeCompare(b))) {
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.type = 'checkbox'; input.name = c; input.value = v;
      label.append(input, ' ', pretty(v));
      set.append(label);
      inputs.set(c + ':' + v, input);
    }
    frag.append(set);
  }
  filters.replaceChildren(frag);

  /* ===== 3. FILTER ===== */
  const selected = new Set();
  const hasAll = tags => { for (const k of selected) if (!tags.has(k)) return false; return true; };

  function render(ch) {
    const passing = ch.versions.reduce((n, v) => n + (v.ok ? 1 : 0), 0);
    const tabbed = passing > 1;
    ch.versions.forEach((v, i) => {
      const on = i === ch.active;
      v.card.hidden = !on;
      if (tabbed) v.card.setAttribute('role', 'tabpanel'); else v.card.removeAttribute('role');
      if (v.btn) {
        v.btn.hidden = !v.ok;
        v.btn.setAttribute('aria-selected', String(on));
        v.btn.tabIndex = on ? 0 : -1;
      }
    });
    if (ch.tablist) {
      ch.tablist.hidden = !tabbed;
      const card = ch.versions[ch.active].card;
      if (tabbed && card.firstChild !== ch.tablist) card.prepend(ch.tablist); // tabs live inside the visible card
    }
  }

  function apply() {
    let shown = 0;
    for (const ch of chars) {
      let first = -1;
      ch.versions.forEach((v, i) => { v.ok = hasAll(v.tags); if (v.ok && first < 0) first = i; });
      ch.el.hidden = first < 0;
      if (first < 0) continue;
      shown++;
      if (!ch.versions[ch.active].ok) ch.active = first; // active tab was filtered out
      render(ch);
    }
    emptyMsg.hidden = shown > 0;
    clearBtn.disabled = selected.size === 0;
  }

  /* ===== 4. SHARE LINKS: #setting=space,ship&role=crew ===== */
  function writeHash() {
    const by = new Map();
    for (const k of selected) { const [c, v] = split(k); (by.get(c) || by.set(c, []).get(c)).push(v); }
    const h = [...by].map(([c, vs]) => encodeURIComponent(c) + '=' + vs.map(encodeURIComponent).join(',')).join('&');
    try { history.replaceState(null, '', h ? '#' + h : location.pathname + location.search); } catch { /* ignore */ }
  }
  function readHash() { // only tags that exist in the sidebar are accepted
    selected.clear();
    for (const [c, vals] of new URLSearchParams(location.hash.slice(1)))
      for (const v of vals.split(',')) { const k = c.toLowerCase() + ':' + v.toLowerCase(); if (inputs.has(k)) selected.add(k); }
    for (const [k, input] of inputs) input.checked = selected.has(k);
  }

  /* ===== 5. EVENTS ===== */
  filters.addEventListener('change', e => {
    const t = e.target;
    if (!(t instanceof HTMLInputElement)) return;
    const k = t.name + ':' + t.value;
    if (t.checked) selected.add(k); else selected.delete(k);
    apply(); writeHash();
  });

  clearBtn.addEventListener('click', () => {
    selected.clear();
    for (const input of inputs.values()) input.checked = false;
    apply(); writeHash();
  });

  function select(ch, i, focus) {
    ch.active = i; render(ch);
    if (focus) ch.versions[i].btn.focus(); // moving the tab bar drops focus, so restore it
  }
  grid.addEventListener('click', e => {
    const b = e.target.closest('.tabs button');
    const ch = b && byEl.get(b.closest('.character'));
    if (ch) select(ch, +b.dataset.i, true);
  });
  grid.addEventListener('keydown', e => {
    const b = e.target.closest('.tabs button');
    const ch = b && byEl.get(b.closest('.character'));
    if (!ch) return;
    const open = ch.versions.map((v, i) => i).filter(i => ch.versions[i].ok);
    const pos = open.indexOf(+b.dataset.i);
    let next;
    if (e.key === 'ArrowRight') next = open[(pos + 1) % open.length];
    else if (e.key === 'ArrowLeft') next = open[(pos - 1 + open.length) % open.length];
    else if (e.key === 'Home') next = open[0];
    else if (e.key === 'End') next = open[open.length - 1];
    else return;
    e.preventDefault();
    select(ch, next, true);
  });

  window.addEventListener('hashchange', () => { readHash(); apply(); });

  // Mobile: sidebar is a collapsed drawer; desktop: always open
  if (drawer) {
    const mq = matchMedia('(max-width: 700px)');
    const sync = () => { drawer.open = !mq.matches; };
    sync(); mq.addEventListener('change', sync);
  }

  readHash(); apply(); // restore filters from a shared link
})();
