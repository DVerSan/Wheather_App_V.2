import AuthForm from '../auth/AuthForm';
import classes from '../pages/HomePage.module.css';

const AuthPage = (props) => {
  return (
    <main className={classes.background}>
      <section className={classes.main}>
        <AuthForm />
      </section>
    </main>
  );
};
export default AuthPage;
