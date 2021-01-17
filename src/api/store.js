import {StoreOption} from "../const.js";

export default class Store {
  constructor(key, storage) {
    this._storage = storage;
    this._storeKey = key;
    this._storeOffersKey = StoreOption.OFFERS;
    this._storeDestinationsKey = StoreOption.DESTINATIONS;
  }

  getItems() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey)) || {};
    } catch (err) {
      return {};
    }
  }

  getOffers() {
    try {
      return JSON.parse(this._storage.getItem(this._storeOffersKey)) || {};
    } catch (err) {
      return {};
    }
  }

  getDestinations() {
    try {
      return JSON.parse(this._storage.getItem(this._storeDestinationsKey)) || {};
    } catch (err) {
      return {};
    }
  }

  setItems(items) {
    this._storage.setItem(this._storeKey, JSON.stringify(items));
  }

  setItem(key, value) {
    const store = this.getItems();

    this._storage.setItem(this._storeKey, JSON.stringify(Object.assign({}, store, {
      [key]: value
    })));
  }

  setOffers(offers) {
    this._storage.setItem(this._storeOffersKey, JSON.stringify(offers));
  }

  setDestinations(destinations) {
    this._storage.setItem(this._storeDestinationsKey, JSON.stringify(destinations));
  }

  removeItem(key) {
    const store = this.getItems();

    delete store[key];

    this._storage.setItem(this._storeKey, JSON.stringify(store));
  }
}
