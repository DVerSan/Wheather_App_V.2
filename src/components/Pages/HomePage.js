import { useContext, useRef, useState } from 'react';
import classes from '../pages/HomePage.module.css';
import AuthContext from '../store/auth-context';
import CityList from '../cities/CityList';

const HomePage = () => {
  const [ShowQsearchForm, setShowQsearchForm] = useState(true);
  const [qScityName, setQsCityName] = useState('');

  const authCtx = useContext(AuthContext);
  const userIsLoged = authCtx.isLoggedIn;
  const cityName = useRef('');

  const submitHandler = (event) => {
    event.preventDefault();

    setShowQsearchForm(false);

    setQsCityName(cityName.current.value);
  };

  const showQserchFormHandler = () => {
    setShowQsearchForm(true);
    setQsCityName('');
  };

  return (
    <main className={classes.background}>
      {!userIsLoged && ShowQsearchForm && !qScityName && (
        <section className={classes.main}>
          <p>LET'S FIND THE WEATHER ANYWHERE...</p>
          <form className={classes.nav} onSubmit={submitHandler}>
            <input
              className="mt-2 block w-full p-3 bg-gray-50 rounded-md"
              id="cityName"
              type="text"
              placeholder="Enter location"
              ref={cityName}
            />
            <button className={classes.mainBtn}>Have a Look</button>
          </form>
        </section>
      )}
      {!userIsLoged && !ShowQsearchForm && qScityName && (
        <section className={`${classes.main} ${classes.backdrop} `}>
          <CityList qSearchCityName={qScityName} showQserchForm={showQserchFormHandler} />
        </section>
      )}
    </main>
  );
};

export default HomePage;
