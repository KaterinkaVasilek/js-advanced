// Задание 1
// Создайте интерактивную веб-страницу для оставления и просмотра отзывов о продуктах. Пользователи могут добавлять отзывы о различных продуктах и просматривать добавленные отзывы.

// Страница просмотра отзывов:
// Показывает список всех продуктов, о которых были оставлены отзывы.
// При клике на название продукта отображается список всех отзывов по этому продукту.
// Возможность удаления отзыва (при нажатии на кнопку "Удалить" рядом с отзывом, данный отзыв удаляется из LocalStorage).

import { dataCatalog } from "./data.js";

const data = localStorage.items ? JSON.parse(localStorage.items) : JSON.parse(dataCatalog);
const catalogList = document.querySelector('[data-catalog]');

const removeReview = (title, index) => {
  const elTitle = data.find(item => item.title === title);
  elTitle.reviews.splice(index, 1);
  localStorage.items = JSON.stringify(data);
  catalogList.querySelector(`[data-li-index="${index}"]`).remove();
}

const renderReview = (item) => {
  const title = item.title;
  return item.reviews.reduce((result, review, index) => {
    let el = `
      <li class="reviews-list__item" data-li-index="${index}">
        <p class="reviews-list__text">${review}</p>
        <button class="reviews-list__del-item" data-reviewEl-btn="delReview" data-title-item="${title}" data-item-index="${index}">Удалить отзыв</button>
      </li>
    `;
    return result + el;
  }, "")
}

let items = data.reduce((result, item, index) => {
  let el = `
    <li class="catalog__item" data-item="${index}">
      <h2 class="catalog__title" data-item-title="${item.title}">${item.title}</h2>
      <img class="catalog__img" src="${item.img}" alt="${item.title}.">
      <button class="catalog__btn" data-item-btn="showReviews">Посмотреть/скрыть отзывы</button>
      <ul class="reviews-list">
        ${renderReview(item)}
      </ul>
    </li>
  `;
  return result + el;
}, "")

catalogList.innerHTML = items;

const showReviewsList = (e) => {
  const el = e.target;
  if (el.dataset.itemBtn) {
    const itemRevList = el.closest('.catalog__item').querySelector('.reviews-list');
    itemRevList.classList.toggle('reviews-list--active');
  }
  if (el.dataset.reviewelBtn) {
    removeReview(el.dataset.titleItem, el.dataset.itemIndex);
  }
}

catalogList.addEventListener('click', showReviewsList);

