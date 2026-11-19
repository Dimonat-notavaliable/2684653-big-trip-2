import EventListView from '../view/event-list-view.js';
import EventPresenter from './event-presenter.js';
import SortPresenter from './sort-presenter.js';
import { render, remove } from '../framework/render.js';
import NoEventView from '../view/no-event-view.js';
import { eventSort } from '../utils/sort.js';
import { SortType, UserAction, UpdateType } from '../const.js';
import { filter } from '../utils/filter.js';

export default class EventsListPresenter {
  #eventsListContainer = null;
  #eventModel = null;
  #filterModel = null;

  #sortPresenter = null;
  #currentSortType = SortType.DAY;

  #eventsListComponent = new EventListView();
  #noEventsComponent = new NoEventView();

  #eventPresenters = new Map();

  constructor ({eventsListContaier, eventModel, filterModel}) {
    this.#eventsListContainer = eventsListContaier;
    this.#eventModel = eventModel;
    this.#filterModel = filterModel;

    this.#eventModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    const filterType = this.#filterModel.filter;
    const events = this.#eventModel.events;
    const filteredEvents = filter[filterType](events);

    const sortFunc = eventSort[this.#currentSortType];
    if (sortFunc) {
      return filteredEvents.sort(sortFunc);
    }
    return filteredEvents;
  }

  init() {
    this.#renderEventsList();
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, updated) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventModel.updateEvent(updateType, updated);
        break;
      case UserAction.ADD_EVENT:
        this.#eventModel.addEvent(updateType, updated);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventModel.deleteEvent(updateType, updated);
        break;
    }
  };

  #handleModelEvent = (updateType, updated) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(updated.id).init(updated);
        break;
      case UpdateType.MINOR:
        this.#clearEventsList();
        this.#renderEventsList();
        break;
      case UpdateType.MAJOR:
        this.#clearEventsList({resetSortType: true});
        this.#renderEventsList();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#clearEventsList();
    this.#renderEventsList({resetSortType: true});
  };

  #renderSort() {
    this.#sortPresenter = new SortPresenter({
      sortContainer: this.#eventsListComponent.element,
      onDataChange: this.#handleSortTypeChange
    });

    this.#sortPresenter.init(this.#currentSortType);
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      eventContainer: this.#eventsListComponent.element,
      eventModel: this.#eventModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #renderEvents(events) {
    events.forEach((event) => this.#renderEvent(event));
  }

  #renderNoEvents() {
    render(this.#noEventsComponent, this.#eventsListContainer);
  }

  #clearEventsList({resetSortType = false} = {}) {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    this.#sortPresenter.destroy();
    this.#sortPresenter = null;

    remove(this.#noEventsComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderEventsList() {
    if (this.events.length === 0) {
      this.#renderNoEvents();
      return;
    }

    render(this.#eventsListComponent, this.#eventsListContainer);

    this.#renderSort();
    this.#renderEvents(this.events);
  }
}
