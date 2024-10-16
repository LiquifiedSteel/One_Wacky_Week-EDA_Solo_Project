import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

// worker Saga: will be fired on "FLAG_USER" actions
function* flagUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will flag their account
    // for deletion and they will no longer have access to it
    yield axios.put('/api/user/deleteAccount', config);

    // we then logout the user, they will no longer
    // be able to log in with this account
    yield put({ type: 'LOGOUT' });
  } catch (error) {
    console.log('User put request failed', error);
  }
}


function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('FLAG_ACCOUNT', flagUser);
}

export default userSaga;
