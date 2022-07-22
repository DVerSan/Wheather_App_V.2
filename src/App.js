import HomePage from './components/pages/HomePage';
import UserCityListPage from './components/pages/UserCityListPage';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import PageLayout from './components/layout/PageLayout';
import AuthPage from './components/pages/AuthPage';
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
