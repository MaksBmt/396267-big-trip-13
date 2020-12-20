import FilterSort from "../view/filter-sort.js";
import EventList from "../view/event-list.js";
import NoPoint from "../view/no-point.js";
import Mark from "./mark.js";
import {renderElement} from "../utils/render.js";
import {RenderPosition, remove} from "../utils/render.js";
import {priceSortPoints, intervalSortPoints} from "../utils/common.js";
import {filter} from "../utils/filter.js";
import {SortType, UpdateType, UserAction} from "../const.js";

const POINT_COUNT = 11;

export default class Travel {
  constructor(containerContent, pointsModel, filterModel) {
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._containerContent = containerContent;
    this._renderedPointCount = POINT_COUNT;
    this._sortComponent = null;
    this._mark = {};
    this._currentSortType = SortType.DEFAULT;

    this._listComponent = new EventList();
    this._noComponent = new NoPoint();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    // this._subjects = subjects.slice();
    // this._sourceSubjects = subjects.slice();

    // if (POINT_COUNT === 0) {
    //   this._renderNoPoint();
    // } else {
    // this._renderSort();
    this._renderListContent();
    // }
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filtredPoints = filter[filterType](points);


    switch (this._currentSortType) {
      case SortType.PRICE:
        return filtredPoints.sort(priceSortPoints);
      case SortType.INTERVAL:
        return filtredPoints.sort(intervalSortPoints);
    }

    return filtredPoints;
  }

  _renderNoPoint() {
    renderElement(this._containerContent, this._noComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new FilterSort(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    renderElement(this._containerContent, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(listComponent, subject) {
    const mark = new Mark(listComponent, this._handleViewAction, this._handleModeChange);
    mark.init(subject);
    this._mark[subject.id] = mark;
  }

  _renderPoints(subjects) {
    for (const subject of subjects) {
      this._renderPoint(this._listComponent, subject);
    }
  }

  // _renderPoints(points) {
  //   for (const subject of points) {
  //     this._renderPoint(this._listComponent, subject);
  //   }
  // }

  // _clearPointList() {
  //   Object
  //     .values(this._mark)
  //     .forEach((presenter) => presenter.destroy());
  //   this._mark = {};
  // }

  _clearListContent({resetRenderedPointCount = false, resetSortType = false} = {}) {
    const pointCount = this._getPoints().length;

    Object
      .values(this._mark)
      .forEach((presenter) => presenter.destroy());
    this._mark = {};
    // this._clearPointList();

    remove(this._sortComponent);
    remove(this._noComponent);

    if (resetRenderedPointCount) {
      this._renderedPointCount = POINT_COUNT;
    } else {
      this._renderedPointCount = Math.min(pointCount, this._renderedPointCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderListContent() {
    const points = this._getPoints();
    const pointCount = points.length;

    if (pointCount === 0) {
      this._renderNoPoint();
      return;
    }

    this._renderSort();
    renderElement(this._containerContent, this._listComponent, RenderPosition.BEFOREEND);
    this._renderPoints(points.slice(0, Math.min(pointCount, this._renderedPointCount)));
  }


  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearListContent({resetRenderedPointCount: true});
    this._renderListContent();
  }

  _handleModeChange() {
    Object
      .values(this._mark)
      .forEach((presenter) => presenter.resetView());
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._mark[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearListContent();
        this._renderListContent();
        break;
      case UpdateType.MAJOR:
        this._clearListContent({resetRenderedPointCount: true, resetSortType: true});
        this._renderListContent();
        break;
    }
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }
}
