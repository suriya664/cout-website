/* Vendor integrations */

document.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) {
    window.AOS.init({
      duration: 800,
      easing: 'ease-out-quart',
      once: true
    });
  }

  if (window.jQuery && typeof window.jQuery.fn.owlCarousel === 'function') {
    window.jQuery('[data-owl-carousel]').owlCarousel({
      items: 3,
      margin: 24,
      loop: true,
      autoplay: true,
      autoplayTimeout: 4800,
      responsive: {
        0: { items: 1 },
        768: { items: 2 },
        1024: { items: 3 }
      }
    });
  }

  if (window.Isotope) {
    const grid = document.querySelector('[data-isotope-grid]');
    if (grid) {
      const iso = new window.Isotope(grid, {
        itemSelector: '[data-isotope-item]',
        percentPosition: true,
        masonry: {
          columnWidth: '[data-isotope-sizer]'
        }
      });

      document.querySelectorAll('[data-isotope-filter]').forEach(button => {
        button.addEventListener('click', () => {
          const filter = button.dataset.isotopeFilter || '*';
          iso.arrange({ filter });

          button.parentElement?.querySelectorAll('button').forEach(btn => {
            btn.classList.toggle('is-active', btn === button);
          });
        });
      });
    }
  }
});


