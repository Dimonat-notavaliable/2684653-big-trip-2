import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';
import { isEscapeKey } from '../utils/common.js';
import { remove, render, replace } from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';

/**
 * @enum {string} Возможные состояния карточки события
 */
const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class EventPresenter {
  #event = null;
  #mode = Mode.DEFAULT;

  #eventContainer = null;
  #eventModel = null;

  #eventComponent = null;
  #eventEditComponent = null;

  #handleDataChange = null;
  #handleModeChange = null;

  constructor({eventContainer, eventModel, onDataChange, onModeChange}) {
    this.#eventContainer = eventContainer;
    this.#eventModel = eventModel;

    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(event) {
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new EventView({
      event: this.#event,
      offers: this.#eventModel.getEventOffers(event),
      destination: this.#eventModel.getEventDestination(event),
      onRollupClick: this.#handleRowRollupClick,
      onFavoriteClick: this.#handleFavouriteClick
    });

    this.#eventEditComponent = new EventEditView({
      event,
      offers: this.#eventModel.offers,
      destinations: this.#eventModel.destinations,
      onRollupClick: this.#handleFormRollupClick,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick
    });

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#eventContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToRow();
    }
  }

  #replaceRowToForm() {
    replace(this.#eventEditComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);

    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToRow() {
    replace(this.#eventComponent, this.#eventEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);

    this.#mode = Mode.DEFAULT;
  }

  #handleRowRollupClick = () => {
    this.#replaceRowToForm();
  };

  #handleFormRollupClick = () => {
    this.#replaceFormToRow();
  };

  #handleFavouriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      UpdateType.PATCH,
      {...this.#event, isFavorite: !this.#event.isFavorite}
    );
  };

  #handleDeleteClick = (event) => {
    this.#handleDataChange(
      UserAction.DELETE_EVENT,
      UpdateType.MINOR,
      event
    );
  };

  #handleFormSubmit = (updated) => {
    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      UpdateType.MINOR,
      updated
    );
    this.#replaceFormToRow();
  };

  #escKeyDownHandler = (evt) => {
    if(isEscapeKey(evt)) {
      evt.preventDefault();
      this.#eventEditComponent.reset(this.#event);
      this.#replaceFormToRow();
    }
  };
}
