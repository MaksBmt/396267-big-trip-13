
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
import Api from "./api/api.js";
import {isOnline} from "./utils/common.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";
import {toast} from "./utils/toast/toast.js";

const AUTHORIZATION = `Basic **SlvMY$68`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip/`;
const STORE_PREFIX = `bigtrip-localstorage`;
const STORE_VER = `v13`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

export const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

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

const travel = new Travel(containerContent, pointsModel, filterModel, apiWithProvider, offersModel, destinationsModel, headerMain);

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      travel.show();
      remove(statisticsComponent);
      statisticsComponent.hide();
      break;
    case MenuItem.STATS:
      statisticsComponent = new StatisticsView(pointsModel);
      if (!isOnline()) {
        toast(`You can't create new task offline`);
        remove(statisticsComponent);
        statisticsComponent.hide();
        break;
      }
      renderElement(containerContent, statisticsComponent, RenderPosition.AFTEREND);
      travel.hide();
      statisticsComponent.show();
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

Promise
  .all([
    apiWithProvider.get(),
    apiWithProvider.getOffers(),
    apiWithProvider.getDestinations()
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

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});


