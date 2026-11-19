import { mockDestinations } from '../mock/destinations.js';
import { mockOffers } from '../mock/offers.js';
import { getTypeOffers } from '../utils/offer.js';
import { mockEvents } from '../mock/event.js';
import Observable from '../framework/observable.js';

export default class EventModel extends Observable {
  #events = mockEvents;
  #offers = mockOffers;
  #destinations = mockDestinations;

  get events() {
    return this.#events;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  updateEvent(updateType, updated) {
    const index = this.#events.findIndex(({id}) => id === updated.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      updated,
      ...this.#events.slice(index + 1)
    ];

    this._notify(updateType, updated);
  }

  addEvent(updateType, newEvent) {
    this.#events = [
      newEvent,
      ...this.#events
    ];

    this._notify(updateType, newEvent);
  }

  deleteEvent(updateType, toDelete) {
    const index = this.#events.findIndex(({id}) => id === toDelete.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      ...this.#events.slice(index + 1)
    ];

    this._notify(updateType);
  }

  getEventOffers(event) {
    return getTypeOffers(event.type, this.#offers).filter(({id}) => event.offers.indexOf(id) !== -1);
  }

  getEventDestination(event) {
    return this.#destinations.find(({id}) => id === event.destination);
  }
}
