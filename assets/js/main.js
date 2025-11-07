document.addEventListener('DOMContentLoaded', () => {
  const ensureFavicon = () => {
    const faviconHref = 'https://cdn-icons-png.flaticon.com/512/1046/1046869.png';
    let faviconLink = document.querySelector('link[rel="icon"]');
    if (!faviconLink) {
      faviconLink = document.createElement('link');
      faviconLink.rel = 'icon';
      document.head.appendChild(faviconLink);
    }
    faviconLink.type = 'image/png';
    faviconLink.href = faviconHref;

    if (!document.querySelector('link[rel="shortcut icon"]')) {
      const shortcutIcon = document.createElement('link');
      shortcutIcon.rel = 'shortcut icon';
      shortcutIcon.type = 'image/png';
      shortcutIcon.href = faviconHref;
      document.head.appendChild(shortcutIcon);
    }
  };

  ensureFavicon();

  const navToggle = document.querySelector('[data-nav-toggle]');
  const navMenu = document.querySelector('[data-nav-menu]');
  const placeholderSvg = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#f7f7f7" />
          <stop offset="100%" stop-color="#e0e0e0" />
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#g)" />
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-size="32" fill="#999999">Image Coming Soon</text>
    </svg>`
  )}`;

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('is-open');
      navToggle.classList.toggle('is-active');
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', (!isExpanded).toString());
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
      if (img.dataset.fallbackApplied === 'true') return;
      img.dataset.fallbackApplied = 'true';
      img.src = placeholderSvg;
      img.removeAttribute('srcset');
      img.classList.add('image-placeholder');
    });
  });

  const backToTop = document.querySelector('[data-backtotop]');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('is-visible', window.scrollY > 280);
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const modalTriggers = document.querySelectorAll('[data-modal-open]');
  const modalCloseButtons = document.querySelectorAll('[data-modal-close]');

  modalTriggers.forEach(trigger => {
    const targetId = trigger.dataset.modalOpen;
    const modal = document.getElementById(targetId);
    if (!modal) return;

    trigger.addEventListener('click', event => {
      event.preventDefault();
      modal.removeAttribute('hidden');
      modal.querySelector('button, a, input, textarea, select')?.focus();
      document.body.style.overflow = 'hidden';
    });
  });

  modalCloseButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      if (!modal) return;
      modal.setAttribute('hidden', '');
      document.body.style.overflow = '';
    });
  });

  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', event => {
      if (event.target === modal) {
        modal.setAttribute('hidden', '');
        document.body.style.overflow = '';
      }
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    document.querySelectorAll('.modal').forEach(modal => {
      if (modal.hasAttribute('hidden')) return;
      modal.setAttribute('hidden', '');
      document.body.style.overflow = '';
    });
  });
});

window.addEventListener('load', () => {
  const preloader = document.querySelector('[data-preloader]');
  if (preloader) {
    preloader.setAttribute('hidden', '');
  }

  const yearHolder = document.getElementById('current-year');
  if (yearHolder) {
    yearHolder.textContent = new Date().getFullYear().toString();
  }
});


