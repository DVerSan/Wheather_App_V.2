import React from 'react';
import classes from './MainCard.module.css';

const MainCard = (props) => {
  return (
    <div className={`${classes.mainCard} ${classes.className}`}>
      {props.children}
    </div>
  );
};
export default MainCard;
