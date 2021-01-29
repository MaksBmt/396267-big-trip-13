
import HeaderMenu from "./view/header-menu.js";
import Travel from "./presenter/travel.js";
import FilterPresenter from "./presenter/filter.js";
import {UpdateType, MenuItem, RenderPosition} from "./const.js";
import {renderElement, remove} from "./utils/render.js";
import {isOnline} from "./utils/common.js";
import PointsModel from "./model/points.js";
import OffersModel from "./model/offers.js";
import DestinationModel from "./model/destinations.js";
import FilterModel from "./model/filter.js";
import Button from "./view/button-new-point.js";
import StatisticsView from "./view/statistics.js";
import Api from "./api/api.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";

const AUTHORIZATION = `Basic **SlvMY$6878`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip/`;
const STORE_PREFIX = `bigtrip-localstorage`;
const STORE_VER = `v13`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationModel();

const headerMain = document.querySelector(`.trip-main`);
const headerControl = headerMain.querySelector(`.trip-controls`);
const headerTitle = headerControl.querySelectorAll(`h2`);

const siteMenuComponent = new HeaderMenu();
const buttonNewPoint = new Button();
let statisticsComponent = null;

const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter(headerTitle[1], filterModel);
filterPresenter.init();

const containerContent = document.querySelector(`.trip-events`);

const travel = new Travel(containerContent, pointsModel, filterModel, apiWithProvider, offersModel, destinationsModel, headerMain, buttonNewPoint);

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      travel.show();
      if (isOnline()) {
        buttonNewPoint.enable();
      }
      remove(statisticsComponent);
      statisticsComponent.hide();
      filterPresenter.init();
      filterPresenter.enableAllFilters();
      break;
    case MenuItem.STATS:
      statisticsComponent = new StatisticsView(pointsModel);
      renderElement(containerContent, statisticsComponent, RenderPosition.AFTEREND);
      travel.hide();
      buttonNewPoint.disable();
      statisticsComponent.show();
      filterPresenter.init();
      filterPresenter.disableAllFilters();
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

Promise
  .all([
    apiWithProvider.getEvents(),
    apiWithProvider.getOffers(),
    apiWithProvider.getDestinations()
  ])
  .then(([points, offers, destinations]) => {
    destinationsModel.set(destinations);
    offersModel.set(offers);
    travel.init(filterPresenter);
    pointsModel.set(UpdateType.INIT, points);
  })
  .finally(() => {
    renderElement(headerTitle[0], siteMenuComponent, RenderPosition.AFTEREND);
    renderElement(headerMain, buttonNewPoint, RenderPosition.BEFOREEND);
  })
  .catch(() => {
    pointsModel.set(UpdateType.INIT, []);
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
  buttonNewPoint.enable();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
  buttonNewPoint.disable();
});
