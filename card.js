/* card.js: builds every character card from window.CAST (characters.js) and fills #grid.
   Characters are shown sorted by the first version's name.
   To change the card layout, edit FIELDS below plus style.css. The editor reuses buildCard for its preview.
   Everything is inserted as text (never as HTML). */
(() => {
  'use strict';

  const ICON_STYLE = 'fa-regular';   // Font Awesome style used for every icon (fa-solid, fa-light, ...)
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

  // A flag entry is one gradient, or a stack of layers: { label, layers: [ { gradient, clip? }, ... ] }.
  // The first layer fills the flag; later layers are drawn on top, optionally cut to a shape with clip.
  const RIGHT_HALF = 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)';
  const GRADIENT = /^linear-gradient\(/i, SHAPE = /^(polygon|inset|circle|ellipse)\(/i;
  const IMAGE = /^(https:\/\/[^\s"'()\\]+|[\w./-]+)$/i;   // https URL or a plain relative path
  // Layer types: { gradient } | { image, size? } | { text, color?, size? }, each with optional clip. The first layer must be a gradient.
  const layerOk = (l, i) => {
    if (l.clip && !SHAPE.test(l.clip)) return false;
    if (l.gradient) return GRADIENT.test(l.gradient);
    if (i === 0) return false;
    if (l.image) return IMAGE.test(l.image) && (!l.size || CSS.supports('background-size', l.size));
    if (l.text) return String(l.text).length <= 8 && (!l.color || CSS.supports('color', l.color)) && (!l.size || CSS.supports('font-size', l.size));
    return false;
  };
  const layersOf = d => (d ? (Array.isArray(d.layers) ? d.layers : [d]) : []);

  // A character's flag is one name, or "left right": the second flag is layered over the right half of the first
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
    const srcs = (v.img || '').split(/\s+/).filter(Boolean);   // one or more images, space-separated
    if (srcs.length) {
      const pics = el('div', srcs.length > 1 ? 'pics multi' : 'pics');
      srcs.forEach((s, i) => {
        const img = el('img', i ? '' : 'on');
        img.alt = ''; img.loading = 'lazy'; img.decoding = 'async'; img.src = s;
        pics.append(img);
      });
      card.append(pics);
    }
    const star = el('b'); star.append(icon(iconName || 'fa-sparkles'));  // sparkle is the default icon
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
  // One timer for every card. shortcut: no pause on hover, and reduced-motion users see only the first image; upgrade if either matters.
  const SLIDE_MS = 4000;
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) setInterval(() => {
    for (const p of document.querySelectorAll('.pics.multi')) {
      if (p.closest('[hidden]')) continue;                 // skip filtered-out or inactive-tab cards
      const on = p.querySelector('.on'); on.classList.remove('on');
      (on.nextElementSibling || p.firstElementChild).classList.add('on');
    }
  }, SLIDE_MS);

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
