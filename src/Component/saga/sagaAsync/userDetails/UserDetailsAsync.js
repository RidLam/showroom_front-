import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
//import Api from '...'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* getUserDetailsAsync(action) {
   try {
       var user = {
           email: action.payload.email,
           password: action.payload.password
       }
      const response = yield call(fetch, 'http://localhost:3000/auth/login', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
           'Content-Type': 'application/json'
           // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(user)
     });
      const userDetails = yield response.json();
      yield put({type: "GET_USERDETAIL_SUCCESS", userDetails: userDetails});
   } catch (e) {
      yield put({type: "GET_USERDETAIL_ERROR", message: e.message});
   }
}