import dayjs from 'dayjs';

const DATE_FORMAT = 'MMM D';
const DATE_FORM_FORMAT = 'DD/MM/YY HH:mm';
const TIME_FORMAT = 'HH:mm';

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

const humanizeEventDate = (datetime) => dayjs(datetime).format(DATE_FORMAT);
const humanizeEventTime = (datetime) => dayjs(datetime).format(TIME_FORMAT);
const formatFormTime = (datetime) => dayjs(datetime).format(DATE_FORM_FORMAT);

const calcEventDuration = (startTime, endTime) => {
  const timeDifferenceMinutes = Math.trunc((endTime - startTime) / MINUTE_MS);

  let resultDuration = `${timeDifferenceMinutes % HOUR_MINUTES}M`;

  if (timeDifferenceMinutes >= HOUR_MINUTES) {
    resultDuration = `${Math.trunc(timeDifferenceMinutes % (HOUR_MINUTES * DAY_HOURS) / HOUR_MINUTES)} H ${resultDuration}`;
  }

  return resultDuration;
};

export {getRandomArrayElement, titleString, humanizeEventDate, humanizeEventTime, calcEventDuration, formatFormTime};
