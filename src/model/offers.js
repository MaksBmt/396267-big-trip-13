import Observer from "../utils/observer.js";

export default class Offers extends Observer {
  constructor() {
    super();
    this._offers = [];
  }

  set(offers) {
    this._offers = offers;
  }

  get() {
    return this._offers;
  }

  filterByType(type) {
    type = type.toLowerCase();
    const item = this._offers.find((offer) => offer.type === type);
    return item ? item.offers : ``;
  }
}
