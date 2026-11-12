import FilterView from './view/filter-view.js';
import TripInfoView from './view/trip-info-view.js';
import { render, RenderPosition } from './render.js';
import EventsListPresenter from './presenter/events-presenter.js';

const siteTripMainElement = document.querySelector('.trip-main');
const siteFiltersElement = siteTripMainElement.querySelector('.trip-controls__filters');
const siteEventsElement = document.querySelector('.trip-events');
const eventsListPresenter = new EventsListPresenter({eventsListContaier: siteEventsElement});

render(new TripInfoView(), siteTripMainElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), siteFiltersElement);

eventsListPresenter.init();
