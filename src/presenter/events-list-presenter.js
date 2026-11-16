import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import EventPresenter from './event-presenter.js';
import { render } from '../framework/render.js';
import { generateSort } from '../mock/sort.js';

export default class EventsListPresenter {
  #eventsListContainer = null;
  #eventModel = null;
  #sortOptions = null;

  #eventsListComponent = new EventListView();

  #listEvents = [];

  constructor ({eventsListContaier, eventModel}) {
    this.#eventsListContainer = eventsListContaier;
    this.#eventModel = eventModel;
  }

  init() {
    this.#listEvents = [...this.#eventModel.events];
    this.#sortOptions = generateSort();

    render(this.#eventsListComponent, this.#eventsListContainer);

    render(new SortView({sortOptions: this.#sortOptions}), this.#eventsListComponent.element);

    for (let i = 0; i < this.#listEvents.length; i++) {
      const eventPresenter = new EventPresenter({
        eventContainer: this.#eventsListComponent.element,
        eventModel: this.#eventModel
      });
      eventPresenter.init(this.#listEvents[i]);
    }
  }
}
