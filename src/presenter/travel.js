import FilterSort from "../view/filter-sort.js";
import EventList from "../view/event-list.js";
import FormEvent from "../view/form-event.js";
import EventItem from "../view/event-item.js";
import NoPoint from "../view/no-point.js";
import {renderElement} from "../utils/render.js";
import {RenderPosition} from "../utils/render.js";
import {replace} from "../utils/render.js";

const POINT_COUNT = 5;

export default class Travel {
  constructor(containerContent) {
    this._containerContent = containerContent;

    this._listComponent = new EventList();
    this._sortComponent = new FilterSort();
    this._noComponent = new NoPoint();
  }

  init(subjects) {
    this.subjects = subjects.slice();

    if (POINT_COUNT === 0) {
      this._renderNoPoint();
    } else {
      this._renderSort();
      this._renderListContent();
    }
  }

  _renderNoPoint() {
    renderElement(this._containerContent, this._noComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    renderElement(this._containerContent, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderListContent() {
    renderElement(this._containerContent, this.listComponent, RenderPosition.BEFOREEND);
    this._renderPoints(this.subjects);
  }

  _renderPoint(subject) {
    const formEvent = new FormEvent(subject);
    const itemEvent = new EventItem(subject);

    const replaceCardToForm = () => {
      replace(formEvent, itemEvent);
    };

    const replaceFormToCard = () => {
      replace(itemEvent, formEvent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    itemEvent.setPointClickHandler(() => {
      replaceCardToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    formEvent.setEditSubmitHandler(() => {
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    formEvent.setEditClickHandler(() => {
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    renderElement(this._listComponent, itemEvent, RenderPosition.BEFOREEND);
  }

  _renderPoints(subjects) {
    for (const subject of subjects) {
      this._renderPoint(this._listComponent, subject);
    }
  }
}
