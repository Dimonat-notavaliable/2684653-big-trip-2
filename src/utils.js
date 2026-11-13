import dayjs from 'dayjs';

const MINUTE_MS = 60000;
const HOUR_MINUTES = 60;
const DAY_HOURS = 24;

const getRandomArrayElement = (array) => array[Math.floor(Math.random() * array.length)];

const titleString = (string) => {
  const separated = string.split(' ');
  const capitalized = [];
  for (const word of separated) {
    capitalized.push(word.charAt(0).toUpperCase() + word.slice(1));
  }
  return capitalized.join(' ');
};

const humanizeDate = (datetime, format) => dayjs(datetime).format(format);

const calcEventDuration = (startTime, endTime) => {
  const timeDifferenceMinutes = Math.trunc((endTime - startTime) / MINUTE_MS);

  let resultDuration = `${timeDifferenceMinutes % HOUR_MINUTES}M`;

  if (timeDifferenceMinutes >= HOUR_MINUTES) {
    resultDuration = `${Math.trunc(timeDifferenceMinutes % (HOUR_MINUTES * DAY_HOURS) / HOUR_MINUTES)} H ${resultDuration}`;
  }

  return resultDuration;
};


const getOfferSlug = (offer) => {
  const splittedOffer = offer.split(' ');
  return splittedOffer[splittedOffer.length - 1];
};

const getTypeOffers = (eventType, offers) => {
  const filtered = offers.find(({type}) => type === eventType);
  if (filtered) {
    return filtered['offers'];
  }
  return [];
};

export {getRandomArrayElement, titleString, humanizeDate, calcEventDuration, getOfferSlug, getTypeOffers};
