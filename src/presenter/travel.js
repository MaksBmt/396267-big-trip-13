import FilterSort from "../view/filter-sort.js";
import EventList from "../view/event-list.js";
import NoPoint from "../view/no-point.js";
import Mark from "./mark.js";
import {renderElement} from "../utils/render.js";
import {RenderPosition} from "../utils/render.js";
import {updateItem, priceSortPoints, intervalSortPoints} from "../utils/common.js";
import {SortType} from "../const.js";

const POINT_COUNT = 6;

export default class Travel {
  constructor(containerContent) {
    this._containerContent = containerContent;
    this._mark = {};
    this._currentSortType = SortType.DEFAULT;

    this._listComponent = new EventList();
    this._sortComponent = new FilterSort();
    this._noComponent = new NoPoint();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(subjects) {
    this._subjects = subjects.slice();
    this._sourceSubjects = subjects.slice();

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
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderListContent() {
    renderElement(this._containerContent, this._listComponent, RenderPosition.BEFOREEND);
    this._renderPoints(this._subjects);
  }

  _renderPoint(listComponent, subject) {
    const mark = new Mark(listComponent, this._handlePointChange, this._handleModeChange);
    mark.init(subject);
    this._mark[subject.id] = mark;
  }

  _renderPoints(subjects) {
    for (const subject of subjects) {
      this._renderPoint(this._listComponent, subject);
    }
  }

  _clearPointList() {
    Object
      .values(this._mark)
      .forEach((presenter) => presenter.destroy());
    this._mark = {};
  }

  _handlePointChange(updatedSubject) {
    this._subjects = updateItem(this._subjects, updatedSubject);
    this._mark[updatedSubject.id].init(updatedSubject);
  }

  _sortTasks(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this._subjects.sort(priceSortPoints);
        break;
      case SortType.INTERVAL:
        this._subjects.sort(intervalSortPoints);
        break;
      default:
        this._subjects = this._sourceSubjects.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortTasks(sortType);
    this._clearPointList();
    this._renderListContent();
  }

  _handleModeChange() {
    Object
      .values(this._mark)
      .forEach((presenter) => presenter.resetView());
  }
}
