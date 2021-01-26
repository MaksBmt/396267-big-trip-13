import FilterEvents from "../view/filter-events.js";
import {renderElement, replace, remove} from "../utils/render.js";
import {FilterType, UpdateType, RenderPosition} from "../const.js";

export default class Filter {
  constructor(filterContainer, filterModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;

    this._currentFilter = null;
    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._filterModel.addObserver(this._handleModelEvent);
  }

  init(isDisable) {
    this._currentFilter = this._filterModel.get();
    this._isDisable = isDisable;

    const filters = this._get();
    const prevFilterComponent = this._filterComponent;
    this._filterComponent = new FilterEvents(filters, this._currentFilter, this._isDisable);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      renderElement(this._filterContainer, this._filterComponent, RenderPosition.AFTEREND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {

      return;
    }

    this._filterModel.set(UpdateType.MAJOR, filterType);
  }

  _get() {

    return [
      {
        type: FilterType.EVERYTHING,
        name: `everything`,
      },
      {
        type: FilterType.FUTURE,
        name: `future`,
      },
      {
        type: FilterType.PAST,
        name: `past`,
      },
    ];
  }
}
