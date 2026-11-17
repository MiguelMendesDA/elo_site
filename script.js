const INTEREST_API = 'https://elo-gxp4.onrender.com/api/marketing-interest';

const modal = document.querySelector('#interest-modal');
const interestButtons = document.querySelectorAll('.js-interest');
const closeButton = document.querySelector('[data-close-modal]');
const interestForm = document.querySelector('#interest-form');
const interestName = document.querySelector('#interest-name');
const interestEmail = document.querySelector('#interest-email');
const interestStatus = document.querySelector('#interest-status');
const year = document.querySelector('#year');
let modalTrigger = null;
let selectedPlan = '';

function openModal(event) {
  modalTrigger = event.currentTarget;
  selectedPlan = modalTrigger.dataset.plan || '';
  document.querySelector('#modal-title').innerHTML = selectedPlan ? `Saber mais<br /><em>${selectedPlan}</em>` : 'Queres saber mais<br /><em>sobre a alen2?</em>';
  interestStatus.textContent = '';
  interestForm.reset();
  modal.classList.add('is-open');
  modal.inert = false;
  modal.setAttribute('aria-hidden', 'false');
  interestName.focus();
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
interestForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const submit = interestForm.querySelector('button[type="submit"]');
  submit.disabled = true;
  interestStatus.className = 'interest-status';
  interestStatus.textContent = 'A enviar pedido…';
  try {
    const response = await fetch(INTEREST_API, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ name: interestName.value.trim(), email: interestEmail.value.trim(), plan: selectedPlan }) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Não foi possível enviar o pedido.');
    interestStatus.classList.add('is-success');
    interestStatus.textContent = result.message;
    interestForm.reset();
  } catch (error) {
    interestStatus.classList.add('is-error');
    interestStatus.textContent = error.message;
  } finally { submit.disabled = false; }
});
closeButton.addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  if (event.key === 'Tab' && modal.classList.contains('is-open')) {
    if (event.shiftKey && document.activeElement === closeButton) {
      event.preventDefault();
      interestEmail.focus();
    } else if (!event.shiftKey && document.activeElement === interestEmail) {
      event.preventDefault();
      closeButton.focus();
    }
  }
});

year.textContent = new Date().getFullYear();

const carousel = document.querySelector('[data-carousel]');
if (carousel) {
  const slides = [...carousel.querySelectorAll('[data-slide]')];
  const dots = [...carousel.querySelectorAll('[data-carousel-dot]')];
  const status = carousel.querySelector('.tour-status');
  let currentSlide = 0;
  let carouselTimer;

  const showSlide = (next, { focus = false } = {}) => {
    currentSlide = (next + slides.length) % slides.length;
    slides.forEach((slide, index) => {
      const active = index === currentSlide;
      slide.classList.toggle('is-active', active);
      slide.hidden = !active;
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
    if (!document.hidden) {
      carouselTimer = setInterval(nextSlide, 5000);
    }
  };

  carousel.querySelector('[data-carousel-next]')?.addEventListener('click', () => { showSlide(currentSlide + 1, { focus: true }); startCarousel(); });
  carousel.querySelector('[data-carousel-prev]')?.addEventListener('click', () => { showSlide(currentSlide - 1, { focus: true }); startCarousel(); });
  dots.forEach((dot, index) => dot.addEventListener('click', () => { showSlide(index, { focus: true }); startCarousel(); }));
  // Touch devices can retain hover and focus after a tap; neither should stop autoplay.
  document.addEventListener('visibilitychange', startCarousel);
  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); showSlide(currentSlide + 1, { focus: true }); startCarousel(); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); showSlide(currentSlide - 1, { focus: true }); startCarousel(); }
  });
  showSlide(0);
  startCarousel();
}
