import EventEditView from '../view/event-edit-view.js';
import EventListView from '../view/event-list-view.js';
import EventView from '../view/event-view.js';
import SortView from '../view/sort-view.js';
import { render } from '../render.js';

export default class EventsListPresenter {
  eventsListComponent = new EventListView();

  constructor ({eventsListContaier}) {
    this.eventsListContainer = eventsListContaier;
  }

  init() {
    render(this.eventsListComponent, this.eventsListContainer);

    render(new SortView(), this.eventsListComponent.getElement());
    render(new EventEditView(), this.eventsListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventView(), this.eventsListComponent.getElement());
    }
  }
}
