import AbstractView from '../framework/view/abstract-view.js';
import { titleString } from '../utils/common.js';

function createFilterItemTemplate(filter, isActive, isChecked) {
  return (`<div class="trip-filters__filter">
    <input
      id="filter-${filter}"
      class="trip-filters__filter-input  visually-hidden"
      type="radio"
      name="trip-filter"
      value="${filter}"
      ${isChecked ? 'checked' : ''}
      ${isActive ? '' : 'disabled'}
    >
    <label class="trip-filters__filter-label" for="filter-${filter}">${titleString(filter)}</label>
  </div>`);
}

function createFilterTemplate(filters) {
  const filterItemsTemplate = Object.values(filters)
    .map(({type, isActive}, idx) => createFilterItemTemplate(type, isActive, idx === 0))
    .join('');

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FilterView extends AbstractView {
  #filters = null;

  constructor({filters}) {
    super();

    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
