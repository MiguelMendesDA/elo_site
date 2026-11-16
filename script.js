// Configuração de marketing: este site não precisa de backend.
// Altera este email para a caixa que irá receber os pedidos de interesse.
const INTEREST_EMAIL = 'geral@alen2.app';

const modal = document.querySelector('#interest-modal');
const interestButtons = document.querySelectorAll('.js-interest');
const closeButton = document.querySelector('[data-close-modal]');
const mailLink = document.querySelector('.modal-mail');
const year = document.querySelector('#year');
let modalTrigger = null;

function updateMailLink(plan = '') {
  const subject = encodeURIComponent(plan ? 'alen2 — ' + plan : 'Quero saber mais sobre a alen2');
  const body = encodeURIComponent(plan
    ? 'Olá, gostaria de receber informações sobre a opção ' + plan + ' da alen2, incluindo preço, duração e o que está incluído.\n\nNome: '
    : 'Olá, quero saber mais sobre a alen2.\n\nNome: ');
  mailLink.href = `mailto:${INTEREST_EMAIL}?subject=${subject}&body=${body}`;
}

function openModal(event) {
  modalTrigger = event.currentTarget;
  const plan = modalTrigger.dataset.plan || '';
  updateMailLink(plan);
  document.querySelector('#modal-title').textContent = plan ? 'Saber mais: ' + plan : 'Queres saber mais sobre a alen2?';
  modal.classList.add('is-open');
  modal.inert = false;
  modal.setAttribute('aria-hidden', 'false');
  closeButton.focus();
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('is-open');
  modal.inert = true;
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  modalTrigger?.focus();
}

interestButtons.forEach((button) => button.addEventListener('click', openModal));
closeButton.addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  if (event.key === 'Tab' && modal.classList.contains('is-open')) {
    if (event.shiftKey && document.activeElement === closeButton) {
      event.preventDefault();
      mailLink.focus();
    } else if (!event.shiftKey && document.activeElement === mailLink) {
      event.preventDefault();
      closeButton.focus();
    }
  }
});

updateMailLink();
year.textContent = new Date().getFullYear();

const carousel = document.querySelector('[data-carousel]');
if (carousel) {
  const track = carousel.querySelector('.tour-track');
  const slides = [...carousel.querySelectorAll('[data-slide]')];
  const dots = [...carousel.querySelectorAll('[data-carousel-dot]')];
  const status = carousel.querySelector('.tour-status');
  let currentSlide = 0;
  let carouselTimer;
  let carouselPaused = false;

  const showSlide = (next, { focus = false } = {}) => {
    currentSlide = (next + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    slides.forEach((slide, index) => {
      const active = index === currentSlide;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    dots.forEach((dot, index) => {
      const active = index === currentSlide;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-selected', String(active));
      if (active && focus) dot.focus();
    });
    if (status) status.textContent = `A mostrar ${currentSlide + 1} de ${slides.length}`;
  };

  const nextSlide = () => showSlide(currentSlide + 1);
  const startCarousel = () => {
    clearInterval(carouselTimer);
    if (!carouselPaused && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      carouselTimer = setInterval(nextSlide, 5000);
    }
  };

  carousel.querySelector('[data-carousel-next]')?.addEventListener('click', () => { showSlide(currentSlide + 1, { focus: true }); startCarousel(); });
  carousel.querySelector('[data-carousel-prev]')?.addEventListener('click', () => { showSlide(currentSlide - 1, { focus: true }); startCarousel(); });
  dots.forEach((dot, index) => dot.addEventListener('click', () => { showSlide(index, { focus: true }); startCarousel(); }));
  carousel.addEventListener('mouseenter', () => { carouselPaused = true; clearInterval(carouselTimer); });
  carousel.addEventListener('mouseleave', () => { carouselPaused = false; startCarousel(); });
  carousel.addEventListener('focusin', () => { carouselPaused = true; clearInterval(carouselTimer); });
  carousel.addEventListener('focusout', (event) => { if (!carousel.contains(event.relatedTarget)) { carouselPaused = false; startCarousel(); } });
  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); showSlide(currentSlide + 1, { focus: true }); startCarousel(); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); showSlide(currentSlide - 1, { focus: true }); startCarousel(); }
  });
  showSlide(0);
  startCarousel();
}
