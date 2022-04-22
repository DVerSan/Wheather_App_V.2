import React, { useContext, useState } from 'react';
import AuthContext from '../store/auth-context';
import classes from './CityList.module.css';
import CityCardItem from './CityCardItem';
import MainCard from '../UI/MainCard';
import SaveUserListBtn from '../UI/SaveUserListBtn';
import AddCityForm from './AddCityForm';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { useMediaQuery } from 'react-responsive';

const CityList = (props) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const [cities, setCities] = useState(
    isLoggedIn ? ['Valencia'] : [props.qSearchCityName]
  );
  const [showForm, setShowForm] = useState(false);

  // ---------- Responsive -------------------------------
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' });
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 714px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 714px)' });

  // ----------- Creating Cities List ----------------------

  const addCityInputHandler = (cityName) => {
    setCities((previousCities) => {
      return [...previousCities, cityName];
    });
    setShowForm(false);
  };

  // ----------- Removing City -----------------------------

  const removeCity = (cityName) => {
    if (!isLoggedIn) {
      props.showQserchForm();
    } else {
      const newCities = cities.filter((city) => city !== cityName);
      setCities(newCities);
    }
  };

  // ------------- Rendering CityCardItem list ---------------

  const citiesCards = cities.map((city, index) => (
    <CityCardItem key={index} cityName={city} onRemoveClicked={removeCity} />
  ));

  return (
    <div className="flex flex-col items-center">
      <section>
        {showForm && (
          <AddCityForm
            onAddCity={addCityInputHandler}
            onCloseClicked={() => {
              setShowForm(false);
            }}
          />
        )}
      </section>

      {/* ------------------------- Desktop Version ----------------------------------------------------- */}
      {(isBigScreen || isDesktopOrLaptop) && (
        <section>
          <MainCard>
            {(isLoggedIn || cities.length < 1) && (
              <>
                {cities.length === 0 && (
                  <p className="text-slate-500">
                    Click
                    <span className="text-2xl"> + </span> button to add cities
                  </p>
                )}

                <button
                  className={classes.btnShowAddForm}
                  onClick={() => {
                    setShowForm(true);
                  }}
                >
                  +
                </button>
              </>
            )}

            <ul className={classes.cityList}>{citiesCards}</ul>
          </MainCard>
        </section>
      )}

      {/* ----------------------- Mobile Version ------------------------------------------------- */}

      {isMobile && (
        <section>
          <MainCard>
            {(isLoggedIn || cities.length < 1) && (
              <button
                className={classes.btnShowAddForm}
                onClick={() => {
                  setShowForm(true);
                }}
              >
                +
              </button>
            )}
            <div className={classes.cityList}>
              <Splide
                options={{
                  arrows: false,
                  width: 271,
                  gap: 15,
                  pagination: true,
                }}
              >
                {cities.map((city, index) => (
                  <SplideSlide key={index}>
                    <CityCardItem
                      cityName={city}
                      onRemoveClicked={removeCity}
                    />
                  </SplideSlide>
                ))}
              </Splide>
            </div>
          </MainCard>
          <button></button>
        </section>
      )}
      {isLoggedIn && cities.length > 0 && (
        <SaveUserListBtn cities={cities}>Save Cities</SaveUserListBtn>
      )}
    </div>
  );
};

export default CityList;
