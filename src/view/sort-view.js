import AbstractView from '../framework/view/abstract-view.js';
import { titleString } from '../utils/common.js';

function createSortItemTemplate(sortType, isActive, isChecked) {
  return (
    `<div class="trip-sort__item  trip-sort__item--${sortType}">
      <input
        id="sort-${sortType}" class="trip-sort__input  visually-hidden"
        type="radio" name="trip-sort" value="sort-${sortType}"
        ${isChecked ? 'checked' : ''} ${isActive ? '' : 'disabled'}
        data-sort-type=${sortType}>
      <label class="trip-sort__btn" for="sort-${sortType}">${titleString(sortType)}</label>
    </div>`
  );
}

function createSortTemplate(selectedOption, sortOptions) {
  const sortItemsTemplate = sortOptions
    .map(({type, isActive}) => createSortItemTemplate(type, isActive, type === selectedOption))
    .join('');

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItemsTemplate}
    </form>`
  );
}

export default class SortView extends AbstractView {
  #sortOptions = null;
  #selectedOption = null;

  #handleSortTypeChange = null;

  constructor({selectedOption, sortOptions, onSortTypeChange}) {
    super();

    this.#selectedOption = selectedOption;
    this.#sortOptions = sortOptions;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#selectedOption, this.#sortOptions);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
