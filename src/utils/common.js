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

const updateItem = (items, updated) => items.map((item) => item.id === updated.id ? updated : item);

export {getRandomArrayElement, titleString, humanizeDate, isEscapeKey, updateItem};
