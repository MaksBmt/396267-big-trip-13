import Abstract from "./abstract.js";

const createButtonEvent = () => {
  return `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`;
};

export default class Button extends Abstract {
  constructor() {
    super();

    this._newPointClickHandler = this._newPointClickHandler.bind(this);
  }

  getTemplate() {
    return createButtonEvent();
  }

  setNewPointClickHandler(callback) {
    this._callback.buttonClick = callback;
    document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, this._newPointClickHandler);
  }

  _newPointClickHandler(evt) {
    evt.preventDefault();
    this._callback.buttonClick();
    document.querySelector(`.trip-main__event-add-btn`).disabled = true;
  }
}
