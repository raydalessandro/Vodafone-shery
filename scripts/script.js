// Mini helper
const $ = (s, ctx=document) => ctx.querySelector(s);
const $$ = (s, ctx=document) => Array.from(ctx.querySelectorAll(s));

// Year in footer
(() => {
  document.querySelectorAll('#year').forEach(n => n.textContent = new Date().getFullYear());
})();

// evidenzia menù attivo automaticamente se manca aria-current
(() => {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav .menu a').forEach(a=>{
    const href = a.getAttribute('href');
    if(!a.hasAttribute('aria-current') && href === path){
      a.setAttribute('aria-current','page');
    }
  });
})();

// Mobile nav toggle
(() => {
  const btn = document.querySelector('.nav-toggle');
  const menu = document.getElementById('menu');
  if(!btn || !menu) return;
  btn.addEventListener('click', ()=>{
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
})();

// lazy attr safety
document.querySelectorAll('img:not([loading])').forEach(img=>{
  img.setAttribute('loading','lazy'); img.setAttribute('decoding','async');
});

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
