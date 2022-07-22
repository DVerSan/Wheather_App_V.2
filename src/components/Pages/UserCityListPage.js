import classes from './UserCityListPage.module.css';
import CityList from '../cities/CityList';

const UserCityListPage = (props) => {
  return (
    <div className={classes.pageLayout}>
      <CityList />
    </div>
  );
};

export default UserCityListPage;
