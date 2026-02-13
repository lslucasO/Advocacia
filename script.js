/* ================================================
   RAFAEL MENDES — Javascript
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Mobile menu toggle ──
  const toggle = document.getElementById('mobileToggle');
  const nav = document.getElementById('mainNav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.classList.remove('active');
      });
    });
  }

  // ── Header scroll effect ──
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 60) {
      header.style.background = 'rgba(26, 31, 46, .98)';
      header.style.boxShadow = '0 2px 20px rgba(0,0,0,.3)';
    } else {
      header.style.background = 'rgba(26, 31, 46, .92)';
      header.style.boxShadow = 'none';
    }
  });

  // ── Scroll reveal animation ──
  const revealElements = document.querySelectorAll(
    '.card, .testimonial, .sobre__content, .sobre__image, .contato__info, .contato__form, .stat, .section-title, .section-tag'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .7s cubic-bezier(.4,0,.2,1), transform .7s cubic-bezier(.4,0,.2,1)';
    revealObserver.observe(el);
  });

  // Class for revealed elements
  const style = document.createElement('style');
  style.textContent = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
  document.head.appendChild(style);

  // ── Staggered animation for grids ──
  const gridContainers = document.querySelectorAll('.servicos__grid, .depoimentos__grid');
  gridContainers.forEach(grid => {
    const children = grid.children;
    Array.from(children).forEach((child, index) => {
      child.style.transitionDelay = `${index * 0.15}s`;
    });
  });

  // ── Contact form handler ──
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = document.getElementById('nome').value;
      const telefone = document.getElementById('telefone').value;
      const email = document.getElementById('email').value;
      const assunto = document.getElementById('assunto').value;
      const mensagem = document.getElementById('mensagem').value;

      // Build WhatsApp message
      const whatsappMessage = encodeURIComponent(
        `Olá Dr. Rafael! Meu nome é ${nome}.\n` +
        `📧 E-mail: ${email}\n` +
        `📞 Telefone: ${telefone}\n` +
        `📋 Assunto: ${assunto}\n` +
        `💬 Mensagem: ${mensagem}`
      );

      // Redirect to WhatsApp (change number as needed)
      window.open(`https://wa.me/5511999999999?text=${whatsappMessage}`, '_blank');

      // Show success feedback
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = '\u2713 MENSAGEM ENVIADA!';
      btn.style.background = '#1e40af';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        form.reset();
      }, 3000);
    });
  }

  // ── Smooth number counter for stats ──
  const stats = document.querySelectorAll('.stat__number');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const match = text.match(/(\d+)/);
        if (match) {
          const target = parseInt(match[1]);
          const suffix = text.replace(match[1], '');
          let current = 0;
          const step = Math.ceil(target / 60);
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = current + suffix;
          }, 25);
        }
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => countObserver.observe(stat));

  // ── Phone mask for telefone input ──
  const telInput = document.getElementById('telefone');
  if (telInput) {
    telInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);

      if (value.length > 6) {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
      } else if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else if (value.length > 0) {
        value = `(${value}`;
      }
      e.target.value = value;
    });
  }

});
