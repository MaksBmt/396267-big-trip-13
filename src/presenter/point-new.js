import FormEvent from "../view/form-event.js";
import {RenderPosition, renderElement, remove} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";
import {BLANK_POINT} from "../view/form-event.js";

export default class PointNew {
  constructor(pointListContainer, changeData) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._point = BLANK_POINT;

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

    this._formComponent = new FormEvent(this._point, this._isNewPoint);
    this._formComponent.setEditSubmitHandler(this._handleFormSubmit);
    this._formComponent.setDeleteClickHandler(this._handleDeleteClick);

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

  disabledButtonNew() {
    document.querySelector(`.trip-main__event-add-btn`).disabled = false;
  }

  _handleFormSubmit(point) {
    this._changeData(UserAction.ADD_TASK, UpdateType.MINOR, point);
  }

  _handleDeleteClick() {
    this.destroy();
    this.disabledButtonNew();
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
      this.disabledButtonNew();
    }
  }
}
