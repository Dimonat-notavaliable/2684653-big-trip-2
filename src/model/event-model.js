import { getRandomEvent } from '../mock/event.js';
import { mockDestinations } from '../mock/destinations.js';
import { mockOffers } from '../mock/offers.js';
import { getTypeOffers } from '../utils.js';

const EVENT_COUNT = 4;

export default class EventModel {
  #events = null;
  #offers = null;
  #destinations = null;

  constructor () {
    this.#events = Array.from({length: EVENT_COUNT}, getRandomEvent);
    this.#offers = mockOffers;
    this.#destinations = mockDestinations;
  }

  get events() {
    return this.#events;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  getEventOffers(event) {
    return getTypeOffers(event.type, this.#offers).filter(({id}) => event.offers.indexOf(id) !== -1);
  }

  getEventDestination(event) {
    return this.#destinations.find(({id}) => id === event.destination);
  }
}
