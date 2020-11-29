import {createElement} from "../utils.js";
import {renderHtml} from "../utils.js";
import {headerTitle} from "../main.js";

const createHeaderMenuTemplate = () => {
  return (`<nav class="trip-controls__trip-tabs  trip-tabs">
  <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
  <a class="trip-tabs__btn" href="#">Stats</a>
</nav>`);
};

export default class HeaderMenu {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createHeaderMenuTemplate();
  }

  getElement() {
    if (!this._element) {
      // this._element = createElement(this.getTemplate());
      this._element = renderHtml(headerTitle[0], this.getTemplate(), `afterend`);
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
