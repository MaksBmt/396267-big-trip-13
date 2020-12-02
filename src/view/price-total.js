import {createElement} from "../utils.js";

const createPriceTotalTemplate = (totalPrice) => {
  return (`<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
   </p>
  `);
};

export default class PriceTotal {
  constructor(totalPrice) {
    this._element = null;
    this._totalPrice = totalPrice;
  }

  getTemplate() {
    return createPriceTotalTemplate(this._totalPrice);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
