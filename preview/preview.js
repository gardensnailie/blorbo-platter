/* PREVIEW SCRIPT: sample data + the real site and editor scripts in one file. For CSS editing only; nothing is saved anywhere. */

/* ===== flags.js (plus a sample text-layer flag) ===== */
/* FLAG LIBRARY: add one entry per flag.
   name:     lowercase letters, numbers, hyphens (this is what characters store)
   label:    hover text and screen-reader name
   gradient: a CSS linear-gradient(...)
   Layered flag: use  layers: [ { gradient }, { gradient, clip } ]  instead of gradient.
   The first layer fills the flag; each later layer is drawn on top, cut to the shape in clip
   (e.g. "polygon(40% 0, 60% 0, 60% 100%, 40% 100%)" = a center stripe). */
window.FLAGS = {
/* ======================== SEXUAL ORIENTATIONS ============================== */
  straight:     { label: "Heterosexual", group: "Sexual",      gradient: "linear-gradient(#000,#000 16.7%,#303030 16.7%,#303030 33.4%,#666666 33.3%,#666666 50.1%,#9a9a9a 50.1%,#9a9a9a 66.8%,#bcbcbc 66.8%,#bcbcbc 83.5%,#fff 83.5%)" },
  bisexual: { label: "Bisexual", group: "Sexual",      gradient: "linear-gradient(#d70170,#d70170 40%,#734f94 40%,#734f94 60%,#0039a7 60%)" },
  gay:    { label: "Gay", group: "Sexual",      gradient: "linear-gradient(#ef2d1f,#ef2d1f 16.7%,#f58024 16.7%,#f58024 33.4%,#fff000 33.3%,#fff000 50.1%,#57ba45 50.1%,#57ba45 66.8%,#0053a7 66.8%,#0053a7 83.5%,#a01f90 83.5%)" }, 
   lesbian:    { label: "Lesbian", group: "Sexual",      gradient: "linear-gradient(#d42c00,#d42c00 20%,#fd9855 20%,#fd9855 40%,#fff 40%,#fff 60%,#d161a2 60%,#d161a2 80%,#a20161 80%)" },
    ace:    { label: "Asexual", group: "Sexual",      gradient: "linear-gradient(#000,#000 25%,#7f7f7f 25%,#7f7f7f 50%,#fff 50%,#fff 75%,#670066 75%)" },
   gyno:    { label: "Gynosexual", group: "Sexual",      gradient: "linear-gradient(#f5acba,#f5acba 33.3%,#934532 33.3%,#934532 66.6%,#609740 66.6%)" },
   andro:    { label: "Androsexual", group: "Sexual",      gradient: "linear-gradient(#01ccff,#01ccff 33.3%,#603524 33.3%,#603524 66.6%,#b799de 66.6%)" },
   
  "heteroflex": { label: "Heteroflexible", group: "Sexual",      layers: [{ gradient: "linear-gradient(#000,#000 16.7%,#303030 16.7%,#303030 33.4%,#666666 33.3%,#666666 50.1%,#9a9a9a 50.1%,#9a9a9a 66.8%,#bcbcbc 66.8%,#bcbcbc 83.5%,#fff 83.5%)" },{ gradient: "linear-gradient(#ef2d1f,#ef2d1f 16.7%,#f58024 16.7%,#f58024 33.4%,#fff000 33.3%,#fff000 50.1%,#57ba45 50.1%,#57ba45 66.8%,#0053a7 66.8%,#0053a7 83.5%,#a01f90 83.5%)", clip: "polygon(40% 0, 60% 0, 60% 100%, 40% 100%)" }] },
   
"homoflex": { label: "Homoflexible", group: "Sexual",      layers: [{ gradient: "linear-gradient(#ef2d1f,#ef2d1f 16.7%,#f58024 16.7%,#f58024 33.4%,#fff000 33.3%,#fff000 50.1%,#57ba45 50.1%,#57ba45 66.8%,#0053a7 66.8%,#0053a7 83.5%,#a01f90 83.5%)" },{ gradient: "linear-gradient(#000,#000 16.7%,#303030 16.7%,#303030 33.4%,#666666 33.3%,#666666 50.1%,#9a9a9a 50.1%,#9a9a9a 66.8%,#bcbcbc 66.8%,#bcbcbc 83.5%,#fff 83.5%)", clip: "polygon(40% 0,60% 0,60% 100%,40% 100%)" }] },


/* ======================== ROMANTIC ORIENTATIONS ============================== */

   aro:    { label: "Aromantic", group: "Romantic",      gradient: "linear-gradient(#3ca542,#3ca542 20%,#a8d377 20%,#a8d377 40%,#fff 40%,#fff 60%,#a9a9a9 60%,#a9a9a9 80%,#000 80%)" },
  poly: { label: "Polyamorous", group: "Romantic",      layers: [{ gradient: "linear-gradient(#0000ff,#0000ff 33.3%,#fe0100 33.3%,#fe0100 66.6%,#000 66.6%)" },{ text: "π", color: "#000", size: "14px" }] },
   
/* ========================== GENDER ================================ */

trans:    { label: "Transgender", group: "Gender",      gradient: "linear-gradient(#5ac7ed,#5ac7ed 20%,#efa4b1 20%,#efa4b1 40%,#fff 40%,#fff 60%,#efa4b1 60%,#efa4b1 80%,#5ac7ed 80%)" },
   nb:    { label: "Nonbinary", group: "Gender",      gradient: "linear-gradient(#fff42c,#fff42c 25%,#fff 25%,#fff 50%,#9d59d2 50%,#9d59d2 75%,#000 75%)" },
   agender:    { label: "Agender", group: "Gender",      gradient: "linear-gradient(#000,#000 14.3%,#bcc5c6 14.3%,#bcc5c6 28.6%,#fff 28.6%,#fff 42.9%,#b5f582 42.9%,#b5f582 57.2%,#fff 57.2%,#fff 71.5%,#bcc5c6 71.5%,#bcc5c6 85.8%,#000 85.8%)" },
   
/* ========================== OTHER ================================ */
   
   questioning:    { label: "Questioning", group: "Other",      gradient: "linear-gradient(#ed7735,#ed7735 25%,#f4ec2b 25%,#f4ec2b 50%,#5ab34d 50%,#5ab34d 75%,#5168b0 75%)" },
intersex: { label: "Disorder of Sexual Development (Intersex)", group: "Other",      layers: [{ gradient: "linear-gradient(#ffd900,#ffd900)" },{ gradient: "linear-gradient(#7a00ab,#7a00ab)", clip: "circle(25.87%)" },{ gradient: "linear-gradient(#ffd900,#ffd900)", clip: "circle(17.25%)" }] },

   
};

/* ===== sample characters (stands in for characters.js) ===== */
window.CAST = [  [    {      "label": "Default",      "name": "Aleksandr Nikonovich Vashchenko",      "subtitle": "",      "icon": "",      "iconColor": "",      "img": "https://f2.toyhou.se/file/f2-toyhou-se/thumbnails/98982058_ykW.png",      "gender": "Female",      "age": "37",      "birthday": "Feb. 12",      "height": "5'4\"",      "flag": "straight",      "race": "Ruska Roma",      "job": "University Professor",      "tags": "setting: five-keys; age: adult",      "desc": "🙏❤️ СЛАВА РОССИИ 🙏❤️"    }  ],  [    {      "label": "MMX",      "name": "Eight ( 4A )",      "subtitle": "YKN-0148-A",      "icon": "fa-sparkles",      "iconColor": "",      "img": "https://f2.toyhou.se/file/f2-toyhou-se/thumbnails/111465800_cxV.png",      "gender": "Male",      "age": "24",      "birthday": "Aug. 8",      "height": "5'8\"",      "flag": "bisexual",      "race": "Reploid",      "job": "Navigator",      "tags": "setting: space; age: adult",      "desc": "hey have you ever heard of the hit animated series pretty kitty mew mew"    },    {      "label": "TOK-EIGHT",      "name": "Kamiya Haru",      "subtitle": "神谷 春",      "icon": "fa-sparkles",      "iconColor": "",      "img": "https://f2.toyhou.se/file/f2-toyhou-se/thumbnails/98979834_dpc.png",      "gender": "Male",      "age": "24",      "birthday": "Aug. 8",      "height": "5'8\"",      "flag": "bisexual",      "race": "Gekko-Dragon",      "job": "Prince, Captian (Former)",      "tags": "origin: original-character; setting: five-keys therapy-au; genre: fantasy modern-life;",      "desc": "bro what if we were geckos would that be fucked up or what"    }  ]];

/* ===== card.js ===== */
/* card.js: builds every character card from window.CAST (characters.js) and fills #grid.
   Characters are shown sorted by the first version's name.
   To change the card layout, edit FIELDS below plus style.css. The editor reuses buildCard for its preview.
   Everything is inserted as text (never as HTML). */
(() => {
  'use strict';

  const ICON_STYLE = 'fa-regular';   // Font Awesome style used for every icon (fa-solid, fa-light, ...)
  const IMG = 150;                 // image size in px (keep equal to --img-size in style.css)
  const FLAGS = window.FLAGS || {};

  /* ===== CARD TEMPLATE: one entry per info box, in display order =====
     row: 'top' or 'bottom' list. cls: class on the <li> (the "gender" class feeds the Gender filter).
     Blank values still draw an empty box so the columns stay aligned. */
  const FIELDS = [
    { key: 'gender',   title: 'Gender',     icon: 'fa-venus',          row: 'top', cls: 'gender' },
    { key: 'age',      title: 'Age',        icon: 'fa-calendar-clock', row: 'top' },
    { key: 'birthday', title: 'Birthday',   icon: 'fa-cake-candles',  row: 'top' },
    { key: 'height',   title: 'Height',     icon: 'fa-ruler',          row: 'top', iconCls: 'tilt' },
    { key: 'flag',     title: 'Flag',                                    row: 'top', flag: true },
    { key: 'race',     title: 'Race',       icon: 'fa-user',     row: 'bottom' },
    { key: 'job',      title: 'Occupation', icon: 'fa-briefcase',           row: 'bottom' },
  ];

  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  };
  const icon = (name, extra) => {
    const i = el('i', ICON_STYLE + ' ' + name + (extra ? ' ' + extra : ''));
    i.setAttribute('aria-hidden', 'true');
    return i;
  };

  // A flag entry is one gradient, or a stack of layers
  const RIGHT_HALF = 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)';
  const GRADIENT = /^linear-gradient\(/i, SHAPE = /^(polygon|inset|circle|ellipse)\(/i;
  const IMAGE = /^(https:\/\/[^\s"'()\\]+|[\w./-]+)$/i;   // URL or path
  // Layer types: { gradient } | { image } | { text } with optional clip. The first layer must be a gradient.
  const layerOk = (l, i) => {
    if (l.clip && !SHAPE.test(l.clip)) return false;
    if (l.gradient) return GRADIENT.test(l.gradient);
    if (i === 0) return false;
    if (l.image) return IMAGE.test(l.image) && (!l.size || CSS.supports('background-size', l.size));
    if (l.text) return String(l.text).length <= 8 && (!l.color || CSS.supports('color', l.color)) && (!l.size || CSS.supports('font-size', l.size));
    return false;
  };
  const layersOf = d => (d ? (Array.isArray(d.layers) ? d.layers : [d]) : []);

  // second flag is layered over the right half of the first
  function buildFlag(names) {
    const defs = String(names || '').trim().split(/\s+/).filter(Boolean).slice(0, 2)
      .map(n => (Object.hasOwn(FLAGS, n) ? FLAGS[n] : null));
    if (!defs.length) return null;
    const layers = [];
    defs.forEach((d, i) => layersOf(d).forEach(l => layers.push(i && !l.clip ? { ...l, clip: RIGHT_HALF } : l)));
    if (defs.includes(null) || !layers.length || layers.some((l, i) => !layerOk(l, i))) {
      console.warn('[cast] Unknown or invalid flag:', names); return null;
    }
    const f = el('span', 'flag');
    layers.forEach((l, i) => {
      if (!i) { f.style.backgroundImage = l.gradient; return; }
      const top = el('span');
      top.style.clipPath = l.clip || 'none';
      if (l.gradient) top.style.backgroundImage = l.gradient;
      else if (l.image) Object.assign(top.style, { backgroundImage: `url("${l.image}")`, backgroundSize: l.size || 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' });
      else { top.textContent = l.text; Object.assign(top.style, { display: 'grid', placeItems: 'center', lineHeight: '1', fontSize: l.size || '12px', color: l.color || '#fff' }); }
      f.append(top);
    });
    const label = defs.map(d => d.label || '').join(' / ');
    f.title = label; f.setAttribute('role', 'img'); f.setAttribute('aria-label', label);
    return f;
  }

  function buildRow(v, row, cls) {
    const ul = el('ul', cls);
    for (const f of FIELDS) {
      if (f.row !== row) continue;
      const li = el('li', f.cls);
      if (f.flag) {
        const flag = buildFlag(v.flag);
        if (flag) li.append(flag);
      } else {
        const b = el('b');
        b.title = f.title; b.append(icon(f.icon, f.iconCls));
        li.append(b, v[f.key] || '');
      }
      ul.append(li);
    }
    return ul;
  }

  function buildCard(v) {
    const iconName = /^fa-[a-z0-9-]+$/.test(v.icon || '') ? v.icon : '';                  // custom icon (optional)
    const color = v.iconColor && CSS.supports('color', v.iconColor) ? v.iconColor : '';     // its color (optional)
    const card = el('article', 'card');
    card.dataset.tags = v.tags || '';
    if (v.label) card.dataset.label = v.label;   // hover/screen-reader name of the version button
    if (iconName) card.dataset.icon = iconName;  // script.js shows this icon on the version button
    if (color) card.dataset.iconColor = color;   // (tinted down by CSS)
    if (v.img) {
      const img = el('img');
      img.alt = ''; img.width = IMG; img.height = IMG; img.loading = 'lazy'; img.decoding = 'async';
      img.src = v.img;
      card.append(img);
    }
    const star = el('b'); star.append(icon(iconName || 'fa-sparkles'));  // default icon
    if (color) star.style.color = color;
    const h3 = el('h3', '', v.name);
    h3.append(el('i', '', v.subtitle), star);
    card.append(h3, buildRow(v, 'top', 'info info-top'), buildRow(v, 'bottom', 'info'), el('p', '', v.desc));
    return card;
  }

  function buildCharacter(versions) {
    const wrap = el('div', 'character');
    for (const v of versions) wrap.append(buildCard(v));
    return wrap;
  }

  window.CastCard = { buildCard, buildCharacter, iconClass: n => ICON_STYLE + ' ' + n };

  const grid = document.getElementById('grid');
  if (grid && Array.isArray(window.CAST)) {
    const by = new Intl.Collator(undefined, { sensitivity: 'base', numeric: true });
    const frag = document.createDocumentFragment();
    window.CAST.filter(c => Array.isArray(c) && c.length)
      .sort((a, b) => by.compare(a[0].name || '', b[0].name || ''))
      .forEach(c => frag.append(buildCharacter(c)));
    grid.replaceChildren(frag);
  }
})();

/* ===== script.js ===== */
/* Runs after card.js has built the cards. Builds the sidebar from card tags, filters cards, and handles version tabs.*/
(() => {
  'use strict';

  /* ===== SETTINGS ===== */
  const CATEGORY_ORDER = ['origin', 'setting', 'theme', 'genre', 'biology', 'gender', 'age', 'tropes' ]; // sidebar order; others follow in page order
  const NO_HEADER = ['origin','theme','genre' ];  // categories shown without their heading

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
    if (NO_HEADER.includes(c)) set.setAttribute('aria-label', pretty(c)); // keeps the group named for screen readers
    else set.append(legend);
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
  // OR within a category, AND between categories
  const matches = tags => {
    const ok = new Map();
    for (const k of selected) { const c = split(k)[0]; ok.set(c, ok.get(c) || tags.has(k)); }
    return ![...ok.values()].includes(false);
  };

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
      ch.versions.forEach((v, i) => { v.ok = matches(v.tags); if (v.ok && first < 0) first = i; });
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

/* ===== editor.js (fake GitHub) ===== */
/* Editor for characters.js: loads from and saves to GitHub. All text is inserted as text, never as HTML. */
(() => {
  'use strict';
  const REPO = 'gardensnailie/blorbo-platter', BRANCH = 'main', FILE = 'characters.js', KEY = 'cast-editor-token';
  const K = ['label','name','subtitle','icon','iconColor','img','gender','age','birthday','height','flag','race','job','tags','desc'];
  const FIELDS = [['label','Label'],['name','Name'],['subtitle','Subtitle'],['icon','Icon Class'],['iconColor','Icon Color'],
    ['img','Image'],['gender','Gender'],['age','Age'],['birthday','Birthday'],['height','Height'],['race','Race / Species'],['job','Occupation']];
  const FLAGS = window.FLAGS || {};
  const $ = id => document.getElementById(id);
  const el = (t, c, x) => { const n = document.createElement(t); if (c) n.className = c; if (x) n.textContent = x; return n; };
  const norm = v => Object.fromEntries(K.map(k => [k, v && typeof v[k] === 'string' ? v[k] : '']));
  const by = new Intl.Collator(undefined, { sensitivity: 'base', numeric: true });
  const b64 = s => { let bin = ''; for (const b of new TextEncoder().encode(s)) bin += String.fromCharCode(b); return btoa(bin); };
  const unb64 = s => new TextDecoder().decode(Uint8Array.from(atob(s.replace(/\s/g, '')), c => c.charCodeAt(0)));

  let tok = 'preview'; // PREVIEW: pretend to be signed in
  let cast = [], sha = '', cur = null, vi = 0, dirty = false;

  const say = (m, bad) => { const s = $('status'); s.textContent = m; s.className = bad ? 'bad' : ''; };
  const run = fn => async (...a) => { try { await fn(...a); } catch (e) { say('Could not reach GitHub: ' + e.message, true); } };

  async function gh(method) {   // PREVIEW: pretends to be GitHub, so nothing is ever read or written
    const ok = { ok: true, status: 200 };
    if (method === 'GET') return { res: ok, data: { content: b64('window.CAST = ' + JSON.stringify(window.CAST) + ';'), sha: 'preview' } };
    return { res: ok, data: { content: { sha: 'preview' } } };
  }
  const why = (res, data) => `GitHub said ${res.status}: ${(data && data.message) || res.statusText}` +
    ({ 401: ' (token wrong or expired)', 403: ' (token needs Contents: Read and write)', 404: ' (check repo name and token access)' }[res.status] || '');

  /* ---------- tags ---------- */
  const parseTags = s => s.split(';').map(g => { const i = g.indexOf(':'); return i < 1 ? null :
    [g.slice(0, i).trim().toLowerCase().replace(/\s+/g, '-'), g.slice(i + 1).trim().split(/\s+/).filter(Boolean)]; }).filter(Boolean);
  // Click a tag to add it to this version; click it again to remove it
  function toggleTag(v, cat, val) {
    const gs = parseTags(v.tags), g = gs.find(x => x[0] === cat), lv = val.toLowerCase();
    if (!g) gs.push([cat, [lv]]);
    else if (g[1].some(x => x.toLowerCase() === lv)) g[1] = g[1].filter(x => x.toLowerCase() !== lv);
    else g[1].push(lv);
    v.tags = gs.filter(([, vs]) => vs.length).map(([c, vs]) => c + ': ' + vs.join(' ')).join('; '); // empty categories are dropped
  }
  function allTags() {
    const m = new Map();
    for (const c of cast) for (const v of c) for (const [cat, vs] of parseTags(v.tags)) { if (!m.has(cat)) m.set(cat, new Set()); vs.forEach(x => m.get(cat).add(x.toLowerCase())); }
    return m;
  }

  /* ---------- rendering ---------- */
  function renderList() {
    const q = $('q').value.trim().toLowerCase(), list = $('list'), frag = document.createDocumentFragment();
    for (const c of [...cast].sort((a, b) => by.compare(a[0].name, b[0].name))) {
      if (q && !c.some(v => v.name.toLowerCase().includes(q))) continue;
      const b = el('button', c === cur ? 'on' : '', c[0].name || '(unnamed)');
      b.type = 'button'; b.dataset.i = cast.indexOf(c); frag.append(b);
    }
    list.replaceChildren(frag);
  }
  const preview = () => { const v = cur && cur[vi]; $('preview').replaceChildren(...(v ? [window.CastCard.buildCharacter([v])] : [])); };
  function touch() { dirty = true; $('save').disabled = false; say(''); preview(); }

  // Tag buttons: highlighted (.on) when this version already has the tag
// Tag buttons: one block per category (small header, then its chips); highlighted (.on) when this version has the tag
function renderChips() {
  const box = document.querySelector('#form .chips'); if (!box || !cur) return;
  const have = new Set(parseTags(cur[vi].tags).flatMap(([c, vs]) => vs.map(x => c + ':' + x.toLowerCase())));
  const frag = document.createDocumentFragment();
  for (const [cat, vals] of allTags()) {
    const g = el('div', 'chipgroup'), row = el('div', 'chiprow');
    g.setAttribute('role', 'group'); g.setAttribute('aria-label', cat); // screen readers still hear the category
    g.append(el('p', 'chipcat', cat), row);
    for (const x of [...vals].sort()) {
      const on = have.has(cat + ':' + x), b = el('button', on ? 'on' : '', x);
      b.type = 'button'; b.dataset.act = 'tag'; b.dataset.c = cat; b.dataset.v = x; b.setAttribute('aria-pressed', String(on));
      row.append(b);
    }
    frag.append(g);
  }
  box.replaceChildren(frag);
}

  function renderForm() {
    const f = $('form'); f.replaceChildren(); preview();
    if (!cur) return f.append(el('p', 'hint', 'Pick a character, or add a new one.'));
    const v = cur[vi], bar = el('div', 'vbar');
    cur.forEach((x, i) => { const b = el('button', i === vi ? 'on' : '', x.label || x.name || 'Version ' + (i + 1)); b.type = 'button'; b.dataset.act = 'ver'; b.dataset.i = i; bar.append(b); });

const breakEl = el('div', 'flex-break');
    bar.append(breakEl);
    
    for (const [a, t] of [['addv', '+ Alt'], ['delv', '- Alt'], ['dupv', 'Duplicate'], ['delc', 'Delete Character']]) { const b = el('button', '', t); b.type = 'button'; b.dataset.act = a; bar.append(b); }
    f.append(bar);

    // Label Hints
const HINTS = { 
  label: 'changes display name on tabs',
  icon: 'ex. fa-sparkles', 
  iconColor: 'css or hex',
  img: 'relative path or url',
  L: 'primary',
  R: 'secondary (optional)',};
for (const [k, label] of FIELDS) {
  const l = el('label', '', label), i = el('input');
  if (HINTS[k]) l.append(el('p', 'hint', HINTS[k]));
  i.dataset.k = k; i.value = v[k]; l.append(i); f.append(l);
}
    const [L = '', R = ''] = v.flag.split(/\s+/);
    for (const [pos, val, label] of [['L', L, 'Flags '], ['R', R, 'Flag (Secondary)']]) {
      const l = el('label', '', label), s = el('select');
      if (HINTS[pos]) l.append(el('p', 'hint', HINTS[pos]));
      s.dataset.flag = pos;
      s.append(new Option('(none)', ''));
      for (const [n, d] of Object.entries(FLAGS)) s.append(new Option(d.label || n, n));
      if (val && !Object.hasOwn(FLAGS, val)) s.append(new Option('(missing from flags.js: ' + val + ')', val))
    }
    for (const [pos, val, label] of [['L', L, 'Flags '], ['R', R, '⠀']]) {
  const l = el('label', '', label), s = el('select');
  if (HINTS[pos]) l.append(el('p', 'hint', HINTS[pos]));
  s.dataset.flag = pos;
  s.append(new Option('(none)', ''));

  // 1. Group flags by their category
  const groups = {};
  for (const [n, d] of Object.entries(FLAGS)) {
    const groupName = d.group || 'Other';
    if (!groups[groupName]) groups[groupName] = [];
    groups[groupName].push([n, d]);
  }

  // 2. Create optgroups and append options inside them
  for (const [groupName, flagEntries] of Object.entries(groups)) {
    const optgroup = document.createElement('optgroup');
    optgroup.label = groupName;

    for (const [n, d] of flagEntries) {
      optgroup.append(new Option(d.label || n, n));
    }
    s.append(optgroup);
  }

  // 3. Handle missing/legacy flags if they aren't in any group
  if (val && !Object.hasOwn(FLAGS, val)) {
    s.append(new Option('(missing from flags.js: ' + val + ')', val));
  }
  ; // never show a blank
      s.value = val; l.append(s); f.append(l);
    }
    const dl = el('label', '', 'Description'), dt = el('textarea'); dt.rows = 3; dt.dataset.k = 'desc'; dt.value = v.desc; dl.append(dt); f.append(dl);
    const tl = el('label', '', 'Tags'), ti = el('input'); 
    tl.append(el('p', 'hint', 'ex. category: value-one value; category: value '));
      ti.dataset.k = 'tags'; ti.value = v.tags; tl.append(ti); f.append(tl);
    f.append(el('div', 'chips'));
    renderChips(); }
    
  const renderAll = () => { renderList(); renderForm(); };

  /* ---------- events ---------- */
  $('form').addEventListener('input', e => {
    const k = e.target.dataset.k; if (!k) return;
    cur[vi][k] = e.target.value; touch();
  });
  $('form').addEventListener('change', e => {
    if (e.target.dataset.k === 'name' || e.target.dataset.k === 'label') { renderList(); }
    if (e.target.dataset.flag) {
      const [l, r] = [...document.querySelectorAll('#form select')].map(s => s.value);
      cur[vi].flag = l ? [l, r].filter(Boolean).join(' ') : ''; touch();
    }
  });
  $('form').addEventListener('click', e => {
    const b = e.target.closest('button'), a = b && b.dataset.act; if (!a) return;
    const blank = () => norm({});
    if (a === 'ver') vi = +b.dataset.i;
    else if (a === 'addv') { cur.push(blank()); vi = cur.length - 1; dirty = true; }
    else if (a === 'dupv') { cur.splice(vi + 1, 0, { ...cur[vi] }); vi++; dirty = true; }
    else if (a === 'delv') { if (cur.length < 2) return say('A character needs at least one version.', true); if (!confirm('Remove this version?')) return; cur.splice(vi, 1); vi = Math.max(0, vi - 1); dirty = true; }
    else if (a === 'delc') { if (!confirm('Delete this whole character?')) return; cast.splice(cast.indexOf(cur), 1); cur = null; vi = 0; dirty = true; }
        else if (a === 'tag') { toggleTag(cur[vi], b.dataset.c, b.dataset.v); dirty = true; }
    $('save').disabled = !dirty; renderAll();
  });
  $('list').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    cur = cast[+b.dataset.i]; vi = 0; renderAll();
  });
  $('q').addEventListener('input', renderList);
  $('add').addEventListener('click', () => {
    const v = norm({}); v.name = 'New character'; cur = [v]; cast.push(cur); vi = 0; dirty = true; $('save').disabled = false; renderAll();
  });
  window.addEventListener('beforeunload', e => { if (dirty) { e.preventDefault(); e.returnValue = ''; } });

  /* ---------- load / save / sign-in ---------- */
  const load = run(async () => {
    say('Loading…');
    const { res, data } = await gh('GET');
    if (!res.ok) { say(why(res, data), true); if (res.status === 401) signOut(); return; }
    const t = unb64(data.content);
    try { cast = JSON.parse(t.slice(t.indexOf('['), t.lastIndexOf(';'))).filter(c => Array.isArray(c) && c.length).map(c => c.map(norm)); }
    catch (e) { return say('Could not read characters.js: ' + e.message, true); }
    sha = data.sha; dirty = false; cur = null; vi = 0; $('save').disabled = true; renderAll(); say(`Loaded ${cast.length} characters.`);
  });

  function validate() {
    const p = [];
    for (const c of cast) c.forEach((v, i) => {
      const w = (c[0].name || '(unnamed)') + (c.length > 1 ? ' / ' + (v.label || 'version ' + (i + 1)) : '');
      if (!v.name.trim()) p.push(w + ': name is empty');
      if (v.tags.split(';').some(g => g.trim() && g.indexOf(':') < 1)) p.push(w + ': tags need "category: value" format');
      for (const n of v.flag.split(/\s+/).filter(Boolean)) if (!Object.hasOwn(FLAGS, n)) p.push(w + ': unknown flag ' + n);
      if (v.icon && !/^fa-[a-z0-9-]+$/.test(v.icon)) p.push(w + ': icon should look like fa-name');
      if (v.iconColor && !CSS.supports('color', v.iconColor)) p.push(w + ': icon color not recognized');
      if (v.img && !/^(https:\/\/\S+|[\w./-]+)$/i.test(v.img)) p.push(w + ': image should be an https URL or a path with no spaces');
    });
    return p;
  }
  const save = run(async () => {
    const p = validate();
    if (p.length && !confirm(p.slice(0, 10).join('\n') + (p.length > 10 ? '\n…and ' + (p.length - 10) + ' more' : '') + '\n\nSave anyway?')) return;
    say('Saving…');
    const text = 'window.CAST = ' + JSON.stringify(cast.map(c => c.map(norm)), null, 2) + ';\n';
    const { res, data } = await gh('PUT', { message: 'Update characters via editor', content: b64(text), sha, branch: BRANCH });
    if (!res.ok) return say(res.status === 409 || res.status === 422
      ? 'The file changed on GitHub after you loaded it, so nothing was saved. Press Reload to get the latest (unsaved edits are lost).' : why(res, data), true);
    sha = data.content.sha; dirty = false; $('save').disabled = true; say('Saved. The live site updates within about 10 minutes.');
  });

  function signOut() { tok = ''; try { localStorage.removeItem(KEY); } catch { /* ignore */ } cast = []; cur = null; dirty = false; show(); }
  // Non-secret marker so index.html can show an "Edit" link on devices where you are connected
  const mark = () => {}; // PREVIEW: no marker
  function show() { mark(); $('auth').hidden = !!tok; $('bar').hidden = $('app').hidden = !tok; if (tok) renderAll(); }

  $('connect').addEventListener('click', () => {
    const t = $('token').value.trim(); if (!t) return;
    tok = t; $('token').value = ''; try { localStorage.setItem(KEY, t); } catch { /* keep in memory only */ }
    show(); load();
  });
  $('save').addEventListener('click', save);
  $('reload').addEventListener('click', () => { if (!dirty || confirm('Discard unsaved edits and reload from GitHub?')) load(); });
  $('forget').addEventListener('click', () => { if (!dirty || confirm('You have unsaved edits. Forget this device anyway?')) signOut(); });

  show(); if (tok) load();
})();

/* ===== PREVIEW-ONLY: page switcher ===== */
(() => {
  const $ = id => document.getElementById(id);
  const KEY = 'cast-preview-view';
  function setView(v) {
    $('index-view').hidden = v !== 'index'; $('editor-view').hidden = v === 'index';
    $('auth').hidden = v !== 'signin'; $('bar').hidden = $('app').hidden = v !== 'editor';
    document.querySelectorAll('#switch button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.view === v)));
    try { localStorage.setItem(KEY, v); } catch { /* ignore */ }
  }
  $('switch').addEventListener('click', ev => { const b = ev.target.closest('button'); if (b) setView(b.dataset.view); });
  let v = 'index'; try { v = localStorage.getItem(KEY) || 'index'; } catch { /* ignore */ }
  setView(v);
  setTimeout(() => { const b = document.querySelector('#list button'); if (b) b.click(); }, 100); // open a character in the editor view
})();
