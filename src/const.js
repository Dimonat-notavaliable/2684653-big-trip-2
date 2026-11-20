const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

/** @enum {string} Перечисление используемых форматов дат для dayjs */
const DateFormat = {
  ONLY_TIME: 'HH:mm',
  ONLY_DATE: 'MMM D',
  FORM: 'DD/MM/YY HH:mm',
};

/** @enum {string} Перечисление фильтров событий */
const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

/** @enum {string} Перечисление сортировки событий */
const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};

/** @enum {string} Перечисление возможных действий с событием */
const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT'
};

/** @enum {string} Перечисление типов обновления */
const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

export {EVENT_TYPES, DateFormat, FilterType, SortType, UserAction, UpdateType};
