import Observer from "../utils/observer.js";

export default class DestinationModel extends Observer {
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

  createListDestination() {
    const citiesList = this._destinations;
    return (`<datalist id="destination-list-1"> 
   ${citiesList.map((item) => `<option value="${item.name}"></option>`).join(``)}
    </datalist>`
    );
  }
}
