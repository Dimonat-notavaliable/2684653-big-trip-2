import EventListView from '../view/event-list-view.js';
import EventPresenter from './event-presenter.js';
import SortPresenter from './sort-presenter.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import NoEventView from '../view/no-event-view.js';
import { eventSort } from '../utils/sort.js';
import { SortType, UserAction, UpdateType, FilterType } from '../const.js';
import { filter } from '../utils/filter.js';
import NewEventPresenter from './new-event-presenter.js';
import LoadingView from '../view/loading-view.js';

export default class EventsListPresenter {
  #eventsListContainer = null;
  #eventModel = null;
  #filterModel = null;

  #sortPresenter = null;
  #currentSortType = SortType.DAY;

  #eventsListComponent = new EventListView();
  #noEventsComponent = null;

  #newEventPresenter = null;

  #eventPresenters = new Map();

  #isLoading = true;
  #loadingComponent = new LoadingView();

  constructor ({eventsListContaier, eventModel, filterModel, onNewEventDestroy}) {
    this.#eventsListContainer = eventsListContaier;
    this.#eventModel = eventModel;
    this.#filterModel = filterModel;

    this.#newEventPresenter = new NewEventPresenter({
      newEventContainer: this.#eventsListComponent.element,
      eventModel: this.#eventModel,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewEventDestroy
    });

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

  openNewEventForm() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newEventPresenter.init();
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
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
      sortFollower: this.#eventsListComponent.element,
      onDataChange: this.#handleSortTypeChange
    });

    this.#sortPresenter.init(this.#currentSortType);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#eventsListContainer, RenderPosition.AFTERBEGIN);
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
    const filterType = this.#filterModel.filter;

    this.#noEventsComponent = new NoEventView({
      filterType
    });

    render(this.#noEventsComponent, this.#eventsListContainer);
  }

  #clearEventsList({resetSortType = false} = {}) {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    this.#sortPresenter.destroy();
    this.#sortPresenter = null;

    remove(this.#noEventsComponent);
    remove(this.#loadingComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderEventsList() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.events.length === 0) {
      this.#renderNoEvents();
      return;
    }

    render(this.#eventsListComponent, this.#eventsListContainer);

    this.#renderSort();
    this.#renderEvents(this.events);
  }
}
