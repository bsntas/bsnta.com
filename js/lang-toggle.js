(function () {
  var STORAGE_KEY = 'bsnta-lang';

  function setLang(lang) {
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      var active = btn.dataset.lang === lang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active);
    });

    document.querySelectorAll('[data-lang-content]').forEach(function (el) {
      el.hidden = el.dataset.langContent !== lang;
    });

    var title = document.querySelector('.post-title[data-en]');
    if (title) {
      title.textContent = lang === 'en' ? title.dataset.en : title.dataset.ne;
      title.classList.toggle('nepali', lang === 'ne');
    }

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function init() {
    var toggle = document.querySelector('.lang-toggle');
    if (!toggle) return;

    var saved;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    setLang(saved || 'ne');

    toggle.addEventListener('click', function (e) {
      var btn = e.target.closest('.lang-btn');
      if (btn) setLang(btn.dataset.lang);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
