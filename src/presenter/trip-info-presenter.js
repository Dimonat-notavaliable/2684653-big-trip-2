import { render, replace, remove, RenderPosition } from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';
import { eventSort } from '../utils/sort.js';
import { SortType } from '../const.js';
import { getEventPrice } from '../utils/event.js';


export default class TripInfoPresenter {
  #tripInfoContainer = null;
  #tripInfoComponent = null;

  #eventModel = null;

  constructor({tripInfoContainer, eventModel}) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#eventModel = eventModel;

    this.#eventModel.addObserver(this.#handleModelEvent);
  }

  init() {
    const events = this.#eventModel.events.slice(0).sort(eventSort[SortType.DAY]).reverse();

    const prevTripInfoComponent = this.#tripInfoComponent;

    if (events.length === 0) {
      this.destroy();
      return;
    }

    this.#tripInfoComponent = new TripInfoView({
      tripEvents: events.map((event) => ({
        destination: this.#eventModel.getEventDestination(event)?.name,
        fullPrice: getEventPrice(event, this.#eventModel.getEventOffers(event)),
        dateFrom: event.dateFrom,
        dateTo: event.dateTo
      }))
    });

    if (prevTripInfoComponent === null) {
      render(this.#tripInfoComponent, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
      return;
    } else {
      replace(this.#tripInfoComponent, prevTripInfoComponent);
    }
    remove(prevTripInfoComponent);
  }

  destroy() {
    remove(this.#tripInfoComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };
}
