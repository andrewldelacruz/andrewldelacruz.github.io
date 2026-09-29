/* Andrew DeLaCruz — portfolio. No dependencies. Progressive enhancement only:
   every page is fully readable with JS disabled. */
(function () {
  'use strict';

  /* --- 1. Photo placeholders -------------------------------------------------
     Every <img> points at its FINAL filename and carries data-placeholder
     pointing at a generated SVG. If the real photo isn't in the repo yet, the
     error handler swaps in the placeholder. Dropping a correctly-named JPG into
     assets/img/<project>/ is all it takes to go live — no HTML edit.
     See IMAGES-TODO.md for the filename + caption checklist.                  */
  document.querySelectorAll('img[data-placeholder]').forEach(function (img) {
    function fallback() {
      if (img.dataset.usingPlaceholder) return;
      img.dataset.usingPlaceholder = 'true';
      img.src = img.dataset.placeholder;
    }
    img.addEventListener('error', fallback, { once: true });
    // Catch images that already failed before this script ran.
    if (img.complete && img.naturalWidth === 0) fallback();
  });

  /* --- 2. Mobile nav -------------------------------------------------------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.dataset.open === 'true';
      nav.dataset.open = String(!open);
      toggle.setAttribute('aria-expanded', String(!open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.dataset.open = 'false';
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* --- 3. Gallery lightbox -------------------------------------------------- */
  var figures = document.querySelectorAll('.gallery figure img');
  if (!figures.length) return;

  var box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Enlarged image');
  box.innerHTML =
    '<button class="lightbox-close" type="button" aria-label="Close">&times;</button>' +
    '<figure><img alt=""><figcaption></figcaption></figure>';
  document.body.appendChild(box);

  var boxImg = box.querySelector('img');
  var boxCap = box.querySelector('figcaption');
  var closeBtn = box.querySelector('.lightbox-close');
  var lastFocus = null;

  function open(img) {
    var cap = img.closest('figure').querySelector('figcaption');
    boxImg.src = img.currentSrc || img.src;
    boxImg.alt = img.alt;
    boxCap.textContent = cap ? cap.textContent : '';
    box.dataset.open = 'true';
    lastFocus = document.activeElement;
    closeBtn.focus();
  }

  function close() {
    box.dataset.open = 'false';
    boxImg.removeAttribute('src');
    if (lastFocus) lastFocus.focus();
  }

  figures.forEach(function (img) {
    // Keyboard-reachable: each image becomes a real button-like control.
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', 'Enlarge image: ' + (img.alt || 'photo'));
    img.addEventListener('click', function () { open(img); });
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(img); }
    });
  });

  closeBtn.addEventListener('click', close);
  box.addEventListener('click', function (e) { if (e.target === box) close(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && box.dataset.open === 'true') close();
    // Trap focus on the only control in the dialog.
    if (e.key === 'Tab' && box.dataset.open === 'true') { e.preventDefault(); closeBtn.focus(); }
  });
})();
