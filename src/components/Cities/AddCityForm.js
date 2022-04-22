import React, { useRef } from 'react';
import classes from './AddCityForm.module.css';

function AddCityForm(props) {
  const { onAddCity, onCloseClicked } = props;
  const cityName = useRef('');

  const submitHandler = (event) => {
    event.preventDefault();

    onAddCity(cityName.current.value);

    onCloseClicked(false);
  };

  return (
    <section>
      <div>
        <div
          className={classes.backdrop}
          onClick={() => onCloseClicked(false)}
        ></div>
      </div>
      <div className={classes.modal}>
        <form onSubmit={submitHandler}>
          <div className={classes.container}>
            <button
              className={classes.closeFormBtn}
              onClick={() => onCloseClicked(false)}
            >
              X
            </button>
            <label className={classes.header} htmlFor="cityName">
              Please, enter a city name...
            </label>
            <input
              placeholder="City name"
              type="text"
              id="title"
              ref={cityName}
            />
            <button type="submit" className={classes.addBtn}>
              Add
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddCityForm;
