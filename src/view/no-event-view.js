import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

const NoEventsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no Future events',
  [FilterType.PRESENT]: 'There are no Present events',
  [FilterType.PAST]: 'There are no Past events',
};

function createNoEventTemplate(filterType) {
  return (`<p class="trip-events__msg">${NoEventsTextType[filterType]}</p>`);
}

export default class NoEventView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();

    this.#filterType = filterType;
  }

  get template() {
    return createNoEventTemplate(this.#filterType);
  }
}
