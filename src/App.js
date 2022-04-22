import HomePage from './components/Pages/HomePage';
import UserCityListPage from './components/Pages/UserCityListPage';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import PageLayout from './components/Layout/PageLayout';
import AuthPage from './components/Pages/AuthPage';
import AuthContext from './components/store/auth-context';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <PageLayout>
      <Switch>
        <Route path="/" exact>
          {!authCtx.isLoggedIn && <HomePage />}
          {authCtx.isLoggedIn && <Redirect to="/user-cities-list" />}
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        <Route path="/user-cities-list">
          {authCtx.isLoggedIn && <UserCityListPage />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </PageLayout>
  );
}

export default App;
