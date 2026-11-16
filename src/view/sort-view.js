import AbstractView from '../framework/view/abstract-view.js';
import { titleString } from '../utils/common.js';

function createSortItemTemplate(sortType, isActive, isChecked) {
  return (
    `<div class="trip-sort__item  trip-sort__item--${sortType}">
      <input
        id="sort-${sortType}" class="trip-sort__input  visually-hidden"
        type="radio" name="trip-sort" value="sort-${sortType}"
        ${isChecked ? 'checked' : ''} ${isActive ? '' : 'disabled'}>
      <label class="trip-sort__btn" for="sort-${sortType}">${titleString(sortType)}</label>
    </div>`
  );
}

function createSortTemplate(sortOptions) {
  const sortItemsTemplate = sortOptions
    .map(({type, isActive}, idx) => createSortItemTemplate(type, isActive, idx === 0))
    .join('');

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItemsTemplate}
    </form>`
  );
}

export default class SortView extends AbstractView {
  #sortOptions = null;

  constructor({sortOptions}) {
    super();

    this.#sortOptions = sortOptions;
  }

  get template() {
    return createSortTemplate(this.#sortOptions);
  }
}
