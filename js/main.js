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

/* ── Family tree modal ──────────────────────────────────────── */
(function familyTree() {
  const modal    = document.getElementById('personModal');
  const closeBtn = document.getElementById('personModalClose');
  if (!modal) return;

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
      modal.showModal();
    });
  });

  closeBtn.addEventListener('click', () => modal.close());
  modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });
})();

/* ── Article filter ─────────────────────────────────────── */
(function articleFilter() {
  const list = document.querySelector('.article-list');
  if (!list) return;

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const type = btn.dataset.filter;
      document.querySelectorAll('.article-item').forEach(item => {
        const match = type === 'all' || item.dataset.type === type;
        item.style.display = match ? '' : 'none';
      });
      /* Renumber visible items */
      let n = 1;
      document.querySelectorAll('.article-item:not([style*="none"]) .article-num').forEach(el => {
        el.textContent = String(n++).padStart(2, '0');
      });
    });
  });
})();
