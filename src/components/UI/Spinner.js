import React from 'react';
import classes from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={classes.spinnerContainer}>
      <div className={classes.lds_ripple}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
