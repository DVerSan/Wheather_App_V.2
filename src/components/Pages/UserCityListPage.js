import classes from './UserCityListPage.module.css';
import CityList from '../Cities/CityList';

const UserCityListPage = (props) => {
  return (
    <div className={classes.pageLayout}>
      <CityList />
    </div>
  );
};

export default UserCityListPage;
