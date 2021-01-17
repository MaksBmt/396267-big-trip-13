
import HeaderMenu from "./view/header-menu.js";
import Travel from "./presenter/travel.js";
import FilterPresenter from "./presenter/filter.js";
import {UpdateType} from "./const.js";
import {renderElement, remove} from "./utils/render.js";
import {RenderPosition} from "./utils/render.js";
import PointsModel from "./model/points.js";
import OffersModel from "./model/offers.js";
import DestinationModel from "./model/destinations.js";
import FilterModel from "./model/filter.js";
import {MenuItem} from "./const.js";
import StatisticsView from "./view/statistics.js";
import Api from "./api.js";

const AUTHORIZATION = `Basic **SlvMY$68`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip/`;

export const api = new Api(END_POINT, AUTHORIZATION);

export const pointsModel = new PointsModel();
export const offersModel = new OffersModel();
export const destinationsModel = new DestinationModel();

const headerMain = document.querySelector(`.trip-main`);
const headerControl = headerMain.querySelector(`.trip-controls`);
const headerTitle = headerControl.querySelectorAll(`h2`);

const siteMenuComponent = new HeaderMenu();
let statisticsComponent = null;

const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter(headerTitle[1], filterModel);
filterPresenter.init();

const containerContent = document.querySelector(`.trip-events`);

const travel = new Travel(containerContent, pointsModel, filterModel, api, offersModel, destinationsModel, headerMain);

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

Promise
  .all([
    api.getEvents(),
    api.getOffers(),
    api.getDestinations()
  ])
  .then(([points, offers, destinations]) => {
    destinationsModel.set(destinations);
    offersModel.set(offers);
    travel.init();
    pointsModel.set(UpdateType.INIT, points);
  })
  .finally(() => {
    renderElement(headerTitle[0], siteMenuComponent, RenderPosition.AFTEREND);
  })
  .catch(() => {
    pointsModel.set(UpdateType.INIT, []);
  });


