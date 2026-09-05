// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
  });
});

// Lock page scroll - navigation only via buttons
window.addEventListener('wheel', (e) => e.preventDefault(), { passive: false });
window.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
window.addEventListener('keydown', (e) => {
  if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) {
    e.preventDefault();
  }
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.backgroundColor = '#1a0208';
  } else {
    navbar.style.backgroundColor = '#2b0410';
  }
});
// Intro loaded counter animation
const loadedNum = document.getElementById('loadedNum');
if (loadedNum) {
  let count = 0;
  const target = 6;
  const counter = setInterval(() => {
    count++;
    loadedNum.textContent = String(count).padStart(2, '0');
    if (count >= target) clearInterval(counter);
  }, 150);
}
// Highlight active nav link on scroll
const navAnchors = document.querySelectorAll('.nav-links a');
const allSections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let current = '';
  allSections.forEach(sec => {
    const sectionTop = sec.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = sec.getAttribute('id');
    }
  });

  navAnchors.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});
// Show navbar only after intro section
const navbar = document.querySelector('.navbar');
const introSection = document.querySelector('.intro');
const introHeight = introSection.offsetHeight;

window.addEventListener('scroll', () => {
  if (window.scrollY > introHeight - 100) {
    navbar.classList.add('show');
  } else {
    navbar.classList.remove('show');
  }
});
// Contact form - AJAX submit (no redirect)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        contactForm.reset();
        btn.textContent = 'Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #4dff88, #2ecc71)';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      btn.textContent = 'Error - Try Again';
      btn.style.background = 'linear-gradient(135deg, #ff4d6d, #e33052)';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }
  });
}
// Typing effect for hero role
const roleEl = document.querySelector('.hero-left h2');
if (roleEl) {
  const roles = ['Software Developer', 'Backend Developer', 'Python Developer'];
  let roleIndex = 0, charIndex = 0, deleting = false;
  roleEl.innerHTML = '';
  const textSpan = document.createElement('span');
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  roleEl.appendChild(textSpan);
  roleEl.appendChild(cursor);

  const type = () => {
    const word = roles[roleIndex];
    if (!deleting) {
      charIndex++;
      if (charIndex === word.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    textSpan.textContent = word.slice(0, charIndex);
    setTimeout(type, deleting ? 40 : 90);
  };
  type();
}
// Reveal animations
const revealEls = document.querySelectorAll('.project-card, .service-card, .about-content, .hero-left, .hero-right, .contact-content, .intro-left, .intro-right, .core-ui');
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));
// Back to top
const backTop = document.getElementById('backTop');
if (backTop) {
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('show', window.scrollY > introHeight);
  });
  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}