import EventModel from './model/event-model.js';
import FilterView from './view/filter-view.js';
import TripInfoView from './view/trip-info-view.js';
import EventsListPresenter from './presenter/events-list-presenter.js';

import { render, RenderPosition } from './framework/render.js';
import { generateFilter } from './mock/filter.js';

const siteTripMainElement = document.querySelector('.trip-main');
const siteFiltersElement = siteTripMainElement.querySelector('.trip-controls__filters');
const siteEventsElement = document.querySelector('.trip-events');
const eventModel = new EventModel();
const eventsListPresenter = new EventsListPresenter({
  eventsListContaier: siteEventsElement,
  eventModel
});

const filters = generateFilter(eventModel.events);

render(new TripInfoView(), siteTripMainElement, RenderPosition.AFTERBEGIN);
render(new FilterView({filters}), siteFiltersElement);

eventsListPresenter.init();
