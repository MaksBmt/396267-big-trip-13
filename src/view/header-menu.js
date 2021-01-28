import Abstract from "./abstract.js";
import {MenuItem} from "../const.js";

const createHeaderMenuTemplate = () => {
  return (`<nav class="trip-controls__trip-tabs  trip-tabs">
  <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-value="${MenuItem.TABLE}">${MenuItem.TABLE} </a>
  <a class="trip-tabs__btn" href="#" data-value="${MenuItem.STATS}">${MenuItem.STATS}</a>
</nav>`);
};

export default class HeaderMenu extends Abstract {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createHeaderMenuTemplate();
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;

    this._getTabs().forEach((button) => button.addEventListener(`click`, this._menuClickHandler));
  }

  setMenuItem(menuItem) {
    this._getTabs().forEach((button) => button.classList.remove(`trip-tabs__btn--active`));

    const item = this.getElement().querySelector(`[data-value=${menuItem}]`);

    if (item !== null) {
      item.classList.add(`trip-tabs__btn--active`);
    }
  }

  _menuClickHandler(evt) {
    evt.preventDefault();

    if (!evt.target.classList.contains(`trip-tabs__btn--active`)) {
      this._callback.menuClick(evt.target.dataset.value);
    }

    this.setMenuItem(evt.target.dataset.value);
  }

  _getTabs() {
    return this.getElement().querySelectorAll(`.trip-tabs__btn`);
  }
}
