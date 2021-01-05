import FilterSort from "../view/filter-sort.js";
import EventList from "../view/event-list.js";
import NoPoint from "../view/no-point.js";
import Loading from "../view/loading.js";
import Information from "../view/information.js";
import PriceTotal from "../view/price-total.js";
import Mark from "./mark.js";
import Button from "../view/button-event.js";
import PointNewPresenter from "./point-new.js";
import {renderElement} from "../utils/render.js";
import {RenderPosition, remove} from "../utils/render.js";
import {priceSortPoints, intervalSortPoints, defaultSortPoints} from "../utils/common.js";
import {filter} from "../utils/filter.js";
import {SortType, UpdateType, UserAction, FilterType} from "../const.js";


export default class Travel {
  constructor(containerContent, pointsModel, filterModel, api) {
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._containerContent = containerContent;
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

    this._button = new Button();
    this._loadingComponent = new Loading();

    this.headerMain = document.querySelector(`.trip-main`);

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._handleNewPoint = this._handleNewPoint.bind(this);

    this._pointNewPresenter = new PointNewPresenter(this._listComponent, this._handleViewAction, this._pointsModel);
  }

  init() {
    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderListContent();
  }

  destroy() {
    this._clearListContent({resetRenderedPointCount: true, resetSortType: true});

    remove(this._listComponent);

    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
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

  sumCheckOfferPrice(offers) {

    const offersPrice = offers
      .filter((offer) => offer.isChecked)
      .map((offer) => offer.price);

    return offersPrice.reduce((sum, current) => sum + current, 0);
  }

  totalPrice() {
    const points = this._pointsModel.get();
    const pointPrice = points.map((point) => point.price);
    // const totalPriceOffersCheck = points.map((point) => this.sumCheckOfferPrice(point.offers)).reduce((sum, current) => sum + current, 0);
    const totalPriceOffersCheck = 0;
    return pointPrice.reduce((sum, current) => sum + current, 0) + totalPriceOffersCheck;
  }

  informationCity(points) {
    return points.map((point) => point.city);
  }

  _renderInformationCity(points) {
    if (this._informationCityComponent !== null) {
      this._informationCityComponent = null;
    }

    if (points.length !== 0) {
      this._informationCityComponent = new Information(this.informationCity(points));
      renderElement(this.headerMain, this._informationCityComponent, RenderPosition.AFTERBEGIN);
    }
  }

  _renderPriceTotal(points) {
    if (this._priceTotalComponent !== null) {
      this._priceTotalComponent = null;
    }
    if (points.length !== 0) {
      const headerInformation = this.headerMain.querySelector(`.trip-info`);
      this._priceTotalComponent = new PriceTotal(this.totalPrice());
      renderElement(headerInformation, this._priceTotalComponent, RenderPosition.BEFOREEND);
    }

  }

  _renderNoPoint() {
    renderElement(this._containerContent, this._noComponent, RenderPosition.BEFOREEND);
  }

  _renderLoading() {
    renderElement(this._containerContent, this._loadingComponent, RenderPosition.AFTERBEGIN);
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
    const mark = new Mark(listComponent, this._handleViewAction, this._handleModeChange, this._isNewPoint, this._pointsModel);
    mark.init(subject);
    this._mark[subject.id] = mark;
  }

  _renderPoints(subjects) {
    for (const subject of subjects) {
      this._renderPoint(this._listComponent, subject, this._pointsModel);
    }
  }

  createPoint() {
    this._currentSortType = SortType.DEFAULT;
    this._filterModel.set(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._pointNewPresenter.init();
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
    const pointCount = points.length;

    if (pointCount === 0) {
      this._renderNoPoint();

      return;
    }

    this._button.setNewPointClickHandler(this._handleNewPoint);
    this._renderInformationCity(points);
    this._renderPriceTotal(points);
    this._renderSort();
    renderElement(this._containerContent, this._listComponent, RenderPosition.BEFOREEND);
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
        this._pointsModel.update(updateType, update);
        this._api.updateEvent(update).then((response) => {
          this._pointsModel.updateTask(updateType, response);
        });
        break;
      case UserAction.ADD_TASK:
        this._pointsModel.add(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this._pointsModel.delete(updateType, update);
        break;
    }
  }

  _handleNewPoint() {
    this.createPoint();
  }
}
