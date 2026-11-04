/* Editor for characters.js: loads from and saves to GitHub. All text is inserted as text, never as HTML. */
(() => {
  'use strict';
  const REPO = 'gardensnailie/blorbo-platter', BRANCH = 'main', FILE = 'characters.js', KEY = 'cast-editor-token';
  const K = ['label','name','subtitle','icon','iconColor','img','gender','age','birthday','height','flag','race','job','tags','desc'];
  const FIELDS = [['label','Tab / hover name'],['name','Name'],['subtitle','Subtitle'],['icon','Icon (like hgi-sparkle)'],['iconColor','Icon color (like #d70170)'],
    ['img','Image (path like images/eight.png, or https URL)'],['gender','Gender'],['age','Age'],['birthday','Birthday'],['height','Height'],['race','Race'],['job','Occupation']];
  const FLAGS = window.FLAGS || {};
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
  const parseTags = s => s.split(';').map(g => { const i = g.indexOf(':'); return i < 1 ? null :
    [g.slice(0, i).trim().toLowerCase().replace(/\s+/g, '-'), g.slice(i + 1).trim().split(/\s+/).filter(Boolean)]; }).filter(Boolean);
  function addTag(v, cat, val) {
    const gs = parseTags(v.tags), g = gs.find(x => x[0] === cat);
    if (!g) gs.push([cat, [val]]); else if (!g[1].includes(val)) g[1].push(val);
    v.tags = gs.map(([c, vs]) => c + ': ' + vs.join(' ')).join('; ');
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

  function renderForm() {
    const f = $('form'); f.replaceChildren(); preview();
    if (!cur) return f.append(el('p', 'hint', 'Pick a character on the left, or add a new one.'));
    const v = cur[vi], bar = el('div', 'vbar');
    cur.forEach((x, i) => { const b = el('button', i === vi ? 'on' : '', x.label || x.name || 'Version ' + (i + 1)); b.type = 'button'; b.dataset.act = 'ver'; b.dataset.i = i; bar.append(b); });
    for (const [a, t] of [['addv', '+ Version'], ['dupv', 'Duplicate version'], ['delv', 'Remove version'], ['delc', 'Delete character']]) { const b = el('button', '', t); b.type = 'button'; b.dataset.act = a; bar.append(b); }
    f.append(bar);
    for (const [k, label] of FIELDS) { const l = el('label', '', label), i = el('input'); i.dataset.k = k; i.value = v[k]; l.append(i); f.append(l); }
    const [L = '', R = ''] = v.flag.split(/\s+/);
    for (const [pos, val, label] of [['L', L, 'Flag (left, or whole flag)'], ['R', R, 'Flag, right half (optional)']]) {
      const l = el('label', '', label), s = el('select'); s.dataset.flag = pos;
      s.append(new Option('(none)', ''));
      for (const [n, d] of Object.entries(FLAGS)) s.append(new Option(d.label || n, n));
      s.value = val; l.append(s); f.append(l);
    }
    const tl = el('label', '', 'Tags (category: value value; category: value)'), ti = el('input'); ti.dataset.k = 'tags'; ti.value = v.tags; tl.append(ti); f.append(tl);
    const chips = el('div', 'chips');
    for (const [cat, vals] of allTags()) for (const x of [...vals].sort()) { const b = el('button', '', cat + ': ' + x); b.type = 'button'; b.dataset.act = 'tag'; b.dataset.c = cat; b.dataset.v = x; chips.append(b); }
    f.append(chips, el('p', 'hint', 'Click a tag above to add it. Multi-word values use hyphens (space-station).'));
    const dl = el('label', '', 'Description'), dt = el('textarea'); dt.rows = 3; dt.dataset.k = 'desc'; dt.value = v.desc; dl.append(dt); f.append(dl);
  }
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
    else if (a === 'tag') { addTag(cur[vi], b.dataset.c, b.dataset.v); dirty = true; }
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
      if (v.icon && !/^hgi-[a-z0-9-]+$/.test(v.icon)) p.push(w + ': icon should look like hgi-name');
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
  function show() { $('auth').hidden = !!tok; $('bar').hidden = $('app').hidden = !tok; if (tok) renderAll(); }

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
