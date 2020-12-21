import FilterSort from "../view/filter-sort.js";
import EventList from "../view/event-list.js";
import NoPoint from "../view/no-point.js";
import Mark from "./mark.js";
import PointNewPresenter from "./point-new.js";
import {renderElement} from "../utils/render.js";
import {RenderPosition, remove} from "../utils/render.js";
import {priceSortPoints, intervalSortPoints} from "../utils/common.js";
import {filter} from "../utils/filter.js";
import {SortType, UpdateType, UserAction, FilterType} from "../const.js";

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
    this._isNewPoint = false;

    this._listComponent = new EventList();
    this._noComponent = new NoPoint();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._pointNewPresenter = new PointNewPresenter(this._listComponent, this._handleViewAction);
  }

  init() {
    this._renderListContent();
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
    const mark = new Mark(listComponent, this._handleViewAction, this._handleModeChange, this._isNewPoint);
    mark.init(subject);
    this._mark[subject.id] = mark;
  }

  _renderPoints(subjects) {
    for (const subject of subjects) {
      this._renderPoint(this._listComponent, subject);
    }
  }

  createPoint() {
    this._currentSortType = SortType.DEFAULT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._pointNewPresenter.init();
  }

  _clearListContent({resetRenderedPointCount = false, resetSortType = false} = {}) {
    const pointCount = this._getPoints().length;

    this._pointNewPresenter.destroy();
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
    this._pointNewPresenter.destroy();

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
        this._pointsModel.update(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this._pointsModel.add(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this._pointsModel.delete(updateType, update);
        break;
    }
  }
}
