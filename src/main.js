import EventModel from './model/event-model.js';
import TripInfoView from './view/trip-info-view.js';
import EventsListPresenter from './presenter/events-list-presenter.js';

import { render, RenderPosition } from './framework/render.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewEventButtonView from './view/new-event-button-view.js';

const siteTripMainElement = document.querySelector('.trip-main');
const siteFiltersElement = siteTripMainElement.querySelector('.trip-controls__filters');
const siteEventsElement = document.querySelector('.trip-events');

const eventModel = new EventModel();
const filterModel = new FilterModel();

const eventsListPresenter = new EventsListPresenter({
  eventsListContaier: siteEventsElement,
  eventModel,
  filterModel,
  onNewEventDestroy: handleNewEventFormClose
});

const filterPresenter = new FilterPresenter({
  filterContainer: siteFiltersElement,
  filterModel,
  eventModel
});

const newEventButtonComponent = new NewEventButtonView({
  onClick: handleNewEventFormOpen
});

render(new TripInfoView(), siteTripMainElement, RenderPosition.AFTERBEGIN);
render(newEventButtonComponent, siteTripMainElement);

filterPresenter.init();
eventsListPresenter.init();

function handleNewEventFormOpen() {
  eventsListPresenter.openNewEventForm();
  newEventButtonComponent.element.disabled = true;
}

function handleNewEventFormClose() {
  newEventButtonComponent.element.disabled = false;
}
