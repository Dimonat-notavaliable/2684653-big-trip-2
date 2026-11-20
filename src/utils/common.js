import dayjs from 'dayjs';

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

export {titleString, humanizeDate, isEscapeKey};
