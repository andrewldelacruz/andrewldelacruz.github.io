/* ============================================================================
   Edit mode — edit any text on the page directly in the browser.

   How it works, and the one thing to understand:

   GitHub Pages serves static files. A browser cannot write back to the repo,
   so edits are stored in THIS BROWSER's localStorage. They survive refreshes
   and they're visible to you — but the live site other people see does not
   change until you click "Download" and commit the files you get.

   Turn it on:   add ?edit to the URL, or press Cmd/Ctrl + Shift + E
   Turn it off:  press Escape, or click Done in the toolbar

   Edits are keyed by a structural path to each element, so they survive
   rewording and reformatting. If an element is moved or deleted in the HTML,
   its stored edit is simply ignored.
   ========================================================================= */
(function () {
  'use strict';

  var SEL = 'h1, h2, h3, .lede, .tagline, .eyebrow, .metric, .hook, ' +
            'p, li, figcaption, dt, dd, th, td, .chips li, strong';
  var SKIP = '.site-header, .editbar, .editbadge, .skip, .lightbox, ' +
             '.nav, .footer-links, .btn, .backlink, .pager';

  var page = location.pathname.replace(/index\.html$/, '') || '/';
  var KEY = 'edits::' + page;
  var LIST = 'edits::pages';

  /* --- storage (wrapped: private windows and blocked site data throw) ----- */
  function load(k, fallback) {
    try { return JSON.parse(localStorage.getItem(k)) || fallback; }
    catch (e) { return fallback; }
  }
  function save(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); return true; }
    catch (e) { return false; }
  }

  var edits = load(KEY, {});

  /* --- a stable structural path to an element ---------------------------- */
  function pathOf(el) {
    var parts = [];
    while (el && el !== document.body && el.parentElement) {
      var parent = el.parentElement;
      var tag = el.tagName.toLowerCase();
      var same = [];
      for (var i = 0; i < parent.children.length; i++) {
        if (parent.children[i].tagName === el.tagName) same.push(parent.children[i]);
      }
      parts.unshift(same.length > 1 ? tag + ':nth-of-type(' + (same.indexOf(el) + 1) + ')' : tag);
      el = parent;
    }
    return 'body > ' + parts.join(' > ');
  }

  function targets(root) {
    var out = [];
    var all = (root || document).querySelectorAll(SEL);
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      if (el.closest(SKIP)) continue;
      // Skip an element whose only content is another editable element —
      // editing the outer one would swallow the inner.
      if (el.children.length === 1 && el.children[0].matches(SEL) &&
          el.textContent.trim() === el.children[0].textContent.trim()) continue;
      out.push(el);
    }
    return out;
  }

  /* --- apply saved edits on every page load ------------------------------ */
  function applyEdits() {
    var n = 0;
    Object.keys(edits).forEach(function (sel) {
      var el;
      try { el = document.querySelector(sel); } catch (e) { return; }
      if (el) { el.innerHTML = edits[sel]; n++; }
    });
    return n;
  }

  var applied = applyEdits();

  /* --- badge: makes "local" vs "published" impossible to miss ------------- */
  var badge = null;
  function refreshBadge() {
    var pages = load(LIST, []);
    var total = 0;
    pages.forEach(function (p) { total += Object.keys(load('edits::' + p, {})).length; });
    if (!total) { if (badge) { badge.remove(); badge = null; } return; }
    if (!badge) {
      injectStyles();
      badge = document.createElement('button');
      badge.className = 'editbadge';
      badge.type = 'button';
      badge.title = 'These edits exist only in this browser. Click to open edit mode and download them.';
      badge.addEventListener('click', function () { on(); });
      document.body.appendChild(badge);
    }
    badge.textContent = total + (total === 1 ? ' local edit' : ' local edits') + ' — not published';
  }

  /* --- styles -------------------------------------------------------------
     Injected rather than kept in style.css on purpose: a stale cached
     stylesheet would otherwise leave the editor with no outlines and an
     unstyled toolbar far down the page, making it look like nothing is
     editable when it actually is. */
  function injectStyles() {
    if (document.getElementById('edit-mode-styles')) return;
    var st = document.createElement('style');
    st.id = 'edit-mode-styles';
    st.textContent = `.editbar {
  position: fixed; left: 0; right: 0; bottom: 0; z-index: 300;
  display: flex; flex-wrap: wrap; align-items: center; gap: .6rem;
  padding: .7rem 1rem;
  background: var(--bg-raised); border-top: 1px solid var(--border-str);
  box-shadow: 0 -4px 24px rgba(0,0,0,.14);
  font: 500 .86rem var(--font); color: var(--text);
}
.editbar strong { font-weight: 650; }
.editbar-spacer { flex: 1 1 auto; }
.editbar-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--accent); flex: none;
}
.editbar [data-role="status"] { color: var(--text-mute); font-size: .82rem; }
.editbar [data-role="status"][data-state="saved"] { color: var(--accent); }
.editbar [data-role="status"][data-state="error"] { color: #d23f0f; font-weight: 600; }
.editbar [data-role="note"] {
  flex-basis: 100%; margin: .2rem 0 0; max-width: none;
  font-size: .8rem; color: var(--text-soft); line-height: 1.5;
}
.editbar button {
  font: 550 .84rem var(--font); cursor: pointer;
  padding: .42rem .8rem; border-radius: 7px;
  border: 1px solid var(--border-str); background: var(--bg); color: var(--text);
}
.editbar button:hover { background: var(--bg-sunken); }
.editbar button[data-act="download"] {
  background: var(--accent); border-color: var(--accent); color: #fff;
}
.editbar button[data-act="discard"] { color: #d23f0f; }

.editbadge {
  position: fixed; right: 1rem; bottom: 1rem; z-index: 290;
  font: 600 .76rem var(--font); cursor: pointer;
  padding: .5rem .8rem; border-radius: 100px;
  background: var(--accent-bg); color: var(--accent);
  border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
  box-shadow: var(--shadow);
}
.editbadge:hover { background: color-mix(in srgb, var(--accent) 16%, transparent); }
body.is-editing .editbadge { display: none; }

/* Leave room for the toolbar so it never covers the last line of the page. */
body.is-editing { padding-bottom: 4.5rem; }

body.is-editing [contenteditable] {
  outline: 1px dashed color-mix(in srgb, var(--accent) 40%, transparent);
  outline-offset: 3px; border-radius: 2px;
}
body.is-editing [contenteditable]:hover {
  outline-style: solid;
  background: color-mix(in srgb, var(--accent) 6%, transparent);
}
body.is-editing [contenteditable]:focus {
  outline: 2px solid var(--accent); outline-offset: 3px;
  background: color-mix(in srgb, var(--accent) 8%, transparent);
}

@media print { .editbar, .editbadge { display: none !important; } }`;
    document.head.appendChild(st);
  }

  /* --- edit mode --------------------------------------------------------- */
  var editing = false;
  var bar = null;

  function markDirty() {
    var d = bar && bar.querySelector('[data-role=status]');
    if (d) { d.textContent = 'Saved in this browser'; d.dataset.state = 'saved'; }
    refreshBadge();
  }

  function rememberPage() {
    var pages = load(LIST, []);
    if (pages.indexOf(page) === -1) { pages.push(page); save(LIST, pages); }
  }

  function on() {
    if (editing) return;
    editing = true;
    injectStyles();
    document.body.classList.add('is-editing');

    targets().forEach(function (el) {
      el.contentEditable = 'true';
      el.spellcheck = true;
      el.addEventListener('input', function () {
        edits[pathOf(el)] = el.innerHTML;
        rememberPage();
        if (save(KEY, edits)) markDirty();
        else {
          var d = bar.querySelector('[data-role=status]');
          d.textContent = 'Could not save — browser storage is blocked';
          d.dataset.state = 'error';
        }
      });
      // Keep pasted text plain, so pasting from Word or a browser doesn't
      // drag foreign fonts and colors into the page.
      el.addEventListener('paste', function (e) {
        e.preventDefault();
        var text = (e.clipboardData || window.clipboardData).getData('text/plain');
        document.execCommand('insertText', false, text);
      });
    });

    buildBar();
    sessionStorage.setItem('editing', '1');
  }

  function off() {
    if (!editing) return;
    editing = false;
    document.body.classList.remove('is-editing');
    targets().forEach(function (el) { el.removeAttribute('contenteditable'); });
    if (bar) { bar.remove(); bar = null; }
    sessionStorage.removeItem('editing');
    refreshBadge();
  }

  /* --- export: rebuild the real HTML file with edits applied -------------- */
  function exportPage(path, cb) {
    var url = path === '/' ? '/index.html' : path;
    fetch(url, { cache: 'no-store' }).then(function (r) {
      if (!r.ok) throw new Error(r.status + ' fetching ' + url);
      return r.text();
    }).then(function (html) {
      var pageEdits = load('edits::' + path, {});
      var keys = Object.keys(pageEdits);
      if (!keys.length) { cb(null, null); return; }

      var doc = new DOMParser().parseFromString(html, 'text/html');
      var hits = 0, misses = [];
      keys.forEach(function (sel) {
        var el;
        try { el = doc.querySelector(sel); } catch (e) { el = null; }
        if (el) { el.innerHTML = pageEdits[sel]; hits++; }
        else { misses.push(sel); }
      });

      // Serialize back to a full document. DOMParser drops the doctype from
      // documentElement.outerHTML, so put it back.
      var out = '<!doctype html>\n' + doc.documentElement.outerHTML + '\n';
      var name = url.replace(/^\//, '').replace(/\//g, '-') || 'index.html';
      download(out, name);
      cb(null, { file: name, applied: hits, missed: misses });
    }).catch(function (err) { cb(err); });
  }

  function download(text, filename) {
    var blob = new Blob([text], { type: 'text/html' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }

  function exportAll() {
    var pages = load(LIST, []).filter(function (p) {
      return Object.keys(load('edits::' + p, {})).length;
    });
    if (!pages.length) { note('Nothing edited yet.'); return; }

    var done = 0, results = [];
    pages.forEach(function (p, i) {
      // Stagger: browsers throttle or block rapid-fire downloads.
      setTimeout(function () {
        exportPage(p, function (err, res) {
          done++;
          if (err) results.push('✗ ' + p + ' — ' + err.message);
          else if (res) {
            results.push('✓ ' + res.file + ' (' + res.applied + ' edits' +
              (res.missed.length ? ', ' + res.missed.length + ' skipped' : '') + ')');
          }
          if (done === pages.length) {
            note(results.join('  ·  ') + '  →  put these in the repo, replacing the originals.');
          }
        });
      }, i * 700);
    });
  }

  function note(msg) {
    var n = bar && bar.querySelector('[data-role=note]');
    if (n) { n.textContent = msg; n.hidden = false; }
  }

  function discard() {
    if (!confirm('Discard every local edit on every page? This cannot be undone.')) return;
    load(LIST, []).forEach(function (p) {
      try { localStorage.removeItem('edits::' + p); } catch (e) {}
    });
    try { localStorage.removeItem(LIST); } catch (e) {}
    edits = {};
    location.reload();
  }

  /* --- toolbar ----------------------------------------------------------- */
  function buildBar() {
    bar = document.createElement('div');
    bar.className = 'editbar';
    bar.innerHTML =
      '<span class="editbar-dot"></span>' +
      '<strong>Edit mode</strong>' +
      '<span data-role="status" data-state="idle">Click any text and type</span>' +
      '<span class="editbar-spacer"></span>' +
      '<button type="button" data-act="download">Download edited pages</button>' +
      '<button type="button" data-act="discard">Discard all</button>' +
      '<button type="button" data-act="done">Done</button>' +
      '<p data-role="note" hidden></p>';
    document.body.appendChild(bar);

    bar.addEventListener('click', function (e) {
      var act = e.target.dataset && e.target.dataset.act;
      if (act === 'download') exportAll();
      if (act === 'discard') discard();
      if (act === 'done') off();
    });
  }

  /* --- activation -------------------------------------------------------- */
  function wantsEdit() {
    return /[?&]edit\b/.test(location.search) || sessionStorage.getItem('editing') === '1';
  }

  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'e') {
      e.preventDefault();
      editing ? off() : on();
    }
    if (e.key === 'Escape' && editing) off();
  });

  refreshBadge();
  if (wantsEdit()) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', on);
    else on();
  }

  // Exposed for the console, if you ever want it: __edit.on() / .off() / .exportAll()
  window.__edit = { on: on, off: off, exportAll: exportAll, discard: discard, applied: applied };
})();
