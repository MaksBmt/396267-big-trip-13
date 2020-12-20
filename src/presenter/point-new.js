import FormEvent from "../view/form-event.js";
import {RenderPosition, renderElement, remove} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";
import {generateId} from "../mock/point.js";

export default class PointNew {
  constructor(pointListContainer, changeData) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._point = {};

    this._formComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init() {
    if (this._formComponent !== null) {
      return;
    }

    this._formComponent = new FormEvent(this._point);
    this._formComponent.setEditSubmitHandler(this._handleFormSubmit);
    this._formComponent.setDeleteClickHandler(this._handleDeleteClick);

    renderElement(this._pointListContainer, this._formComponent, RenderPosition.BEFOREEND);

    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  destroy() {
    if (this._formComponent === null) {
      return;
    }

    remove(this._formComponent);
    this._formComponent = null;

    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _handleFormSubmit(point) {
    this._changeData(UserAction.ADD_TASK, UpdateType.MINOR, Object.assign({id: generateId()}, point));
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
