import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import EventPresenter from './event-presenter.js';
import { render } from '../framework/render.js';
import { generateSort } from '../mock/sort.js';
import NoEventView from '../view/no-event-view.js';
import { updateItem } from '../utils/common.js';

export default class EventsListPresenter {
  #eventsListContainer = null;
  #eventModel = null;

  #sortOptions = null;
  #sortComponent = null;

  #eventsListComponent = new EventListView();
  #noEventsComponent = new NoEventView();

  #listEvents = [];
  #eventPresenters = new Map();

  constructor ({eventsListContaier, eventModel}) {
    this.#eventsListContainer = eventsListContaier;
    this.#eventModel = eventModel;
  }

  init() {
    this.#listEvents = [...this.#eventModel.events];
    this.#sortOptions = generateSort();

    this.#renderEventsList();
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleEventChange = (updatedEvent) => {
    this.#listEvents = updateItem(this.#listEvents, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #renderSort() {
    this.#sortComponent = new SortView({sortOptions: this.#sortOptions});

    render(this.#sortComponent, this.#eventsListComponent.element);
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      eventContainer: this.#eventsListComponent.element,
      eventModel: this.#eventModel,
      onDataChange: this.#handleEventChange,
      onModeChange: this.#handleModeChange
    });

    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #renderEvents() {
    this.#listEvents.forEach((event) => this.#renderEvent(event));
  }

  #clearEvents() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #renderNoEvents() {
    render(this.#noEventsComponent, this.#eventsListContainer);
  }

  #renderEventsList() {
    if (this.#listEvents.length === 0) {
      this.#renderNoEvents();
      return;
    }

    render(this.#eventsListComponent, this.#eventsListContainer);

    this.#renderSort();
    this.#renderEvents();
  }
}
