
import HeaderMenu from "./view/header-menu.js";
import Travel from "./presenter/travel.js";
import FilterPresenter from "./presenter/filter.js";
import {UpdateType} from "./const.js";
import {renderElement, remove} from "./utils/render.js";
import {RenderPosition} from "./utils/render.js";
import PointsModel from "./model/points.js";
import OffersModel from "./model/offers.js";
import FilterModel from "./model/filter.js";
import {MenuItem} from "./const.js";
import StatisticsView from "./view/statistics.js";
import Api from "./api.js";

const AUTHORIZATION = `Basic **SlvMY$68`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip/`;

export const api = new Api(END_POINT, AUTHORIZATION);

export const pointsModel = new PointsModel();
export const offersModel = new OffersModel();

const headerMain = document.querySelector(`.trip-main`);
const headerControl = headerMain.querySelector(`.trip-controls`);
const headerTitle = headerControl.querySelectorAll(`h2`);
// renderElement(headerTitle[0], new HeaderMenu(), RenderPosition.AFTEREND);

const siteMenuComponent = new HeaderMenu();
let statisticsComponent = null;

const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter(headerTitle[1], filterModel);
filterPresenter.init();

// const buttonEvent = new Button();
// renderElement(headerMain, buttonEvent, RenderPosition.BEFOREEND);

const containerContent = document.querySelector(`.trip-events`);

const travel = new Travel(containerContent, pointsModel, filterModel, api, offersModel, headerMain);
// travel.init();

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      travel.show();
      remove(statisticsComponent);
      statisticsComponent.hide();
      break;
    case MenuItem.STATS:
      statisticsComponent = new StatisticsView(pointsModel);
      renderElement(containerContent, statisticsComponent, RenderPosition.AFTEREND);
      travel.hide();
      statisticsComponent.show();
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

const promiseEvent = api.getEvents();
const promiseOffers = api.getOffers();
const promiseDestinations = api.getDestinations();

const resolvePromiseEvent = (points) => {
  // travel.init();
  pointsModel.set(UpdateType.INIT, points);
};

Promise
  .all([
    promiseEvent,
    promiseOffers,
    promiseDestinations
  ])
  .then((response) => {
    const [points, offers, destinations] = response;
    travel.init();
    resolvePromiseEvent(points);
    offersModel.set(offers);
    pointsModel.setDestination(destinations);
  })
  .finally(() => {
    renderElement(headerTitle[0], siteMenuComponent, RenderPosition.AFTEREND);
  })
  .catch(() => {
    pointsModel.set(UpdateType.INIT, []);
  });

// travel.init();

