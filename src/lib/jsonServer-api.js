// ############ !!!! SEREVER MUST RUN IN LOCAL PORT 4000 !!!!! ####################

//                 -> json-server --watch db.json --port 4000

// ####################################################################################

// ------------------- POST User LogIn Data from server db.json ---------------------

export async function postUserLogin(userLoginData) {
  try {
    const url = 'http://localhost:4000/userLoginData';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(userLoginData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log(error);
  }
}

// ------------------- GET User LogIn Data from server db.json ---------------------

export async function usersLoginDataList() {
  try {
    const url = 'http://localhost:4000/userLoginData';
    const response = await fetch(url);
    const result = await response.jason;

    if (!result.ok) {
      throw new Error('🚨 Something went wrong!');
    }
  } catch (error) {
    console.log(error);
  }
}
