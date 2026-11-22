import { getTypeOffers } from '../utils/offer.js';
import { UpdateType } from '../const.js';
import Observable from '../framework/observable.js';

export default class EventModel extends Observable {
  #events = [];
  #offers = [];
  #destinations = [];

  #apiService = null;

  constructor({apiService}) {
    super();
    this.#apiService = apiService;
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

  async updateEvent(updateType, updated) {
    const index = this.#events.findIndex(({id}) => id === updated.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    try {
      const response = await this.#apiService.updateEvent(updated);
      const updatedEvent = this.#adaptToClient(response);

      this.#events = [
        ...this.#events.slice(0, index),
        updatedEvent,
        ...this.#events.slice(index + 1)
      ];
      this._notify(updateType, updatedEvent);
    } catch (err) {
      throw new Error('Can\'t update event');
    }
  }

  async addEvent(updateType, newEvent) {
    try {
      const response = await this.#apiService.addEvent(newEvent);
      const addedEvent = this.#adaptToClient(response);

      this.#events = [
        addedEvent,
        ...this.#events
      ];
      this._notify(updateType, newEvent);
    } catch (err) {
      throw new Error('Can\'t add event');
    }
  }

  async deleteEvent(updateType, toDelete) {
    const index = this.#events.findIndex(({id}) => id === toDelete.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    try {
      await this.#apiService.deleteEvent(toDelete);
      this.#events = [
        ...this.#events.slice(0, index),
        ...this.#events.slice(index + 1)
      ];

      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\'t delete event');
    }
  }

  getEventOffers(event) {
    return getTypeOffers(event.type, this.#offers).filter(({id}) => event.offers.indexOf(id) !== -1);
  }

  getEventDestination(event) {
    return this.#destinations.find(({id}) => id === event.destination);
  }

  async init() {
    try {
      const events = await this.#apiService.events;
      this.#events = events.map(this.#adaptToClient);
    } catch (err) {
      this.#events = [];
    }

    try {
      this.#destinations = await this.#apiService.destinations;
    } catch (err) {
      this.#destinations = [];
    }

    try {
      this.#offers = await this.#apiService.offers;
    } catch (err) {
      this.#offers = [];
    }

    this._notify(UpdateType.INIT);
  }

  #adaptToClient(event) {
    const adapted = {
      ...event,
      basePrice: event['base_price'],
      dateFrom: event['date_from'],
      dateTo: event['date_to'],
      isFavorite: event['is_favorite']
    };

    delete adapted['base_price'];
    delete adapted['date_from'];
    delete adapted['date_to'];
    delete adapted['is_favorite'];

    return adapted;
  }
}
