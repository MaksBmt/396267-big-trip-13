import FormEvent from "../view/form-event.js";
import EventItem from "../view/event-item.js";
import {renderElement} from "../utils/render.js";
import {RenderPosition} from "../utils/render.js";
import {replace, remove} from "../utils/render.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class Mark {
  constructor(markContainer, changeData, changeMode) {
    this._markContainer = markContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._markItem = null;
    this._markForm = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(subject) {
    this._subject = subject;

    const prevMarkItem = this._markItem;
    const prevMarkForm = this._markForm;

    this._markItem = new EventItem(subject);
    this._markForm = new FormEvent(subject);

    this._markItem.setPointClickHandler(this._handleEditClick);
    this._markForm.setEditSubmitHandler(this._handleFormSubmit);
    this._markForm.setEditClickHandler(this._handleFormSubmit);
    this._markItem.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevMarkItem === null || prevMarkForm === null) {
      renderElement(this._markContainer, this._markItem, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._markItem, prevMarkItem);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._markForm, prevMarkForm);
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

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replaceFormToCard();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFavoriteClick() {
    this._changeData(Object.assign({}, this._subject, {isFavorite: !this._subject.isFavorite}));
  }

  _handleFormSubmit() {
    this._changeData(this._subject);
    this._replaceFormToCard();
  }
}
