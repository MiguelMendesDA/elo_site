// Configuração de marketing: este site não precisa de backend.
// Altera este email para a caixa que irá receber os pedidos de interesse.
const INTEREST_EMAIL = 'ola@elo.pt';

const modal = document.querySelector('#interest-modal');
const interestButtons = document.querySelectorAll('.js-interest');
const closeButton = document.querySelector('[data-close-modal]');
const mailLink = document.querySelector('.modal-mail');
const year = document.querySelector('#year');
let modalTrigger = null;

function updateMailLink(plan = '') {
  const subject = encodeURIComponent(plan ? 'Elo — ' + plan : 'Quero saber mais sobre a Elo');
  const body = encodeURIComponent(plan
    ? 'Olá, gostaria de receber informações sobre a opção ' + plan + ' da Elo, incluindo preço, duração e o que está incluído.\n\nNome: '
    : 'Olá, quero saber mais sobre a Elo.\n\nNome: ');
  mailLink.href = `mailto:${INTEREST_EMAIL}?subject=${subject}&body=${body}`;
}

function openModal(event) {
  modalTrigger = event.currentTarget;
  const plan = modalTrigger.dataset.plan || '';
  updateMailLink(plan);
  document.querySelector('#modal-title').textContent = plan ? 'Saber mais: ' + plan : 'Queres saber mais sobre a Elo?';
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  closeButton.focus();
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('is-open');
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
