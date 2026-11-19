import EventEditView from '../view/event-edit-view.js';
import { isEscapeKey } from '../utils/common.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';
import { nanoid } from 'nanoid';


export default class NewEventPresenter {
  #newEventContainer = null;
  #eventModel = null;

  #eventEditComponent = null;

  #handleDataChange = null;
  #handleDestroy = null;

  constructor({newEventContainer, eventModel, onDataChange, onDestroy}) {
    this.#newEventContainer = newEventContainer;
    this.#eventModel = eventModel;

    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#eventEditComponent !== null) {
      return;
    }

    this.#eventEditComponent = new EventEditView({
      offers: this.#eventModel.offers,
      destinations: this.#eventModel.destinations,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick
    });

    render(this.#eventEditComponent, this.#newEventContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#eventEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#eventEditComponent);
    this.#eventEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (newTask) => {
    this.#handleDataChange(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      {...newTask, id: nanoid()}
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if(isEscapeKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };
}
