import EventModel from './model/event-model.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import EventsListPresenter from './presenter/events-list-presenter.js';

import { render } from './framework/render.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewEventButtonView from './view/new-event-button-view.js';
import EventsApiService from './api/events-api-service.js';

const siteTripMainElement = document.querySelector('.trip-main');
const siteFiltersElement = siteTripMainElement.querySelector('.trip-controls__filters');
const siteEventsElement = document.querySelector('.trip-events');

const AUTHORIZATION = 'Basic RGltb25hdDpRd2VydHl1aW8=';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const eventModel = new EventModel({
  apiService: new EventsApiService(END_POINT, AUTHORIZATION)
});
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

const tripInfoPresenter = new TripInfoPresenter({
  tripInfoContainer: siteTripMainElement,
  eventModel
});

const newEventButtonComponent = new NewEventButtonView({
  onClick: handleNewEventFormOpen
});

filterPresenter.init();
tripInfoPresenter.init();
eventsListPresenter.init();
eventModel.init()
  .finally(() => {
    render(newEventButtonComponent, siteTripMainElement);
  });


function handleNewEventFormOpen() {
  eventsListPresenter.openNewEventForm();
  newEventButtonComponent.element.disabled = true;
}

function handleNewEventFormClose() {
  newEventButtonComponent.element.disabled = false;
}
