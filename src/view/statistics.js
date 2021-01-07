import Smart from './smart.js';
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

const BAR_HEIGHT = 55;
const DAY = 86400000;

const makeItemsUniq = (items) => {
  const result = items.map((item) => item.type.toUpperCase());
  return [...new Set(result)];
};

const getTypesPriceResult = (items, points) => {
  let typesPrice = [];
  let result = 0;
  items.forEach((item) => {
    points.forEach((point) => {
      if (point.type === item.toLowerCase()) {
        result = result + point.price;
      }
    });
    typesPrice.push(result);
    result = 0;
  });

  return typesPrice;
};

const getTypesResult = (items, points) => {
  let typesCount = [];
  let result = 0;
  items.forEach((item) => {
    points.forEach((point) => {
      if (point.type === item.toLowerCase()) {
        result++;
      }
    });
    typesCount.push(result);
    result = 0;
  });

  return typesCount;
};

const getTypesTimeResult = (items, points) => {
  let typesTime = [];
  let result = 0;
  items.forEach((item) => {
    points.forEach((point) => {
      if (point.type === item.toLowerCase()) {
        result += point.dateEnd.diff(point.dueDate) / DAY;
      }
    });
    // typesTime.push(Math.round(result));
    typesTime.push(result.toFixed(1));
    result = 0;
  });

  return typesTime;
};

const renderType = (typeCtx, points) => {
  const pointsType = makeItemsUniq(points);
  const countTypes = getTypesResult(pointsType, points);
  typeCtx.height = BAR_HEIGHT * pointsType.length;

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: pointsType,
      datasets: [{
        data: countTypes,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TYPE`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderMoney = (moneyCtx, points) => {
  const pointsType = makeItemsUniq(points);
  const sumTypes = getTypesPriceResult(pointsType, points);
  moneyCtx.height = BAR_HEIGHT * pointsType.length;

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: pointsType,
      datasets: [{
        data: sumTypes,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTimeSpend = (timeCtx, points) => {
  const pointsType = makeItemsUniq(points);
  const timeTypes = getTypesTimeResult(pointsType, points);
  timeCtx.height = BAR_HEIGHT * pointsType.length;

  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: pointsType,
      datasets: [{
        data: timeTypes,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}D`
        }
      },
      title: {
        display: true,
        text: `TIME-SPEND`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const createStatisticsTemplate = () => {
  return `<section class="statistics">
            <h2 class="visually-hidden">Trip statistics</h2>
            <div class="statistics__item statistics__item--money">
              <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
            </div>
            <div class="statistics__item statistics__item--transport">
              <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
            </div>
            <div class="statistics__item statistics__item--time-spend">
              <canvas class="statistics__chart statistics__chart--time" width="900"></canvas>
            </div>
          </section>`;
};

export default class Statistics extends Smart {
  constructor(model) {
    super();
    this._points = model.get();

    this._money = null;
    this._transport = null;
    this._time = null;
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  getMoney() {
    return this.getElement().querySelector(`.statistics__chart--money`);
  }

  getTransport() {
    return this.getElement().querySelector(`.statistics__chart--transport`);
  }

  getTimeSpend() {
    return this.getElement().querySelector(`.statistics__chart--time`);
  }

  show() {
    super.show();
    this._set();
  }

  hide() {
    super.hide();
    this._removeElement();
  }

  _set() {

    if (this._money !== null || this._transport !== null || this._time !== null) {
      this._money = null;
      this._transport = null;
      this._time = null;
    }

    const moneyCtx = this.getMoney();
    const typeCtx = this.getTransport();
    const timeCtx = this.getTimeSpend();

    this._money = renderMoney(moneyCtx, this._points);
    this._transport = renderType(typeCtx, this._points);
    this._time = renderTimeSpend(timeCtx, this._points);
  }

  _removeElement() {
    super.removeElement();

    if (this._money !== null || this._transport !== null || this._time !== null) {
      this._money = null;
      this._transport = null;
      this._time = null;
    }
  }

}
