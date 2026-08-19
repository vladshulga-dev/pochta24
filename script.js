const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.primary-nav');
const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

menuToggle?.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('[data-toast]').forEach((element) => {
  element.addEventListener('click', () => showToast(element.dataset.toast));
});

document.getElementById('tracking-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.getElementById('tracking-number');
  const message = document.getElementById('tracking-message');
  const value = input.value.trim();

  if (!value) {
    message.textContent = 'Введите трек-номер отправления.';
    input.focus();
    return;
  }

  if (value.toUpperCase() === 'P24-4821-7719') {
    message.textContent = 'Отправление принято в сортировочном центре. Ожидаемая доставка: завтра.';
    return;
  }

  message.textContent = 'Отправление не найдено. Проверьте трек-номер и попробуйте ещё раз.';
});

document.getElementById('branch-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = document.getElementById('branch-query').value.trim();
  showToast(query ? `По запросу «${query}» найдено 6 отделений.` : 'Введите город или улицу для поиска.');
});

const lightbox = document.getElementById('lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxClose = lightbox?.querySelector('.lightbox-close');

document.querySelectorAll('[data-lightbox]').forEach((button) => {
  button.addEventListener('click', () => {
    lightboxImage.src = button.dataset.lightbox;
    lightboxImage.alt = button.querySelector('img')?.alt || 'Увеличенное изображение';
    lightbox.showModal();
  });
});

lightboxClose?.addEventListener('click', () => lightbox.close());
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});
