

const correctsListCities = (cities) => {
  const listCities = [];
  listCities.push(cities.shift());
  listCities.push(cities.pop());
  return listCities.join(` &mdash; ...  &mdash; `);
};


export const createInformationTemplate = (informationCity) => {

  const infoCity = informationCity.length < 3
    ? informationCity.join(` &mdash; `)
    : correctsListCities(informationCity);
  return (`
    <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${infoCity}</h1>

      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>
  </section>
    `);
};
