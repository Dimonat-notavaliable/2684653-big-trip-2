import FilterView from '../view/filter-view.js';
import { UpdateType } from '../const.js';
import {filter} from '../utils/filter.js';
import { remove, render, replace } from '../framework/render';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #eventModel = null;

  #filterComponent = null;

  constructor({filterContainer, filterModel, eventModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#eventModel = eventModel;

    this.#eventModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const events = this.#eventModel.events;

    return Object.entries(filter).map(
      ([filterType, filterFunc]) => ({
        type: filterType,
        isActive: filterFunc(events).length > 0
      })
    );
  }

  init() {
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      filters: this.filters,
      currentFilter: this.#filterModel.filter,
      onFilterChange: this.#handleFilterChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }


  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterChange = (newFilter) => {
    if (this.#filterModel.filter === newFilter) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, newFilter);
  };
}
