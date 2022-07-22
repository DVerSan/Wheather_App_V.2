import classes from './CityCardItem.module.css';
import React, { useEffect, useState } from 'react';
import ItemCard from '../UI/ItemCard';
import Spinner from '../UI/Spinner';
import * as weatherApi from '../../lib/weather-api';

const CityCardItem = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [cityData, setCityData] = useState();
  const { cityName, onRemoveClicked } = props;

  useEffect(() => {
    weatherApi
      .fetchWeather(cityName)
      .then(setCityData)
      .catch((error) => setHttpError(error.message))
      .finally(() => setIsLoading(false));
  }, [cityName]);

  const weatherIcon = `http://openweathermap.org/img/wn/${cityData?.weather[0].icon}.png`;

  if (isLoading) {
    return <Spinner />;
  }

  if (httpError) {
    return (
      <section>
        <p className={classes.errorMssg}>{httpError}</p>
      </section>
    );
  }

  return (
    <div key={cityData.id} className={classes.separator}>
      <ItemCard className={classes.respContainer}>
        <button className={classes.btnRemoveCity} onClick={() => onRemoveClicked(cityName)}>
          -
        </button>
        <header className={classes.dataContainer}>
          <h1>{cityData.name}</h1>
          <div className={classes.weather}>{cityData.weather[0].description}</div>
        </header>
        <div className={classes.widgetContainer}>
          <div className={classes.widgetTemp}>{`${Math.round(cityData.main.temp)}º`}</div>
          <img
            className={classes.widgetIcon}
            src={weatherIcon}
            alt="Icon showing actual weather status"
          />
        </div>

        <footer className={`${classes.dataContainer} ${classes.hidden}`}>
          <div>
            <span>H:{`${Math.round(cityData.main.temp_max)}º`}</span>
            <span> | </span>
            <span>L:{`${Math.round(cityData.main.temp_min)}º`}</span>
          </div>
          <div>Humidity: {`${cityData.main.humidity} %`}</div>
          <div>Wind: {cityData.wind.speed}</div>
        </footer>
      </ItemCard>
    </div>
  );
};

export default CityCardItem;
