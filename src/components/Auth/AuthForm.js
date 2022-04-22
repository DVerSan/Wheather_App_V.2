import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AuthContext from '../store/auth-context';
import Sppiner from '../UI/Spinner';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  //---------- Validation Form via Yup Objec-Schema ---------------------

  const userLoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Please enter a email'),
    password: Yup.string().required('Password is required'),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match'
    ),
  });

  const handleSubmit = (formDataObject) => {
    const { email } = formDataObject;
    setIsLoading(true);

    let url;

    if (isLogin) {
      url =
        ' https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD9e0oPnMQjryDLw1zTx7OkjYuIPoZZHMo';
    } else {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key= AIzaSyD9e0oPnMQjryDLw1zTx7OkjYuIPoZZHMo';
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(formDataObject),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed!';
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, expirationTime.toISOString());
        history.replace('/profile');
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(authCtx.setUserEmail(email));
  };

  return (
    <div
      className="bg-white px-8 py-10 rounded-xl shadow-md 
      md:w-1/2 mx-auto overflow-hidden"
    >
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        {isLogin ? 'Login' : 'Sign Up'}
      </h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
          // ----- Needed to Firebase Athentication -------
          returnSecureToken: true,
          // -------------------------------------------------
          cityList: '',
        }}
        onSubmit={async (inputValues, { resetForm }) => {
          await handleSubmit(inputValues);
          resetForm();
        }}
        validationSchema={userLoginSchema}
      >
        {({ errors, touched }) => {
          return (
            <>
              {isLoading && <Sppiner />}
              {!isLoading && (
                <Form className="mt-10">
                  <div className="mb-4">
                    <label className="text-gray-600" htmlFor="nombre">
                      Email:
                    </label>
                    <Field
                      id="email"
                      type="text"
                      className="mt-2 block w-full p-3 bg-gray-50 rounded-md"
                      placeholder="Enter a new user email"
                      name="email"
                    />
                    {errors.email && touched.email ? (
                      <div className="text-red-500 bg-red">{errors.email}</div>
                    ) : null}
                  </div>
                  <div className="mb-4">
                    <label className="text-gray-600" htmlFor="password">
                      Password:
                    </label>
                    <Field
                      id="password"
                      type="password"
                      className="mt-2 block w-full p-3 bg-gray-50 rounded-md"
                      placeholder="Enter your password"
                      name="password"
                    />
                    {errors.password && touched.password ? (
                      <div className="text-red-500 bg-red">
                        {errors.password}
                      </div>
                    ) : null}
                  </div>
                  <input
                    type="submit"
                    value={isLogin ? 'Login' : 'Create Account'}
                    className="mt-5 w-full bg-cta-btns p-3 text-white uppercase font-bold text-lg rounded-md cursor-pointer hover:bg-cta-btns-hov transition-all"
                  />
                  <button
                    type="button"
                    className="mt-5 text-cta-btns text-sm bg-none w-full text-center hover:text-cta-btns-hov transition-all"
                    onClick={switchAuthModeHandler}
                  >
                    {isLogin
                      ? 'Create new account'
                      : 'Login with existing account'}
                  </button>
                </Form>
              )}
            </>
          );
        }}
      </Formik>
    </div>
  );
};

export default AuthForm;
