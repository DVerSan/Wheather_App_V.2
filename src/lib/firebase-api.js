export async function authUser(authFirebaseObjec) {
  fetch(
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key= AIzaSyD9e0oPnMQjryDLw1zTx7OkjYuIPoZZHMo',
    {
      method: 'POST',
      body: JSON.stringify(authFirebaseObjec),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  ).then((res) => {
    if (res.ok) {
      // ...
    } else {
      return res.json().then((data) => {
        let errorMssg = 'Authentication failed';
        if (data && data.error && data.error.message) {
          errorMssg = data.error.message;
        }
        return alert(errorMssg);
      });
    }
  });
}
