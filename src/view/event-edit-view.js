import { createElement } from '../render.js';
import { EVENT_TYPES, DateFormat } from '../const.js';
import { titleString, humanizeDate, getOfferSlug, getTypeOffers } from '../utils.js';

const BLANK_EVENT = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: '',
  isFavorite: false,
  offers: [],
  type: 'flight'
};

function createEventEditTypeTemplate(eventId, eventType) {
  return (

    `<div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-${eventId}">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${eventId}" type="checkbox">
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${EVENT_TYPES.map((type) => `<div class="event__type-item">
            <input id="event-type-${type}-${eventId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${(type === eventType) ? 'checked' : ''}>
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
      <input class="event__input  event__input--destination" id="event-destination-${eventId}" type="text" name="event-destination" value="${destinationName || ''}" list="destination-list-${eventId}">
      <datalist id="destination-list-${eventId}">
        ${destinations.map(({name}) => `<option value="${name}"></option>`)}
      </datalist>
    </div>`
  );
}

function createEventEditOffersTemplate(eventId, eventOffers, typeOffers) {
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${typeOffers.map(({id, title, price}) => `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${getOfferSlug(title)}-${eventId}" type="checkbox" name="event-offer-${getOfferSlug(title)}" ${eventOffers.some((offerId) => offerId === id) ? 'checked' : ''}>
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

function createEventEditTemplate(event, offers, destinations) {
  const {id: eventId, basePrice, dateFrom, dateTo, type, offers: selectedOffers, destination: destinationId} = event;
  const selectedDestination = destinations.find(({id}) => id === destinationId);

  const {name, description} = selectedDestination || {};

  const startDateTime = humanizeDate(dateFrom ? new Date(dateFrom) : new Date(), DateFormat.FORM);
  const endDateTime = humanizeDate(dateTo ? new Date(dateTo) : new Date(), DateFormat.FORM);

  const editTypeElement = createEventEditTypeTemplate(eventId, type);
  const editDestinationElement = createEventEditDestinationTemplate(eventId, type, name, destinations);
  const editOffersElement = createEventEditOffersTemplate(eventId, selectedOffers, getTypeOffers(type, offers));

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${editTypeElement}
          ${editDestinationElement}

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${eventId}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${eventId}" type="text" name="event-start-time" value="${startDateTime}">
            —
            <label class="visually-hidden" for="event-end-time-${eventId}">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${eventId}" type="text" name="event-end-time" value="${endDateTime}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${eventId}">
              <span class="visually-hidden">Price</span>
              €
            </label>
            <input class="event__input  event__input--price" id="event-price-${eventId}" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${editOffersElement}
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description || ''}</p>
          </section>
        </section>
      </form>
    </li>`
  );
}

export default class EventEditView {
  constructor({event = BLANK_EVENT, offers, destinations}) {
    this.event = event;
    this.offers = offers;
    this.destinations = destinations;
  }

  getTemplate() {
    return createEventEditTemplate(this.event, this.offers, this.destinations);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement(){
    this.element = null;
  }
}
