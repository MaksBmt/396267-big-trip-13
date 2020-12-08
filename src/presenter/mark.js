import FormEvent from "../view/form-event.js";
import EventItem from "../view/event-item.js";
import {renderElement} from "../utils/render.js";
import {RenderPosition} from "../utils/render.js";
import {replace} from "../utils/render.js";

export default class Mark {
  constructor(markContainer) {
    this._markContainer = markContainer;

    this._markItem = null;
    this._markForm = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init(subject) {
    this.subject = subject;

    this._markItem = new EventItem(subject);
    this._markForm = new FormEvent(subject);

    this._markItem.setPointClickHandler(this._handleEditClick);
    this._markForm.setEditSubmitHandler(this._handleFormSubmit);
    this._markForm.setEditClickHandler(this._handleFormSubmit);

    renderElement(this._markContainer, this._markItem, RenderPosition.BEFOREEND);
  }

  _replaceCardToForm() {
    replace(this._markForm, this._markItem);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _replaceFormToCard() {
    replace(this._markItem, this._markForm);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
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

  _handleFormSubmit() {
    this._replaceFormToCard();
  }
}
