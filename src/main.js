import {createInformationTemplate} from "./view/information.js";
import {createPriceTotalTemplate} from "./view/price-total.js";

const renderHtml = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const header = document.querySelector(`.page-header`);
const headerMain = header.querySelector(`.trip-main`);

renderHtml(headerMain, createInformationTemplate(), `afterbegin`);

const headerInformation = headerMain.querySelector(`.trip-info`);

renderHtml(headerInformation, createPriceTotalTemplate(), `beforeend`);

