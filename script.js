/* =========================================================
   CONFIGURAÇÃO — cole aqui o link real de checkout
   ========================================================= */
const CHECKOUT_URL = "https://pay.kiwify.com.br/kAzy1lr?afid=ZyxI7oyF";

document.addEventListener('DOMContentLoaded', () => {

  /* ============ Conecta todos os CTAs ao checkout ============ */
  document.querySelectorAll('.cta-checkout').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      if (!CHECKOUT_URL || CHECKOUT_URL === 'COLE_SEU_LINK_DE_CHECKOUT_AQUI') {
        // Enquanto o link real não for configurado, mantém o comportamento
        // padrão do href (âncora da própria página) para não quebrar a navegação.
        return;
      }
      e.preventDefault();
      window.location.href = CHECKOUT_URL;
    });
  });

  /* ============ Header sticky compacto ============ */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ============ Menu mobile ============ */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ============ Scroll reveal ============ */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ============ FAQ accordion ============ */
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach((item) => {
    const trigger = item.querySelector('.accordion-trigger');
    const panel = item.querySelector('.accordion-panel');

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      accordionItems.forEach((other) => {
        other.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
        other.querySelector('.accordion-panel').style.maxHeight = null;
      });

      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* ============ Lightbox da galeria ============ */
  const lightbox = document.getElementById('lightbox');
  const lightboxThumb = document.getElementById('lightboxThumb');
  const lightboxLabel = document.getElementById('lightboxLabel');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.masonry-item').forEach((item) => {
    item.addEventListener('click', () => {
      const innerClass = item.querySelector('div').className;
      lightboxThumb.className = 'lightbox-thumb ' + innerClass;
      lightboxLabel.textContent = item.dataset.label || '';
      lightbox.classList.add('open');
    });
  });

  const closeLightbox = () => lightbox.classList.remove('open');
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ============ Sticky mobile CTA: esconde perto da oferta ============ */
  const stickyCta = document.getElementById('stickyMobileCta');
  const offerSection = document.getElementById('oferta');
  if (stickyCta && offerSection) {
    const offerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        stickyCta.style.display = entry.isIntersecting ? 'none' : '';
      });
    }, { threshold: 0.2 });
    offerObserver.observe(offerSection);
  }

});
