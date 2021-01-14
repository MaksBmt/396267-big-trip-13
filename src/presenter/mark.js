import FormEvent from "../view/form-event.js";
import EventItem from "../view/event-item.js";
import {renderElement} from "../utils/render.js";
import {RenderPosition} from "../utils/render.js";
import {replace, remove} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export const State = {
  SAVING: `SAVING`,
  DELETING: `DELETING`,
  ABORTING: `ABORTING`
};

export default class Mark {
  constructor(markContainer, changeData, changeMode, isNewPoint, offersModel) {
    this._markContainer = markContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._offersModel = offersModel;

    this._markItem = null;
    this._markForm = null;
    this._mode = Mode.DEFAULT;
    this._isNewPoint = isNewPoint;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(subject, headerMain) {
    this._subject = subject;
    this._headerMain = headerMain;

    const prevMarkItem = this._markItem;
    const prevMarkForm = this._markForm;

    this._markItem = new EventItem(subject, this._headerMain);
    this._markForm = new FormEvent(subject, this._isNewPoint, this._headerMain, this._offersModel);

    this._markItem.setPointClickHandler(this._handleEditClick);
    this._markForm.setEditSubmitHandler(this._handleFormSubmit);
    this._markForm.setEditClickHandler(this._handleFormSubmit);
    this._markForm.setDeleteClickHandler(this._handleDeleteClick);
    this._markItem.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevMarkItem === null || prevMarkForm === null) {
      renderElement(this._markContainer, this._markItem, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._markItem, prevMarkItem);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._markItem, prevMarkItem);
      this._mode = Mode.DEFAULT;
    }

    remove(prevMarkItem);
    remove(prevMarkForm);
  }

  destroy() {
    remove(this._markItem);
    remove(this._markForm);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  _replaceCardToForm() {
    replace(this._markForm, this._markItem);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._markItem, this._markForm);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.DEFAULT;
  }

  setViewState(state) {
    const resetFormState = () => {
      this._markForm.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    switch (state) {
      case State.SAVING:
        this._markForm.updateData({
          isDisabled: true,
          isSaving: true
        });
        break;
      case State.DELETING:
        this._markForm.updateData({
          isDisabled: true,
          isDeleting: true
        });
        break;
      case State.ABORTING:
        this._markItem.shake(resetFormState);
        this._markForm.shake(resetFormState);
        break;
    }
  }


  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._markForm.reset(this._subject);
      this._replaceFormToCard();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFavoriteClick() {
    this._changeData(UserAction.UPDATE_TASK, UpdateType.PATCH, Object.assign({}, this._subject, {isFavorite: !this._subject.isFavorite}));
  }

  _handleFormSubmit(item) {
    this._changeData(UserAction.UPDATE_TASK, UpdateType.MINOR, item);
  }

  _handleDeleteClick(item) {
    this._changeData(UserAction.DELETE_TASK, UpdateType.MAJOR, item);
  }
}
