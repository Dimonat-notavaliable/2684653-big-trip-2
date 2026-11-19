import dayjs from 'dayjs';

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

/**
 * Проверяет, является ли нажатая клавиша клавишей Escape.
 * @param {KeyboardEvent} evt - Объект события клавиатуры
 * @returns {boolean} Возвращает `true`, если нажата клавиша Escape, иначе `false`
 */
const isEscapeKey = (evt) => evt.key === 'Escape';

/**
 * Преобразует дату в строку вида `2019-04-08T06:45`
 * @param {Date} date - Дата для обработки
 * @returns {string} Преобразованная дата
 */
const parseDateToISO = (date) => date.toISOString().slice(0, -8);

export {getRandomArrayElement, titleString, humanizeDate, isEscapeKey, parseDateToISO};
