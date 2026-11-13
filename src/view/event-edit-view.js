import { createElement } from '../render.js';
import { getTypeOffers, DESTINATIONS, getOfferSlug} from '../mock/event.js';
import { EVENT_TYPES } from '../const.js';
import { titleString, formatFormTime } from '../utils.js';

const BLANK_EVENT = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: '',
  isFavorite: false,
  offers: [],
  type: 'flight'
};

function createEventEditTypeTemplate(eventType) {
  return (

    `<div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${EVENT_TYPES.map((type) => `<div class="event__type-item">
            <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${(type === eventType) ? 'checked' : ''}>
            <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${titleString(type)}</label>
          </div>`).join('')}
        </fieldset>
      </div>
    </div>`
  );
}

function createEventEditDestinationTemplate(eventType, destinationName) {
  return (
    `<div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${titleString(eventType)}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName ?? ''}" list="destination-list-1">
      <datalist id="destination-list-1">
        ${DESTINATIONS.map(({name}) => `<option value="${name}"></option>`)}
      </datalist>
    </div>`
  );
}

function createEventEditOffersTemplate(eventType, eventOffers) {
  const typeOffers = getTypeOffers(eventType);
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${typeOffers.map(({id, title, price}) => `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${getOfferSlug(title)}-1" type="checkbox" name="event-offer-${getOfferSlug(title)}" ${eventOffers.some((offerId) => offerId === id) ? 'checked' : ''}>
          <label class="event__offer-label" for="event-offer-${getOfferSlug(title)}-1">
            <span class="event__offer-title">${title}</span>
            +€&nbsp;
            <span class="event__offer-price">${price}</span>
          </label>
        </div>`).join('')}
      </div>
    </section>`
  );
}

function createEventEditTemplate(event, destination) {
  const {basePrice, dateFrom, dateTo, type, offers} = event;
  const {name, description} = destination;

  const startDateTime = formatFormTime(dateFrom ? new Date(dateFrom) : dateFrom);
  const endDateTime = formatFormTime(dateTo ? new Date (dateTo) : dateTo);

  const editTypeElement = createEventEditTypeTemplate(type);
  const editDestinationElement = createEventEditDestinationTemplate(type, name);
  const editOffersElement = createEventEditOffersTemplate(type, offers);

  return (
    `   <li class="trip-events__item">
           <form class="event event--edit" action="#" method="post">
              <header class="event__header">
                ${editTypeElement}
                ${editDestinationElement}

                <div class="event__field-group  event__field-group--time">
                  <label class="visually-hidden" for="event-start-time-1">From</label>
                  <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDateTime}">
                  —
                  <label class="visually-hidden" for="event-end-time-1">To</label>
                  <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDateTime}">
                </div>

                <div class="event__field-group  event__field-group--price">
                  <label class="event__label" for="event-price-1">
                    <span class="visually-hidden">Price</span>
                    €
                  </label>
                  <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
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
                  <p class="event__destination-description">${description}</p>
                </section>
              </section>
            </form>
          </li>
    `
  );
}

export default class EventEditView {
  constructor({event = BLANK_EVENT, destination = {}}) {
    this.event = event;
    this.destination = destination;
  }

  getTemplate() {
    return createEventEditTemplate(this.event, this.destination);
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
