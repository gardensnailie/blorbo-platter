/* Editor for characters.js: loads from and saves to GitHub. All text is inserted as text, never as HTML. */
(() => {
  'use strict';
  const REPO = 'gardensnailie/blorbo-platter', BRANCH = 'main', FILE = 'characters.js', KEY = 'cast-editor-token';
  const K = ['label','name','subtitle','icon','iconColor','img','gender','age','birthday','height','flag','race','job','tags','desc'];
  const FIELDS = [['label','Label'],['name','Name'],['subtitle','Subtitle'],['icon','Icon Class'],['iconColor','Icon Color'],
    ['img','Image'],['gender','Gender'],['age','Age'],['birthday','Birthday'],['height','Height'],['race','Race / Species'],['job','Occupation']];
  const FLAGS = window.FLAGS || {};
  const HINTS = { // hint text beside a field's label; L and R are the two flag dropdowns
    label: 'changes display name on tabs',
    icon: 'ex. fa-sparkles',
    iconColor: 'css or hex',
    img: 'relative path/url, separate with spaces',
    L: 'primary',
    R: 'secondary (optional)',
  };
  const flagGroups = new Map(); // flag dropdown headings: group name -> [name, flag] pairs
  for (const [n, d] of Object.entries(FLAGS)) {
    const g = d.group || 'Other';
    if (!flagGroups.has(g)) flagGroups.set(g, []);
    flagGroups.get(g).push([n, d]);
  }
  const $ = id => document.getElementById(id);
  const el = (t, c, x) => { const n = document.createElement(t); if (c) n.className = c; if (x) n.textContent = x; return n; };
  const norm = v => Object.fromEntries(K.map(k => [k, v && typeof v[k] === 'string' ? v[k] : '']));
  const by = new Intl.Collator(undefined, { sensitivity: 'base', numeric: true });
  const b64 = s => { let bin = ''; for (const b of new TextEncoder().encode(s)) bin += String.fromCharCode(b); return btoa(bin); };
  const unb64 = s => new TextDecoder().decode(Uint8Array.from(atob(s.replace(/\s/g, '')), c => c.charCodeAt(0)));

  let tok = ''; try { tok = localStorage.getItem(KEY) || ''; } catch { /* storage unavailable */ }
  let cast = [], sha = '', cur = null, vi = 0, dirty = false;

  const say = (m, bad) => { const s = $('status'); s.textContent = m; s.className = bad ? 'bad' : ''; };
  const run = fn => async (...a) => { try { await fn(...a); } catch (e) { say('Could not reach GitHub: ' + e.message, true); } };

  async function gh(method, body) {
    const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE}` + (method === 'GET' ? '?ref=' + BRANCH : ''), {
      method, cache: 'no-store', body: body && JSON.stringify(body),
      headers: { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', Authorization: 'Bearer ' + tok, ...(body ? { 'Content-Type': 'application/json' } : {}) } });
    let data = null; try { data = await res.json(); } catch { /* no body */ }
    return { res, data };
  }
  const why = (res, data) => `GitHub said ${res.status}: ${(data && data.message) || res.statusText}` +
    ({ 401: ' (token wrong or expired)', 403: ' (token needs Contents: Read and write)', 404: ' (check repo name and token access)' }[res.status] || '');

  /* ---------- tags ---------- */
  /* ===== TAG LINKS: adding the left tag also adds the tags on its right (chains work).
   Lowercase "category:value". Only chip clicks trigger this, and removing a tag never removes the others. ===== */
const IMPLIES = {
'setting:five-keys':['genre:fantasy-(high)', 'genre:fantasy-(low)', 'origin:original'],
'setting:godsblood':['fantasy-(high)', 'origin:original'],
'setting:in-1992':['genre: modern-life', 'origin:original'],
'setting:neo-arcadia':['genre: cyberpunk','genre: sci-fi', 'origin:original'],
'setting:the-parish':['genre: fantasy-(low)','genre: historical', 'origin:original'],
'setting:therapy-au':['genre: modern-life','origin:original'],
'setting:challengers-deep':['genre:sci-fi', 'origin:original'],

'series:elder-scrolls':['genre:fantasy-(high)', 'genre:fantasy-(low)', 'origin:fandom'],
'series:fallout':['genre: post-apocalypse', 'origin:fandom'],
'series:fire-emblem':['genre: fantasy-(high)', 'origin:fandom'],
'series:honkai:-star-rail':['genre:sci-fi', 'origin:fandom'],
'series:megaman':['genre: sci-fi', 'origin:fandom'],
'series:monster-hunter':['genre:fantasy-(high)', 'genre:fantasy-(low)', 'origin:fandom'],

'genre:cyberpunk':['genre:sci-fi'],
'genre: xianxia/jidaigeki':['genre:fantasy-(low)'],

'species:vampire':['species:undead','species:immortal'],
'species:mechanical':['gender:none'],
'species:slime':['gender:none'],

'age:young-adult':['age:(all)-adult'],
'age:middle-aged':['age:(all)-adult'],
'age:elderly':['age:(all)-adult'],
'age:ancient':['age:(all)-adult'],
'age:child':['age:(all)-minor'],
'age:teenager':['age:(all)-minor'],

'misc:sankta':['setting:five-keys'],
'misc:shade-touched':['setting:five-keys'],
'misc:shade-touched':['misc:impairment-(terminal)'],

'misc:impairment-(terminal)':['misc:misc"dude-what-the-fuck']
};
  
  const parseTags = s => s.split(';').map(g => { const i = g.indexOf(':'); return i < 1 ? null :
    [g.slice(0, i).trim().toLowerCase().replace(/\s+/g, '-'), g.slice(i + 1).trim().split(/\s+/).filter(Boolean)]; }).filter(Boolean);
  // Click a tag to add it to this version; click it again to remove it
function toggleTag(v, cat, val) {
  const gs = parseTags(v.tags), lv = val.toLowerCase();
  const has = (g, x) => g[1].some(y => y.toLowerCase() === x);
  const add = (c, x) => {
    const g = gs.find(y => y[0] === c);
    if (g && has(g, x)) return;                       // already there (also stops loops)
    if (g) g[1].push(x); else gs.push([c, [x]]);
    for (const k of IMPLIES[c + ':' + x] || []) add(...k.split(':'));
  };
  const g = gs.find(x => x[0] === cat);
  if (g && has(g, lv)) g[1] = g[1].filter(x => x.toLowerCase() !== lv);
  else add(cat, lv);
  v.tags = gs.filter(([, vs]) => vs.length).map(([c, vs]) => c + ': ' + vs.join(' ')).join('; ');
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

  // Tag buttons: one block per category (small header, then its chips); highlighted (.on) when this version has the tag
  // Hints shown next to each tag category; edit freely. Categories not listed get no hint.
const TAG_HINTS = { 
  genre: 'LowF: Can be on Earth, includes UrbF | HighF: Has own world, different universal laws', 
  species: 'Hybrids are monster girls, Beastmen are furries',
  age: 'Young Adult: 20 - 39 | Middle Aged: 40 - 65 | Elderly: 65+ | Ancient: 100+',
  misc:'Gender tag for people who pass as the other gender | Somatic is for any physical condition'};
  
  function renderChips() {
    const box = document.querySelector('#form .chips'); if (!box || !cur) return;
    const have = new Set(parseTags(cur[vi].tags).flatMap(([c, vs]) => vs.map(x => c + ':' + x.toLowerCase())));
    const frag = document.createDocumentFragment();
    for (const [cat, vals] of allTags()) {
      const row = el('div', 'chip-row'), name = el('span', 'chip-cat', cat);
      if (TAG_HINTS[cat]) name.append(el('em', 'chip-hint', ' ' + TAG_HINTS[cat]));
      row.append(name);
      for (const x of [...vals].sort()) {
        const on = have.has(cat + ':' + x), b = el('button', on ? 'on' : '', x);
        b.type = 'button'; b.dataset.act = 'tag'; b.dataset.c = cat; b.dataset.v = x; b.setAttribute('aria-pressed', String(on));
        row.append(b);
      }
      frag.append(row);
    }
    box.replaceChildren(frag);
  }

  function renderForm() {
    const f = $('form'); f.replaceChildren(); preview();
    if (!cur) return f.append(el('div', 'vbar'), el('p', 'hint', 'Pick a character, or add a new one.'));
    const v = cur[vi], bar = el('div', 'vbar');
    cur.forEach((x, i) => { const b = el('button', i === vi ? 'on' : '', x.label || x.name || 'Version ' + (i + 1)); b.type = 'button'; b.dataset.act = 'ver'; b.dataset.i = i; bar.append(b); });
    bar.append(el('div', 'flex-break')); // version buttons on the first line, actions on the next
    for (const [a, t] of [['addv', '+ Alt'], ['delv', '- Alt'], ['dupv', 'Duplicate'], ['delc', 'Delete Character']]) { const b = el('button', '', t); b.type = 'button'; b.dataset.act = a; bar.append(b); }
    f.append(bar);
    for (const [k, label] of FIELDS) {
      const l = el('label', '', label), i = el('input');
      if (HINTS[k]) l.append(el('p', 'hint', HINTS[k]));
      i.dataset.k = k; i.value = v[k]; l.append(i); f.append(l);
    }
    const [L = '', R = ''] = v.flag.split(/\s+/);
    for (const [pos, val, label] of [['L', L, 'Flags'], ['R', R, '\u2800']]) { // invisible label keeps the two dropdowns level
      const l = el('label', '', label), s = el('select'); s.dataset.flag = pos;
      l.append(el('p', 'hint', HINTS[pos]));
      s.append(new Option('(none)', ''));
      for (const [group, flags] of flagGroups) {
        const og = document.createElement('optgroup'); og.label = group;
        for (const [n, d] of flags) og.append(new Option(d.label || n, n));
        s.append(og);
      }
      if (val && !Object.hasOwn(FLAGS, val)) s.append(new Option('(missing from flags.js: ' + val + ')', val)); // never show a blank
      s.value = val; l.append(s); f.append(l);
    }
    const dl = el('label', '', 'Description'), dt = el('textarea'); dt.rows = 3; dt.dataset.k = 'desc'; dt.value = v.desc; dl.append(dt); f.append(dl);
    const tl = el('label', '', 'Tags'), ti = el('input');
    tl.append(el('p', 'hint', 'ex. category: value-one value; category: value'));
    ti.dataset.k = 'tags'; ti.value = v.tags; tl.append(ti); f.append(tl, el('div', 'chips'));
    renderChips();
  }

  const renderAll = () => { renderList(); renderForm(); };

  /* ---------- events ---------- */
  $('form').addEventListener('input', e => {
    const k = e.target.dataset.k; if (!k) return;
    cur[vi][k] = e.target.value; touch();
    if (k === 'tags') renderChips(); // keep the highlighted chips in step with typing
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
      if (v.img && !v.img.trim().split(/\s+/).every(s => /^(https:\/\/\S+|[\w./-]+)$/i.test(s))) p.push(w + ': each image should be an https URL or a path with no spaces');
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
  const mark = () => { try { if (tok) localStorage.setItem('cast-editor-owner', '1'); else localStorage.removeItem('cast-editor-owner'); } catch { /* ignore */ } };
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
