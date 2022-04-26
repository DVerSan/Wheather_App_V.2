// ------------------  POST Request to get auth token from Firebase  ------------------

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

// --------------  POST Request to store user cities list in Firebase  -----------------

export async function postUserCitiesList(userDataObject) {
  const { idToken, uid, cities } = userDataObject;

  const url = `https://weather-app-2049c-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json?auth=${idToken}`;

  fetch(url, {
    method: 'PUT',
    body: JSON.stringify({ cities }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (res.ok) {
      return alert('Your list has been saved');
    } else {
      return res.json().then((data) => {
        let errorMssg = 'Data can´t be stored. Please, try again';
        if (data && data.error && data.error.message) {
          errorMssg = data.error.message;
        }
        return alert(errorMssg);
      });
    }
  });
}
