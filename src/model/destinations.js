import Observer from "../utils/observer.js";

export default class Destinations extends Observer {
  constructor() {
    super();
    this._destinations = [];
  }

  set(destinations) {
    this._destinations = destinations;
  }

  get() {
    return this._destinations;
  }

  getCities() {
    return this.get().map((item) => item.name);
  }
}
