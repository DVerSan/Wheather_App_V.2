import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import classes from './MainHeader.module.css';

const MainHeader = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    // optional: redirect the user
  };

  return (
    <header className={classes.header}>
      <Link to="/" className={classes.logo}>
        Weather App
      </Link>
      <nav className={classes.nav}>
        <ul>
          <li>
            {!isLoggedIn && (
              <Link
                to="/auth"
                className="inline-block w-full border border-cta-btn rounded-md py-1 px-6 text-white text-center hover:bg-cta-btns-dark transition-all duration-500"
              >
                Login
              </Link>
            )}
          </li>
          <li>
            {isLoggedIn && (
              <Link
                to="/user-cities-list"
                className="inline-block w-full border border-cta-btn rounded-md py-1 px-6 text-white text-center hover:bg-cta-btns-dark transition-all
                duration-500"
              >
                Cities
              </Link>
            )}
          </li>
          <li>
            {isLoggedIn && (
              <Link
                onClick={logoutHandler}
                className="inline-block w-full border border-cta-btn rounded-md py-1 px-6 text-white text-center hover:bg-cta-btns-dark transition-all
                duration-500"
              >
                Logout
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
