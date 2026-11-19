import EventModel from './model/event-model.js';
import TripInfoView from './view/trip-info-view.js';
import EventsListPresenter from './presenter/events-list-presenter.js';

import { render, RenderPosition } from './framework/render.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

const siteTripMainElement = document.querySelector('.trip-main');
const siteFiltersElement = siteTripMainElement.querySelector('.trip-controls__filters');
const siteEventsElement = document.querySelector('.trip-events');

const eventModel = new EventModel();
const filterModel = new FilterModel();

const eventsListPresenter = new EventsListPresenter({
  eventsListContaier: siteEventsElement,
  eventModel,
  filterModel
});

const filterPresenter = new FilterPresenter({
  filterContainer: siteFiltersElement,
  filterModel,
  eventModel
});

render(new TripInfoView(), siteTripMainElement, RenderPosition.AFTERBEGIN);

filterPresenter.init();
eventsListPresenter.init();
