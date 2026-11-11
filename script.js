// Configuração de marketing: este site não precisa de backend.
// Altera este email para a caixa que irá receber os pedidos de interesse.
const INTEREST_EMAIL = 'ola@elo.pt';

const modal = document.querySelector('#interest-modal');
const interestButtons = document.querySelectorAll('.js-interest');
const closeButton = document.querySelector('[data-close-modal]');
const mailLink = document.querySelector('.modal-mail');
const year = document.querySelector('#year');

function updateMailLink() {
  const subject = encodeURIComponent('Quero saber mais sobre a Elo');
  const body = encodeURIComponent('Olá, quero saber mais sobre a Elo.\n\nNome: ');
  mailLink.href = `mailto:${INTEREST_EMAIL}?subject=${subject}&body=${body}`;
}

function openModal() {
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  closeButton.focus();
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

interestButtons.forEach((button) => button.addEventListener('click', openModal));
closeButton.addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
});

updateMailLink();
year.textContent = new Date().getFullYear();
