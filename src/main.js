import {createInformationTemplate} from "./view/information.js";
import {createPriceTotalTemplate} from "./view/price-total.js";
import {createHeaderMenuTemplate} from "./view/header-menu.js";
import {createFilterEventsTemplate} from "./view/filter-events.js";

const renderHtml = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const header = document.querySelector(`.page-header`);
const headerMain = header.querySelector(`.trip-main`);

renderHtml(headerMain, createInformationTemplate(), `afterbegin`);

const headerInformation = headerMain.querySelector(`.trip-info`);

renderHtml(headerInformation, createPriceTotalTemplate(), `beforeend`);

const headerControl = headerMain.querySelector(`.trip-controls`);
const headerTitle = headerControl.querySelectorAll(`h2`);

renderHtml(headerTitle[0], createHeaderMenuTemplate(), `afterend`);

renderHtml(headerTitle[1], createFilterEventsTemplate(), `afterend`);
