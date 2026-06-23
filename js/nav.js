/* Shared nav + footer — renders relative paths for any page depth */

/* ── Root detection ──────────────────────────────────────────
   Reads the ../  prefix count on this script's own src attribute
   so the same file works at depth 0 (index.html), 1 (articles/),
   and 2 (articles/poems/) without any per-page configuration.     */
const _srcAttr = document.currentScript?.getAttribute('src')
               || document.querySelector('script[src$="nav.js"]')?.getAttribute('src')
               || './js/nav.js';
const _depth = (_srcAttr.match(/\.\.\/\//g) || []).length;
const ROOT   = _depth === 0 ? './' : '../'.repeat(_depth);

/* ── Social icon SVGs ─────────────────────────────────────── */
const ICONS = {
  facebook:  `<svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
  linkedin:  `<svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
  twitter:   `<svg viewBox="0 0 24 24"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
  youtube:   `<svg viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>`,
  github:    `<svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
  email:     `<svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
};

const SOCIAL = [
  { key: 'facebook',  href: 'https://www.facebook.com/bsntas',   label: 'Facebook'  },
  { key: 'linkedin',  href: 'https://www.linkedin.com/in/bsnta', label: 'LinkedIn'  },
  { key: 'twitter',   href: 'https://twitter.com/bsntas',        label: 'Twitter/X' },
  { key: 'instagram', href: 'https://www.instagram.com/bsntas',  label: 'Instagram' },
  { key: 'youtube',   href: 'https://www.youtube.com/@bsnta',    label: 'YouTube'   },
  { key: 'github',    href: 'https://github.com/bsntas',         label: 'GitHub'    },
  { key: 'email',     href: 'mailto:official@bsnta.com',         label: 'Email'     },
];

function socialLinksHTML(cls) {
  return `<div class="social-links ${cls || ''}">
    ${SOCIAL.map(s => {
      const ext = s.href.startsWith('http') ? ' target="_blank" rel="noopener"' : '';
      return `<a href="${s.href}" class="social-link" aria-label="${s.label}"${ext}>${ICONS[s.key]}</a>`;
    }).join('')}
  </div>`;
}

/* ── Nav HTML ─────────────────────────────────────────────── */
const NAV_HTML = `
<nav class="nav" id="mainNav">
  <div class="container nav-inner">
    <a href="${ROOT}index.html" class="nav-logo">
      <img src="${ROOT}assets/images/logo.svg" alt="Basanta Sharma logo" class="nav-logo-img">
      Basanta <span>Sharma</span>
    </a>
    <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation">
      <span></span><span></span><span></span>
    </button>
    <ul class="nav-links" id="navLinks">
      <li><a href="${ROOT}index.html">Home</a></li>
      <li><a href="${ROOT}gallery.html">Gallery</a></li>
      <li><a href="${ROOT}achievements.html">Achievements</a></li>
      <li><a href="${ROOT}family.html">Family</a></li>
      <li><a href="${ROOT}articles/index.html">Articles</a></li>
      <li><a href="${ROOT}creations.html">Creations</a></li>
    </ul>
  </div>
</nav>`;

/* ── Footer HTML ──────────────────────────────────────────── */
const FOOTER_HTML = `
<footer class="footer">
  <div class="container">
    <div class="footer-top">
      <div>
        <div class="footer-name">Basanta Sharma</div>
        <div class="footer-motto">&ldquo;Love is life, Live in Love&rdquo;</div>
        <p class="footer-bio">Network Software Engineer &middot; Writer &middot; Explorer<br>
          Building robust network systems by day, crafting Nepali poetry by night.
        </p>
        <nav class="footer-nav" aria-label="Site navigation">
          <a href="${ROOT}index.html">Home</a>
          <a href="${ROOT}gallery.html">Gallery</a>
          <a href="${ROOT}achievements.html">Achievements</a>
          <a href="${ROOT}family.html">Family</a>
          <a href="${ROOT}articles/index.html">Articles</a>
        </nav>
      </div>
      ${socialLinksHTML('footer-social')}
    </div>
    <hr class="footer-divider">
    <div class="footer-bottom">
      <p>&copy; <span id="fyear"></span> Basanta Sharma. All rights reserved.</p>
      <a href="mailto:official@bsnta.com">official@bsnta.com</a>
    </div>
  </div>
</footer>`;

/* ── Init ─────────────────────────────────────────────────── */
(function init() {
  const navSlot = document.getElementById('nav-slot');
  if (navSlot) navSlot.outerHTML = NAV_HTML;

  const footerSlot = document.getElementById('footer-slot');
  if (footerSlot) footerSlot.outerHTML = FOOTER_HTML;

  const yr = document.getElementById('fyear');
  if (yr) yr.textContent = '2018–' + new Date().getFullYear();

  /* Back-to-top button */
  const btt = document.createElement('button');
  btt.className = 'back-to-top';
  btt.id = 'backToTop';
  btt.setAttribute('aria-label', 'Back to top');
  btt.innerHTML = `<svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>`;
  document.body.appendChild(btt);
  btt.addEventListener('click', () => globalThis.scrollTo({ top: 0, behavior: 'smooth' }));

  /* Reading progress bar (post pages only) */
  if (document.querySelector('.post-wrap')) {
    const bar = document.createElement('div');
    bar.className = 'reading-progress';
    bar.innerHTML = '<div class="reading-progress-bar" id="readingBar"></div>';
    document.body.appendChild(bar);
  }

  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        links.classList.remove('open');
      })
    );
  }

  globalThis.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    if (nav) nav.classList.toggle('scrolled', globalThis.scrollY > 20);

    const bttEl = document.getElementById('backToTop');
    if (bttEl) bttEl.classList.toggle('visible', globalThis.scrollY > 400);

    const readBar = document.getElementById('readingBar');
    if (readBar) {
      const doc = document.documentElement;
      const pct = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
      readBar.style.width = Math.min(pct, 100) + '%';
    }
  }, { passive: true });

  /* Active link: compare resolved absolute hrefs */
  const cur = globalThis.location.href;
  document.querySelectorAll('.nav-links a').forEach(a => {
    const h = a.href; // browser resolves relative → absolute
    if (h === cur || cur.startsWith(h.replace('index.html', ''))) {
      a.classList.add('active');
    }
  });

  /* Scroll-in animations */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.animate').forEach(el => obs.observe(el));
})();
