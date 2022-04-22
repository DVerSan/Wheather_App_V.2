import React from 'react';
import MainHeader from './MainHeader';
import classes from './PageLayout.module.css';

const PageLayout = (props) => {
  return (
    <>
      <MainHeader />
      <main className={`${classes.pageLayout} ${classes.className}`}>
        {props.children}
      </main>
    </>
  );
};
export default PageLayout;
