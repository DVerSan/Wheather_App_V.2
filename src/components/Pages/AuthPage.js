import AuthForm from '../Auth/AuthForm';
import classes from '../Pages/HomePage.module.css';

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
