import FormEvent from "../view/form-event.js";
import {RenderPosition, renderElement, remove} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";
import {BLANK_POINT} from "../const.js";

export default class PointNew {
  constructor(pointListContainer, changeData, offersModel, destinationsModel, buttonNewPoint) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._point = BLANK_POINT;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._buttonNewPoint = buttonNewPoint;

    this._formComponent = null;
    this._isNewPoint = true;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init() {
    if (this._formComponent !== null) {
      return;
    }

    this._formComponent = new FormEvent(this._point, this._isNewPoint, this._offersModel, this._destinationsModel, this._buttonNewPoint);
    this._formComponent.setEditSubmitHandler(this._handleFormSubmit);
    this._formComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._formComponent.setDatepicker();

    renderElement(this._pointListContainer, this._formComponent, RenderPosition.AFTERBEGIN);

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

  setSaving() {
    this._formComponent.updateData({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._formComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this._formComponent.shake(resetFormState);
  }

  _handleFormSubmit(point) {
    this._changeData(UserAction.ADD_TASK, UpdateType.MINOR, point);
    this._buttonNewPoint.enable();
  }

  _handleDeleteClick() {
    this.destroy();
    this._buttonNewPoint.enable();
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
      this._buttonNewPoint.enable();
    }
  }
}
