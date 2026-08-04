/* ── Gallery ────────────────────────────────────────────── */
(function gallery() {
  const grid     = document.querySelector('.gallery-grid');
  const lightbox = document.querySelector('.lightbox');
  if (!grid || !lightbox) return;

  const lbImg     = lightbox.querySelector('.lightbox-img');
  const lbCaption = lightbox.querySelector('.lightbox-caption');
  const lbClose   = lightbox.querySelector('.lightbox-close');

  function openLightbox(src, caption) {
    if (!src || src === '#') return;
    lbImg.src = src;
    if (lbCaption) lbCaption.textContent = caption || '';
    lightbox.showModal();
  }
  function closeLightbox() { lightbox.close(); }

  grid.addEventListener('click', e => {
    const item = e.target.closest('.gallery-item[data-src]');
    if (item) openLightbox(item.dataset.src, item.dataset.caption);
  });
  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  /* Escape is handled natively by <dialog> */

  /* Filter buttons */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      document.querySelectorAll('.gallery-item').forEach(item => {
        const match = cat === 'all' || item.dataset.category === cat;
        item.style.display = match ? '' : 'none';
      });
    });
  });
})();

/* ── Family tree modal + cross-tree reveal ─────────────────── */
(function familyTree() {
  const modal    = document.getElementById('personModal');
  const closeBtn = document.getElementById('personModalClose');
  const linkBox  = document.getElementById('modalLink');
  const linkBtn  = document.getElementById('modalLinkBtn');
  if (!modal) return;

  function flashCard(el) {
    if (!el) return;
    /* If the element is inside a hidden container, scroll to the tree wrap instead */
    if (el.closest('[hidden]')) {
      const wrap = document.querySelector('.ftree-wrap');
      if (wrap) wrap.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    el.classList.remove('ftperson--flash');
    void el.offsetWidth;
    el.classList.add('ftperson--flash');
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.addEventListener('animationend', () => el.classList.remove('ftperson--flash'), { once: true });
  }

  function flashInPlace(el) {
    el.classList.remove('ftperson--flash');
    void el.offsetWidth;
    el.classList.add('ftperson--flash');
    el.addEventListener('animationend', () => el.classList.remove('ftperson--flash'), { once: true });
  }

  /* Expand the Sharma parents inline — swaps core couple for parents+siblings tree */
  function expandSharmaBranch(targetId) {
    document.getElementById('sharma-branch-header').hidden = false;
    document.getElementById('sharma-parents-couple').hidden = false;
    document.getElementById('sharma-siblings-ul').hidden    = false;
    document.getElementById('core-couple').hidden           = true;
    document.getElementById('core-children-ul').hidden      = true;

    const target = document.getElementById(targetId);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => flashInPlace(target), 400);
      }, 50);
    }
  }

  /* Collapse back to core couple */
  function collapseSharmaBranch() {
    document.getElementById('sharma-branch-header').hidden = true;
    document.getElementById('sharma-parents-couple').hidden = true;
    document.getElementById('sharma-siblings-ul').hidden    = true;
    document.getElementById('core-couple').hidden           = false;
    document.getElementById('core-children-ul').hidden      = false;

    const basanta = document.getElementById('basanta-sharma');
    if (basanta) basanta.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /* Reveal Poudyal section (separate section below with CSS transition) */
  function revealSection(sectionId, targetId) {
    const section = document.getElementById(sectionId);
    const target  = document.getElementById(targetId);
    if (!section || !target) return;

    function scrollAndFlash() {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => flashInPlace(target), 500);
    }

    if (!section.classList.contains('is-open')) {
      section.classList.add('is-open');
      section.removeAttribute('aria-hidden');
      setTimeout(scrollAndFlash, 400);
    } else {
      scrollAndFlash();
    }
  }

  document.querySelectorAll('.ftperson').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('modalAvatar').innerHTML =
        btn.querySelector('.ftavatar').innerHTML;
      document.getElementById('modalName').textContent =
        btn.querySelector('.ftname').textContent;
      document.getElementById('modalRelation').textContent =
        btn.querySelector('.ftrelation').textContent;
      document.getElementById('modalNote').textContent =
        btn.dataset.note || '';

      const linkedId    = btn.dataset.linkedId;
      const linkedLabel = btn.dataset.linkedLabel;
      const revealsId   = btn.dataset.reveals;
      const revealsDir  = btn.dataset.revealsDirection;
      const linkText    = btn.dataset.linkText;

      if (linkedId && linkedLabel && linkBox && linkBtn) {
        if (revealsId === 'sharma-inline') {
          const arrow  = revealsDir === 'up' ? '↑' : '↓';
          const prefix = linkText || `Meet ${linkedLabel}`;
          linkBtn.textContent = `${prefix} — ${linkedLabel} ${arrow}`;
          linkBtn.onclick = () => { modal.close(); expandSharmaBranch(linkedId); };
        } else if (revealsId) {
          const arrow  = revealsDir === 'up' ? '↑' : '↓';
          const prefix = linkText || `Meet ${linkedLabel}`;
          linkBtn.textContent = `${prefix} — ${linkedLabel} ${arrow}`;
          linkBtn.onclick = () => { modal.close(); revealSection(revealsId, linkedId); };
        } else {
          linkBtn.textContent = `Also in: ${linkedLabel} ↑`;
          linkBtn.onclick = () => { modal.close(); flashCard(document.getElementById(linkedId)); };
        }
        linkBox.hidden = false;
      } else if (linkBox) {
        linkBox.hidden = true;
      }

      modal.showModal();
    });
  });

  closeBtn.addEventListener('click', () => modal.close());
  modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });

  /* Collapse button on the inline Sharma branch */
  const sharmaCloseBtn = document.getElementById('sharmaClose');
  if (sharmaCloseBtn) {
    sharmaCloseBtn.addEventListener('click', collapseSharmaBranch);
  }

  /* Collapse button on the Poudyal section */
  const collapseBtn = document.getElementById('poudyalClose');
  if (collapseBtn) {
    collapseBtn.addEventListener('click', () => {
      const section = document.getElementById('poudyal-section');
      if (section) {
        section.classList.remove('is-open');
        section.setAttribute('aria-hidden', 'true');
        /* Scroll to Anisha in the core couple; if core is hidden, scroll to the tree wrap */
        const anisha = document.getElementById('anisha-sharma');
        if (anisha && !anisha.closest('[hidden]')) {
          anisha.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          document.querySelector('.ftree-wrap').scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  }
})();

/* ── Article filter ─────────────────────────────────────── */
(function articleFilter() {
  const list = document.querySelector('.article-list');
  if (!list) return;

  let activeType = 'all';
  let activeLang = 'all';

  function applyFilters() {
    document.querySelectorAll('.article-item').forEach(item => {
      const typeMatch = activeType === 'all' || item.dataset.type === activeType;
      const langMatch = activeLang === 'all' || item.dataset.lang === activeLang;
      item.style.display = (typeMatch && langMatch) ? '' : 'none';
    });
    let n = 1;
    document.querySelectorAll('.article-item:not([style*="none"]) .article-num').forEach(el => {
      el.textContent = String(n++).padStart(2, '0');
    });
  }

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.dataset.group;
      document.querySelectorAll(`.filter-btn[data-group="${group}"]`).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (group === 'type') activeType = btn.dataset.filter;
      else if (group === 'lang') activeLang = btn.dataset.filter;
      applyFilters();
    });
  });
})();
