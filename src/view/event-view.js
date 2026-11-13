import { createElement } from '../render.js';
import { titleString, humanizeEventDate, humanizeEventTime, calcEventDuration } from '../utils.js';

function createEventOffersTemplate(offers) {
  return (
    `${offers ? `<ul class="event__selected-offers">
      ${offers.map(({title, price}) => `<li class="event__offer">
        <span class="event__offer-title">${title}</span>
        +€&nbsp;
        <span class="event__offer-price">${price}</span>
      </li>`).join('')}
    </ul>` : ''}`
  );
}

function createEventTemplate(event, offers, destination) {
  const {type, basePrice, dateFrom, dateTo, isFavorite} = event;

  const startDay = dateFrom.split('T')[0];

  const startDateTime = new Date(dateFrom);
  const endDateTime = new Date (dateTo);

  const startDate = humanizeEventDate(startDateTime);
  const endDate = humanizeEventDate(endDateTime);

  const startTime = humanizeEventTime(startDateTime);
  const endTime = humanizeEventTime(endDateTime);
  const eventDuration = calcEventDuration(startDateTime, endDateTime);

  const eventDate = (startDate === endDate) ? startDate : `${startDate}`;

  const selectedOffers = createEventOffersTemplate(offers);

  const favoriteClassName = isFavorite
    ? 'event__favorite-btn event__favorite-btn--active'
    : 'event__favorite-btn';

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${startDay}">${eventDate}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${titleString(type)} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom}">${startTime}</time>
            —
            <time class="event__end-time" datetime="${dateTo}">${endTime}</time>
          </p>
          <p class="event__duration">${eventDuration}</p>
        </div>
        <p class="event__price">
          €&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        ${selectedOffers}
        <button class="${favoriteClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
}

export default class EventView {
  constructor({event, offers, destination}) {
    this.event = event;
    this.offers = offers;
    this.destination = destination;
  }

  getTemplate() {
    return createEventTemplate(this.event, this.offers, this.destination);
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
