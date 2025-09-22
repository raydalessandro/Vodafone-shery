// Mini helper
const $ = (s, ctx=document) => ctx.querySelector(s);
const $$ = (s, ctx=document) => Array.from(ctx.querySelectorAll(s));

// Year in footer
(() => {
  const y = new Date().getFullYear();
  const el = $$('#year');
  el.forEach(n => n.textContent = y);
})();

// Mobile nav toggle
(() => {
  const btn = $('.nav-toggle');
  const menu = $('#menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
  });
})();

// Smooth anchor focus
(() => {
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        target.setAttribute('tabindex','-1'); target.focus({preventScroll:true});
        setTimeout(()=>target.removeAttribute('tabindex'), 500);
      }
    });
  });
})();

// Cookie banner (GDPR baseline)
(() => {
  const KEY = 'cookie-consent';
  const banner = $('#cookie-banner');
  if (!banner) return;
  const saved = localStorage.getItem(KEY);
  if (!saved) banner.hidden = false;

  banner.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-cookie]');
    if (!btn) return;
    const val = btn.getAttribute('data-cookie') === 'accept' ? 'accepted' : 'rejected';
    localStorage.setItem(KEY, val);
    banner.hidden = true;
  });
})();

// Lightweight form handler (placeholder)
(() => {
  const form = $('.contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // TODO: integrare con form handler esterno / Netlify forms
    alert('Grazie! Ti ricontatteremo a breve.');
    form.reset();
  });
})();
