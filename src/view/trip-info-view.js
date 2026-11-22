import AbstractView from '../framework/view/abstract-view.js';
import { DateFormat } from '../const.js';
import { humanizeDate } from '../utils/common.js';

function createTripInfoTemplate(tripEvents) {
  const tripTitle = (
    tripEvents.length <= 3 ?
      tripEvents.map((event) => event.destination).join(' &mdash; ') :
      `${tripEvents[0].destination} &mdash; ... &mdash; ${tripEvents[tripEvents.length - 1].destination}`
  );

  const tripStart = humanizeDate(tripEvents[0].dateFrom, DateFormat.INFO);
  const tripEnd = humanizeDate(tripEvents[tripEvents.length - 1].dateTo, DateFormat.INFO);

  const tripDate = tripStart === tripEnd ? tripStart : `${tripStart}  &mdash; ${tripEnd}`;
  const tripPrice = tripEvents.reduce((accumulator, event) => accumulator + event.fullPrice, 0);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${tripTitle}</h1>

        <p class="trip-info__dates">${tripDate}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripPrice}</span>
      </p>
    </section>`
  );
}

export default class TripInfoView extends AbstractView {
  #tripEvents = null;

  constructor ({tripEvents}) {
    super();

    this.#tripEvents = tripEvents;
  }

  get template() {
    return createTripInfoTemplate(this.#tripEvents);
  }
}
