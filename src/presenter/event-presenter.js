import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';
import { isEscapeKey } from '../utils.js';
import { render, replace } from '../framework/render.js';

export default class EventPresenter {
  #eventContainer = null;
  #eventModel = null;

  #eventComponent = null;
  #eventEditComponent = null;

  constructor({eventContainer, eventModel}) {
    this.#eventContainer = eventContainer;
    this.#eventModel = eventModel;
  }

  init(event) {
    this.#eventComponent = new EventView({
      event,
      offers: this.#eventModel.getEventOffers(event),
      destination: this.#eventModel.getEventDestination(event),
      onRollupClick: () => {
        this.#replaceRowToForm();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      }
    });

    this.#eventEditComponent = new EventEditView({
      event,
      offers: this.#eventModel.offers,
      destinations: this.#eventModel.destinations,
      onRollupClick: () => {
        this.#replaceFormToRow();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      },
      onFormSubmit: () => {
        this.#replaceFormToRow();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      }
    });

    render(this.#eventComponent, this.#eventContainer);
  }

  #replaceRowToForm() {
    replace(this.#eventEditComponent, this.#eventComponent);
  }

  #replaceFormToRow() {
    replace(this.#eventComponent, this.#eventEditComponent);
  }

  #escKeyDownHandler = (evt) => {
    if(isEscapeKey(evt)) {
      evt.preventDefault();
      this.#replaceFormToRow();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };
}
