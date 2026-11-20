import ApiService from '../framework/api-service.js';

/** @enum {string} Методы для взаимодействия с сервисом */
const Method = {
  GET: 'GET',
  PUT: 'PUT'
};

export default class EventsApiService extends ApiService {
  get events() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  async updateEvent(event) {
    const response = await this._load({
      url: `points/${event.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptEventToServer(event)),
      headers: new Headers({'Content-type': 'application/json'})
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptEventToServer(event) {
    const adapted = {
      ...event,
      'base_price': event.basePrice,
      'date_from': event.dateFrom,
      'date_to': event.dateTo,
      'is_favorite': event.isFavorite
    };

    delete adapted.basePrice;
    delete adapted.dateFrom;
    delete adapted.dateTo;
    delete adapted.isFavorite;

    return adapted;
  }
}
