import { SortType } from '../const.js';
import { getEventPrice } from './event.js';
import EventModel from '../model/event-model.js';

const eventModel = new EventModel();


const compareEventStart = (eventA, eventB) => new Date(eventB.dateFrom) - new Date(eventA.dateFrom);
const compareEventDuration = (eventA, eventB) => {
  const eventADuration = new Date(eventA.dateTo) - new Date(eventA.dateFrom);
  const eventBDuration = new Date(eventB.dateTo) - new Date(eventB.dateFrom);
  return eventBDuration - eventADuration;
};
const compareEventPrice = (eventA, eventB) => getEventPrice(eventB, eventModel.getEventOffers(eventB)) - getEventPrice(eventA, eventModel.getEventOffers(eventA));

const eventSort = {
  [SortType.DAY]: (events) => events.sort(compareEventStart),
  [SortType.EVENT]: null,
  [SortType.TIME]: (events) => events.sort(compareEventDuration),
  [SortType.PRICE]: (events) => events.sort(compareEventPrice),
  [SortType.OFFER]: null
};

export {eventSort};
