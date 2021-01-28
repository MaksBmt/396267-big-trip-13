import Observer from "../utils/observer.js";
import {FilterType} from "../const.js";

export default class Filter extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterType.EVERYTHING;
    this._filterDisable = FilterType.EVERYTHING
  }

  set(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  get() {
    return this._activeFilter;
  }

  setDisableType(filterDisable) {
    this._filterDisable = filterDisable;
  }

  getDisableType() {
    return this._filterDisable;
  }
}
