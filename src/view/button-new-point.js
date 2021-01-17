import Abstract from "./abstract.js";

const createButtonEvent = () => {
  return `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`;
};

export default class ButtonNewPoint extends Abstract {
  constructor() {
    super();

    this._newPointClickHandler = this._newPointClickHandler.bind(this);
  }

  getTemplate() {
    return createButtonEvent();
  }

  setNewPointClickHandler(callback) {
    this._callback.buttonClick = callback;
    this.getElement().addEventListener(`click`, this._newPointClickHandler);
  }

  enable() {
    this.getElement().disabled = false;
  }

  _disable() {
    this.getElement().disabled = true;
  }

  _newPointClickHandler(evt) {
    evt.preventDefault();
    this._callback.buttonClick();
    this._disable();
  }
}