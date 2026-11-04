/* card.js: builds every character card from window.CAST (characters.js) and fills #grid.
   Characters are shown sorted by the first version's name.
   To change the card layout, edit FIELDS below plus style.css. The editor reuses buildCard for its preview.
   Everything is inserted as text (never as HTML). */
(() => {
  'use strict';

  const IMG = 150;                 // image size in px (keep equal to --img-size in style.css)
  const FLAGS = window.FLAGS || {};

  /* ===== CARD TEMPLATE: one entry per info box, in display order =====
     row: 'top' or 'bottom' list. cls: class on the <li> (the "gender" class feeds the Gender filter).
     Blank values still draw an empty box so the columns stay aligned. */
  const FIELDS = [
    { key: 'gender',   title: 'Gender',     icon: 'hgi-venus',          row: 'top', cls: 'gender' },
    { key: 'age',      title: 'Age',        icon: 'hgi-calendar-clock', row: 'top' },
    { key: 'birthday', title: 'Birthday',   icon: 'hgi-birthday-cake',  row: 'top' },
    { key: 'height',   title: 'Height',     icon: 'hgi-ruler',          row: 'top', iconCls: 'tilt' },
    { key: 'flag',     title: 'Flag',                                    row: 'top', flag: true },
    { key: 'race',     title: 'Race',       icon: 'hgi-user-round',     row: 'bottom' },
    { key: 'job',      title: 'Occupation', icon: 'hgi-work',           row: 'bottom' },
  ];

  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  };
  const icon = (name, extra) => {
    const i = el('i', 'hgi hgi-stroke hgi-rounded ' + name + (extra ? ' ' + extra : ''));
    i.setAttribute('aria-hidden', 'true');
    return i;
  };

  // Flag: one name, or "left right" for a half-and-half flag (second name = right half)
  function buildFlag(names) {
    const defs = String(names || '').trim().split(/\s+/).filter(Boolean).slice(0, 2)
      .map(n => (Object.hasOwn(FLAGS, n) ? FLAGS[n] : null));
    if (!defs.length) return null;
    if (defs.some(d => !d || !/^linear-gradient\(/i.test(d.gradient || ''))) { console.warn('[cast] Unknown flag:', names); return null; }
    const f = el('span', 'flag');
    f.style.backgroundImage = defs[0].gradient;
    if (defs[1]) { const right = el('span'); right.style.backgroundImage = defs[1].gradient; f.append(right); }
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
    const card = el('article', 'card');
    card.dataset.tags = v.tags || '';
    if (v.label) card.dataset.label = v.label;   // hover/screen-reader name of the version button
    if (v.tab) card.dataset.tab = v.tab;         // button content: short text or an hgi- icon name
    if (v.img) {
      const img = el('img');
      img.alt = ''; img.width = IMG; img.height = IMG; img.loading = 'lazy'; img.decoding = 'async';
      img.src = v.img;
      card.append(img);
    }
    const star = el('b'); star.append(icon('hgi-sparkle'));
    const h3 = el('h3', '', v.name);
    h3.append(el('i', '', v.id), star);
    card.append(h3, buildRow(v, 'top', 'info info-top'), buildRow(v, 'bottom', 'info'), el('p', '', v.desc));
    return card;
  }

  function buildCharacter(versions) {
    const wrap = el('div', 'character');
    for (const v of versions) wrap.append(buildCard(v));
    return wrap;
  }

  window.CastCard = { buildCard, buildCharacter };

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
