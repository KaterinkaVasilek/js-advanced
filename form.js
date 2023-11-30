// Задание 1
// Создайте интерактивную веб-страницу для оставления и просмотра отзывов о продуктах. Пользователи могут добавлять отзывы о различных продуктах и просматривать добавленные отзывы.

// Страница добавления отзыва:
// Поле для ввода названия продукта.
// Текстовое поле для самого отзыва.
// Кнопка "Добавить отзыв", которая сохраняет отзыв о продукте в LocalStorage.
import { dataCatalog } from "./data.js";

const formEl = document.querySelector('[data-form]');
const productTitleInput = document.querySelector('[data-input-title]');
const reviewTextField = document.querySelector('[data-textarea]');

const data = JSON.parse(dataCatalog);

productTitleInput.addEventListener('change', () => {
  const checkTitle = data.some((el) => el.title === productTitleInput.value);
  if (checkTitle) {
    productTitleInput.classList.remove('review__input--error')
    productTitleInput.classList.add('review__input--ok')
  } else {
    productTitleInput.classList.add('review__input--error')
    productTitleInput.classList.remove('review__input--ok')
  }
});

formEl.addEventListener('submit', (e) => {
  e.preventDefault();

  if (reviewTextField.value !== '') {
    data.find(item => item.title === productTitleInput.value.toLowerCase())
      .reviews.push(reviewTextField.value);
    localStorage.items = JSON.stringify(data);
    alert('Отзыв сохранен');
    formEl.reset();
  }
})

