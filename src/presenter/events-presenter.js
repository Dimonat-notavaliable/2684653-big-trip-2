import EventEditView from '../view/event-edit-view.js';
import EventListView from '../view/event-list-view.js';
import EventView from '../view/event-view.js';
import SortView from '../view/sort-view.js';
import { render } from '../render.js';
import { getEventOffers, getEventDestination } from '../mock/event.js';

export default class EventsListPresenter {
  eventsListComponent = new EventListView();

  constructor ({eventsListContaier, eventModel}) {
    this.eventsListContainer = eventsListContaier;
    this.eventModel = eventModel;
  }

  init() {
    this.listEvents = [...this.eventModel.getEvents()];

    render(this.eventsListComponent, this.eventsListContainer);

    render(new SortView(), this.eventsListComponent.getElement());
    render(
      new EventEditView({
        event: this.listEvents[0],
        destination: getEventDestination(this.listEvents[0])
      }),
      this.eventsListComponent.getElement()
    );

    for (let i = 1; i < this.listEvents.length; i++) {
      const currentEvent = this.listEvents[i];
      render(
        new EventView({
          event: currentEvent,
          offers: getEventOffers(currentEvent.type),
          destination: getEventDestination(currentEvent)
        }),
        this.eventsListComponent.getElement()
      );
    }
  }
}
