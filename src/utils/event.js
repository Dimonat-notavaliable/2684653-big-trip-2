const MINUTE_MS = 60000;
const HOUR_MINUTES = 60;
const DAY_HOURS = 24;


const humanizeEventDuration = (startTime, endTime) => {
  const timeDifferenceMinutes = Math.trunc((endTime - startTime) / MINUTE_MS);

  let resultDuration = `${timeDifferenceMinutes % HOUR_MINUTES}M`;

  if (timeDifferenceMinutes >= HOUR_MINUTES) {
    resultDuration = `${Math.trunc(timeDifferenceMinutes % (HOUR_MINUTES * DAY_HOURS) / HOUR_MINUTES)}H ${resultDuration}`;
  }

  if (timeDifferenceMinutes >= HOUR_MINUTES * DAY_HOURS) {
    resultDuration = `${Math.trunc(timeDifferenceMinutes / (HOUR_MINUTES * DAY_HOURS))}D ${resultDuration}`;
  }

  return resultDuration;
};

const isFutureEvent = ({dateFrom}) => new Date(dateFrom) > new Date();

const isPresentEvent = ({dateFrom, dateTo}) => {
  const currentDate = new Date();
  return new Date(dateFrom) <= currentDate && new Date(dateTo) >= currentDate;
};

const isPastEvent = ({dateTo}) => new Date(dateTo) < new Date();

const getEventPrice = (event, eventOffers) => {
  const offersPrice = eventOffers.reduce((accumulator, offer) => accumulator + offer.price, 0);
  return offersPrice + event.basePrice;
};

export {isFutureEvent, isPresentEvent, isPastEvent, humanizeEventDuration, getEventPrice};
