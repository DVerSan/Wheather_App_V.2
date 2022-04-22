import React from 'react';
import classes from './ItemCard.module.css';

const ItemCard = (props) => {
  return (
    <div className={`${classes.itemCard} ${classes.className}`}>
      {props.children}
    </div>
  );
};
export default ItemCard;
