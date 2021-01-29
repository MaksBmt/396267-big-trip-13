import FilterSort from "../view/filter-sort.js";
import EventList from "../view/event-list.js";
import NoPoint from "../view/no-point.js";
import Loading from "../view/loading.js";
import Information from "../view/information.js";
import PriceTotal from "../view/price-total.js";
import Mark, {State as MarkViewState} from "./mark.js";
import PointNewPresenter from "./point-new.js";
import {renderElement, remove} from "../utils/render.js";
import {priceSortPoints, intervalSortPoints, defaultSortPoints} from "../utils/common.js";
import {filter} from "../utils/filter.js";
import {SortType, UpdateType, UserAction, FilterType, RenderPosition} from "../const.js";
import dayjs from "dayjs";

export default class Travel {
  constructor(containerContent, pointsModel, filterModel, api, offersModel, destinationsModel, headerMain, buttonNewPoint) {
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._containerContent = containerContent;
    this._buttonNewPoint = buttonNewPoint;
    this._sortComponent = null;
    this._informationCityComponent = null;
    this._priceTotalComponent = null;
    this._mark = {};
    this._currentSortType = SortType.DEFAULT;
    this._isNewPoint = false;
    this._isLoading = true;
    this._api = api;

    this._listComponent = new EventList();
    this._noComponent = new NoPoint();
    this._loadingComponent = new Loading();

    this._headerMain = headerMain;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._handleNewPoint = this._handleNewPoint.bind(this);

    this._pointNewPresenter = new PointNewPresenter(this._listComponent, this._handleViewAction, this._offersModel, this._destinationsModel, this._buttonNewPoint);
  }

  init(filterPresenter) {
    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._renderListContent();
    this._filterPresenter = filterPresenter;
  }

  hide() {
    this._listComponent.hide();

    if (this._sortComponent) {
      this._sortComponent.hide();
    }
  }

  show() {
    this._listComponent.show();

    if (this._sortComponent) {
      this._sortComponent.show();
      this._currentSortType = SortType.DEFAULT;
      this._filterModel.set(UpdateType.MAJOR, FilterType.EVERYTHING);
    }
  }

  destroy() {
    this._clearListContent({resetRenderedPointCount: true, resetSortType: true});

    remove(this._listComponent);

    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  sumCheckOfferPrice(offers) {
    return offers
      .map((offer) => offer.isChecked ? offer.price : 0)
      .reduce((sum, current) => sum + current, 0);
  }

  getTotalPrice() {
    const points = this._pointsModel.get();
    const pointPrice = points.map((point) => point.price);
    const totalPriceOffersCheck = points.map((point) => this.sumCheckOfferPrice(point.offers)).reduce((sum, current) => sum + current, 0);

    return pointPrice.reduce((sum, current) => sum + current, 0) + totalPriceOffersCheck;
  }

  createPoint() {
    this._currentSortType = SortType.DEFAULT;
    this._filterModel.set(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._pointNewPresenter.init();
  }

  _getDataForDisableFilters(points) {

    if ((points.filter((item) => +dayjs() < +dayjs(item.dateEnd))).length === 0) {

      return FilterType.FUTURE;

    } else if ((points.filter((item) => +dayjs() > +dayjs(item.dateEnd))).length === 0) {

      return FilterType.PAST;
    }

    return null;
  }

  _getInformationCity() {
    return this._pointsModel.get().map((point) => point.city);
  }

  _getEndDate() {

    return this._pointsModel.get()
      .map((point) => point.dateEnd)
      .sort((pointA, pointB) => +dayjs(pointA) - +dayjs(pointB))
      .pop();
  }

  _getStartDate() {

    return this._pointsModel.get()
      .map((point) => point.dueDate)
      .sort((pointA, pointB) => +dayjs(pointA) - +dayjs(pointB))
      .shift();
  }

  _getPoints() {
    const filterType = this._filterModel.get();
    const points = this._pointsModel.get();
    const filtredPoints = filter[filterType](points);

    switch (this._currentSortType) {
      case SortType.PRICE:
        return filtredPoints.sort(priceSortPoints);
      case SortType.INTERVAL:
        return filtredPoints.sort(intervalSortPoints);
      case SortType.DEFAULT:
        return filtredPoints.sort(defaultSortPoints);
    }
    return filtredPoints;
  }

  _renderInformationCity() {
    if (this._informationCityComponent !== null) {
      this._informationCityComponent = null;
    }

    this._informationCityComponent = new Information(this._getInformationCity(), this._getEndDate(), this._getStartDate());
    renderElement(this._headerMain, this._informationCityComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPriceTotal() {
    if (this._priceTotalComponent !== null) {
      this._priceTotalComponent = null;
    }

    const headerInformation = this._headerMain.querySelector(`.trip-info`);
    this._priceTotalComponent = new PriceTotal(this.getTotalPrice());
    renderElement(headerInformation, this._priceTotalComponent, RenderPosition.BEFOREEND);
  }

  _renderNoPoint() {
    renderElement(this._containerContent, this._noComponent, RenderPosition.BEFOREEND);
  }

  _renderLoading() {
    renderElement(this._containerContent, this._loadingComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new FilterSort(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    renderElement(this._containerContent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(listComponent, subject) {
    const mark = new Mark(listComponent, this._handleViewAction, this._handleModeChange, this._isNewPoint, this._offersModel, this._destinationsModel, this._buttonNewPoint);
    mark.init(subject);
    this._mark[subject.id] = mark;
  }

  _renderPoints(subjects) {
    for (const subject of subjects) {
      this._renderPoint(this._listComponent, subject);
    }
  }

  _clearListContent({resetSortType = false} = {}) {

    this._pointNewPresenter.destroy();
    Object
      .values(this._mark)
      .forEach((presenter) => presenter.destroy());
    this._mark = {};

    remove(this._informationCityComponent);
    remove(this._priceTotalComponent);
    remove(this._sortComponent);
    remove(this._noComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderListContent() {
    if (this._isLoading) {
      this._renderLoading();

      return;
    }

    const points = this._getPoints();
    const pointsAll = this._pointsModel.get();
    const pointCount = points.length;
    this._buttonNewPoint.setNewPointClickHandler(this._handleNewPoint);
    const filterName = this._getDataForDisableFilters(pointsAll);
    this._filterPresenter.enableAllFilters();

    if (filterName !== null) {
      this._filterPresenter.disableFilter(filterName);
    }

    renderElement(this._containerContent, this._listComponent, RenderPosition.BEFOREEND);

    if (pointsAll.length === 0) {
      this._filterPresenter.disableAllFilters();
    }

    if (pointCount === 0) {
      this._renderNoPoint();

      return;
    } else {
      this._renderInformationCity();
      this._renderPriceTotal();
    }

    this._renderSort();
    this._renderPoints(points.slice(0, pointCount));
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
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderListContent();
        break;
    }
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this._mark[update.id].setViewState(MarkViewState.SAVING);
        this._api.updateEvent(update)
          .then((response) => {
            this._pointsModel.update(updateType, response);
          })
          .catch(() => {
            this._mark[update.id].setViewState(MarkViewState.ABORTING);
          });
        break;
      case UserAction.ADD_TASK:
        this._pointNewPresenter.setSaving();
        this._api.addEvent(update)
          .then((response) => {
            this._pointsModel.add(updateType, response);
          })
          .catch(() => {
            this._pointNewPresenter.setAborting();
          });
        break;
      case UserAction.DELETE_TASK:
        this._mark[update.id].setViewState(MarkViewState.DELETING);
        this._api.deleteEvent(update)
          .then(() => {
            this._pointsModel.delete(updateType, update);
          })
          .catch(() => {
            this._mark[update.id].setViewState(MarkViewState.ABORTING);
          });
        break;
    }
  }

  _handleNewPoint() {
    this.createPoint();
  }
}
