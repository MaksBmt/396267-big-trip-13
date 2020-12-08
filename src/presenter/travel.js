import FilterSort from "../view/filter-sort.js";
import EventList from "../view/event-list.js";
import NoPoint from "../view/no-point.js";
import Mark from "./mark.js";
import {renderElement} from "../utils/render.js";
import {RenderPosition} from "../utils/render.js";


const POINT_COUNT = 6;

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
    renderElement(this._containerContent, this._listComponent, RenderPosition.BEFOREEND);
    this._renderPoints(this.subjects);
  }

  _renderPoint(listComponent, subject) {
    const mark = new Mark(listComponent);
    mark.init(subject);
  }

  _renderPoints(subjects) {
    for (const subject of subjects) {
      this._renderPoint(this._listComponent, subject);
    }
  }
}
