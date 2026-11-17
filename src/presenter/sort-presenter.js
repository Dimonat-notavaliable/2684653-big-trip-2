import { render, replace, remove } from '../framework/render.js';
import { generateSort } from '../mock/sort.js';
import SortView from '../view/sort-view.js';


export default class SortPresenter {
  #sortOptions = null;
  #sortComponent = null;
  #sortContainer = null;
  #sortType = null;

  #handleDataChange = null;

  constructor({sortContainer, onDataChange}) {
    this.#sortContainer = sortContainer;
    this.#handleDataChange = onDataChange;
  }

  init(sortType) {
    this.#sortType = sortType;
    this.#sortOptions = generateSort();

    const prevSortComponent = this.#sortComponent;

    this.#sortComponent = new SortView({
      selectedOption: this.#sortType,
      sortOptions: this.#sortOptions,
      onSortTypeChange: this.#handleSortTypeChange
    });

    if (prevSortComponent === null) {
      render(this.#sortComponent, this.#sortContainer);
      return;
    } else {
      replace(this.#sortComponent, prevSortComponent);
    }
    remove(prevSortComponent);
  }

  #handleSortTypeChange = (sortType) => {
    this.#handleDataChange(sortType);
  };
}
