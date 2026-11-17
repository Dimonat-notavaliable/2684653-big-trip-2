import EventListView from '../view/event-list-view.js';
import EventPresenter from './event-presenter.js';
import SortPresenter from './sort-presenter.js';
import { render } from '../framework/render.js';
import NoEventView from '../view/no-event-view.js';
import { updateItem } from '../utils/common.js';
import { eventSort } from '../utils/sort.js';
import { SortType } from '../const.js';

export default class EventsListPresenter {
  #eventsListContainer = null;
  #eventModel = null;

  #sortComponent = null;
  #currentSortType = SortType.DAY;

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

    this.#renderEventsList();
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleEventChange = (updatedEvent) => {
    this.#listEvents = updateItem(this.#listEvents, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #sortEvents(sortType) {
    const sortFunc = eventSort[sortType];
    if (sortFunc) {
      this.#listEvents.sort(sortFunc);
    } else {
      this.#listEvents.sort(eventSort[SortType.DAY]);
    }
    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortEvents(sortType);

    this.#clearEvents();
    this.#renderEvents();
    this.#sortComponent.init(this.#currentSortType);
  };

  #renderSort() {
    this.#sortComponent = new SortPresenter({
      sortContainer: this.#eventsListComponent.element,
      onDataChange: this.#handleSortTypeChange
    });

    this.#sortComponent.init(this.#currentSortType);
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
