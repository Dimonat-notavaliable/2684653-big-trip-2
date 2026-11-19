import { render, replace, remove, RenderPosition } from '../framework/render.js';
import { generateSort } from '../mock/sort.js';
import SortView from '../view/sort-view.js';


export default class SortPresenter {
  #sortOptions = null;
  #sortComponent = null;
  #sortFollower = null;
  #sortType = null;

  #handleDataChange = null;

  constructor({sortFollower, onDataChange}) {
    this.#sortFollower = sortFollower;
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
      render(this.#sortComponent, this.#sortFollower, RenderPosition.BEFOREBEGIN);
      return;
    } else {
      replace(this.#sortComponent, prevSortComponent);
    }
    remove(prevSortComponent);
  }

  destroy() {
    remove(this.#sortComponent);
  }

  #handleSortTypeChange = (sortType) => {
    this.#handleDataChange(sortType);
  };
}
