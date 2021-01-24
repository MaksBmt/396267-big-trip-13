import Abstract from "./abstract.js";

const createFilterItemTemplate = ({type, name}, currentFilterType, isDisable) => {

  return `<div class="trip-filters__filter">
  <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${type === currentFilterType ? `checked` : ``} ${isDisable ? `disabled` : ``}>
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
</div > `;
};

export const createFilterEventsTemplate = (filterItems, currentFilterType, isDisable) => {

  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType, isDisable))
    .join(``);

  return `<form class="trip-filters" action = "#" method = "get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
            </form>`;
};

export default class FilterEvents extends Abstract {
  constructor(filters, currentFilterType, isDisable) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;
    this._isDisable = isDisable;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterEventsTemplate(this._filters, this._currentFilter, this._isDisable);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }
}

