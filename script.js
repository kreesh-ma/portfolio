// Smooth scroll for nav links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
  });
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