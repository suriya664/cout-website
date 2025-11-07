/* Custom behaviors for Constructa template */

const Constructa = (() => {
  const initCounters = () => {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const element = entry.target;
        const rawValue = element.dataset.counter || '0';
        const match = rawValue.match(/^(\d+)([^\d]*)$/);
        const target = match ? parseInt(match[1], 10) : parseInt(rawValue, 10);
        const suffix = match ? match[2] : '';
        if (Number.isNaN(target)) {
          obs.unobserve(element);
          return;
        }

        if (target <= 0) {
          element.textContent = `${target}${suffix}`;
          obs.unobserve(element);
          return;
        }

        let current = 0;
        const step = Math.max(1, Math.ceil(target / 80));

        const tick = () => {
          current += step;
          if (current >= target) {
            element.textContent = `${target}${suffix}`;
            return;
          }
          element.textContent = current.toString();
          requestAnimationFrame(tick);
        };

        tick();
        obs.unobserve(element);
      });
    }, { threshold: 0.4 });

    counters.forEach(counter => observer.observe(counter));
  };

  const initAccordion = () => {
    const accordions = document.querySelectorAll('[data-accordion]');
    accordions.forEach(acc => {
      acc.querySelectorAll('[data-accordion-item]').forEach(item => {
        const trigger = item.querySelector('[data-accordion-trigger]');
        const content = item.querySelector('[data-accordion-content]');
        if (!trigger || !content) return;

        trigger.addEventListener('click', () => {
          const isOpen = item.classList.toggle('is-open');
          content.style.maxHeight = isOpen ? `${content.scrollHeight}px` : '0';
        });
      });
    });
  };

  return {
    init() {
      initCounters();
      initAccordion();
    }
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  Constructa.init();
});


