import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects';
import { toast } from "react-toastify";
//import Api from '...'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* contactSeller(action) {
    var data = {annonce: action.payload.annonce, client: action.payload.client, message: action.payload.message};
   try {
      const res = yield call(fetch, 'http://localhost:3000/mail/contactSeller', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
           'Content-Type': 'application/json'
           // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
      });
      const response = yield res.json();
      if(response.success) {
         yield put({type: "CONTACT_SELLER_SUCCESS", response: response});
      }else {
         yield put({type: "CONTACT_SELLER_ERROR", response: response});
      }
   } catch (e) {
      yield put({type: "CONTACT_SELLER_ERROR", message: e.message});
   }
}

export function* resetPasswordAsync(action) {
   var email = action.payload;
  try {
     const res = yield call(fetch, 'http://localhost:3000/auth/resetPassword', {
       method: 'POST', // *GET, POST, PUT, DELETE, etc.
       headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
       },
       body: JSON.stringify({email})
     });
     const response = yield res.json();
     if(response.success) {
         yield put({type: "RESET_PASSWORD_SUCCESS", response: response});
     }else {
         yield put({type: "RESET_PASSWORD_ERROR", response: response});
     }
  } catch (e) {
      toast.error(e.message);
     yield put({type: "RESET_PASSWORD_ERROR", message: e.message});
  }
}

export function* changePasswordAsync(action) {
   var { uuid, password, confirmePassword } = action.payload;
  try {
     const res = yield call(fetch, 'http://localhost:3000/auth/changePassword', {
       method: 'POST', // *GET, POST, PUT, DELETE, etc.
       headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
       },
       body: JSON.stringify({uuid, password, confirmePassword})
     });
     const response = yield res.json();
     if(response.success) {
         toast.success(response.message);
     }else {
         toast.error(response.message);
     }
     yield put({type: "CHANGE_PASSWORD_SUCCESS", response: response});
  } catch (e) {
      toast.error(e.message);
     yield put({type: "CHANGE_PASSWORD_ERROR", message: e.message});
  }
}