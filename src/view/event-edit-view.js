import { EVENT_TYPES, DateFormat } from '../const.js';
import { titleString, humanizeDate } from '../utils/common.js';
import { getOfferSlug, getTypeOffers } from '../utils/offer.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const FLATPICKR_FORMAT = 'd/m/y H:i';

const BLANK_EVENT = {
  basePrice: 0,
  dateFrom: new Date().toISOString(),
  dateTo: new Date().toISOString(),
  destination: null,
  isFavorite: false,
  offers: [],
  type: 'flight'
};

function createEventEditTypeTemplate(eventId, eventType, isDisabled) {
  return (

    `<div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-${eventId}">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${eventId}" type="checkbox" ${isDisabled ? 'disabled' : ''}>
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${EVENT_TYPES.map((type) => `<div class="event__type-item">
            <input
              id="event-type-${type}-${eventId}" class="event__type-input  visually-hidden"
              type="radio" name="event-type" value="${type}"
              ${(type === eventType) ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}
            >
            <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${eventId}">${titleString(type)}</label>
          </div>`).join('')}
        </fieldset>
      </div>
    </div>`
  );
}

function createEventEditDestinationTemplate(eventId, eventType, destinationName, destinations) {
  return (
    `<div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-${eventId}">
        ${titleString(eventType)}
      </label>
      <select class="event__input  event__input--destination" id="event-destination-${eventId}" name="event-destination" required>
        <option style="display: none" disabled ${destinationName ? '' : 'selected'} value> -- select destination -- </option>
        ${destinations.map(({name}) => `<option value="${name}" ${name === destinationName ? 'selected' : ''}>${name}</option>`).join('')}
      </select>
    </div>`
  );
}

function createEventEditOffersTemplate(eventId, eventOffers, typeOffers, isDisabled) {
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${typeOffers.map(({id, title, price}) => `<div class="event__offer-selector">
          <input
            class="event__offer-checkbox  visually-hidden"
            id="event-offer-${getOfferSlug(title)}-${eventId}"
            type="checkbox" name="event-offer-${getOfferSlug(title)}"
            data-offer-id=${id}
            ${eventOffers.some((offerId) => offerId === id) ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}
          >
          <label class="event__offer-label" for="event-offer-${getOfferSlug(title)}-${eventId}">
            <span class="event__offer-title">${title}</span>
            +€&nbsp;
            <span class="event__offer-price">${price}</span>
          </label>
        </div>`).join('')}
      </div>
    </section>`
  );
}

function createDestinationInfoTemplate(destinationDescription, photos) {
  photos = photos ?? [];

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destinationDescription || ''}</p>
      ${photos.length > 0 ? `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${photos.map(({src, description}) => `<img class="event__photo" src="${src}" alt="${description}">`).join('')}
        </div>
      </div>` : ''}
    </section>`
  );

}

function createEventEditTemplate(event, offers, destinations) {
  const {
    id: eventId, basePrice,
    dateFrom, dateTo,
    type, offers: selectedOffers, destination: destinationId,
    isDisabled,
    isDeleting,
    isSaving
  } = event;
  const selectedDestination = destinations.find(({id}) => id === destinationId);

  const {name, description, pictures} = selectedDestination || {};

  const startDateTime = humanizeDate(dateFrom ? new Date(dateFrom) : new Date(), DateFormat.FORM);
  const endDateTime = humanizeDate(dateTo ? new Date(dateTo) : new Date(), DateFormat.FORM);

  const editTypeElement = createEventEditTypeTemplate(eventId, type, isDisabled);
  const editDestinationElement = createEventEditDestinationTemplate(eventId, type, name, destinations);
  const editOffersElement = createEventEditOffersTemplate(eventId, selectedOffers, getTypeOffers(type, offers), isDisabled);

  const destinationInfoElement = createDestinationInfoTemplate(description, pictures);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${editTypeElement}
          ${editDestinationElement}

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${eventId}">From</label>
            <input
              class="event__input  event__input--time" id="event-start-time-${eventId}"
              type="text" name="event-start-time" value="${startDateTime}"
              required ${isDisabled ? 'disabled' : ''}
            >
            —
            <label class="visually-hidden" for="event-end-time-${eventId}">To</label>
            <input
              class="event__input  event__input--time" id="event-end-time-${eventId}"
              type="text" name="event-end-time" value="${endDateTime}"
              required ${isDisabled ? 'disabled' : ''}
            >
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${eventId}">
              <span class="visually-hidden">Price</span>
              €
            </label>
            <input
              class="event__input  event__input--price"
              id="event-price-${eventId}" name="event-price"
              value="${basePrice}" type="number"
              required ${isDisabled ? 'disabled' : ''}
            >
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
          <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
          <button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}>
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${editOffersElement}
          ${destinationInfoElement}
        </section>
      </form>
    </li>`
  );
}

export default class EventEditView extends AbstractStatefulView {
  #offers = null;
  #destinations = null;

  #handleRollupClick = null;
  #handleFormSubmit = null;
  #handleDeleteClick = null;

  #dateFromPicker = null;
  #dateToPicker = null;

  constructor({event = BLANK_EVENT, offers, destinations, onRollupClick, onFormSubmit, onDeleteClick}) {
    super();

    this._setState(EventEditView.parseEventToState(event));
    this.#offers = offers;
    this.#destinations = destinations;

    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupClick = onRollupClick;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();
  }

  get template() {
    return createEventEditTemplate(this._state, this.#offers, this.#destinations);
  }

  reset(event) {
    this.updateElement(
      EventEditView.parseEventToState(event)
    );
  }

  _restoreHandlers() {
    this.#setDatePickers();

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupClickHandler);
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);

    this.element.querySelector('.event__type-group').addEventListener('input', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceChangeHandler);
    this.element.querySelectorAll('.event__offer-checkbox').forEach(
      (checkbox) => {
        checkbox.addEventListener('input', this.#offerChangeHandler);
      }
    );
  }

  #setDatePickers() {
    const startDate = new Date(this._state.dateFrom);
    const endDate = new Date(this._state.dateTo);

    this.#dateFromPicker = flatpickr(
      this.element.querySelector('input[name="event-start-time"]'),
      {
        enableTime: true,
        dateFormat: FLATPICKR_FORMAT,
        defaultDate: startDate,
        maxDate: endDate,
        onChange: this.#dateFromChangeHandler
      }
    );

    this.#dateToPicker = flatpickr(
      this.element.querySelector('input[name="event-end-time"]'),
      {
        enableTime: true,
        dateFormat: FLATPICKR_FORMAT,
        defaultDate: endDate,
        minDate: startDate,
        onChange: this.#dateToChangeHandler
      }
    );
  }

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this.updateElement({
      type: evt.target.value, offers: []
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      destination: this.#destinations.find(({name}) => name === evt.target.value)?.id
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: parseInt(evt.target.value, 10)
    });
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();
    const offerId = evt.target.dataset.offerId;
    if (evt.target.checked) {
      this._setState({
        offers: [...this._state.offers, offerId]
      });
    } else {
      this._setState({
        offers: this._state.offers.filter((offer) => offer !== offerId)
      });
    }
  };

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupClick();
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EventEditView.parseStateToEvent(this._state));
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EventEditView.parseStateToEvent(this._state));
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.#dateToPicker.set('minDate', userDate);
    this._setState({
      dateFrom: userDate.toISOString()
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.#dateFromPicker.set('maxDate', userDate);
    this._setState({
      dateTo: userDate.toISOString()
    });
  };

  static parseEventToState(event) {
    return {
      ...event,
      isDisabled: false,
      isSaving: false,
      isDeleting: false
    };
  }

  static parseStateToEvent(state) {
    const event = {...state};

    delete event.isDisabled;
    delete event.isSaving;
    delete event.isDeleting;

    return event;
  }
}
