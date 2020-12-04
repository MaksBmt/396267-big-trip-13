import Abstract from "./abstract.js";

const createPriceTotalTemplate = (totalPrice) => {
  return (`<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
   </p>
  `);
};

export default class PriceTotal extends Abstract {
  constructor(totalPrice) {
    super();
    this._totalPrice = totalPrice;
  }

  getTemplate() {
    return createPriceTotalTemplate(this._totalPrice);
  }
}
