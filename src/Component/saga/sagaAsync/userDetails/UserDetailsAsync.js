import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects';
import { toast } from "react-toastify";
//import Api from '...'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* getUserDetailsAsync(payload) {
   var userDetails = {};
   try {
       var user = {
           uuid: payload.action.uuid
       }
      const response = yield call(fetch, 'http://localhost:3000/users/getByuuid', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
           'Content-Type': 'application/json'
           // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(user)
     });
      var data = yield response.json();
      userDetails["user"] = data[0];
      userDetails['token'] = payload.action.token;
      userDetails['success'] = true;
      yield put({type: "GET_USERDETAIL_SUCCESS", userDetails: userDetails});
   } catch (e) {
      yield put({type: "GET_USERDETAIL_ERROR", message: e.message});
   }
}

export function* updateUserAsync(action) {
   var user = action.payload.user;
   var field = action.payload.field;
   try {
       console.log(action);
      const response = yield call(fetch, 'http://localhost:3000/users/update', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
           'Content-Type': 'application/json'
           // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({user, field})
     });
      const res = yield response.json();
      if(res.success) {
         yield put({type: "GET_USERDETAIL", action: {email: user.email}});
         yield put({type: "UPDATE_USER_SUCCESS", response: res});

      }else {
         yield put({type: "UPDATE_USER_ERROR", response: res});
      }
      
   } catch (e) {
      yield put({type: "UPDATE_USER_ERROR", message: e.message});
   }
}

export function* loginUserAsync(action) {
   var user = {
      email: action.payload.email,
      password: action.payload.password
  }
   try {
       console.log(action);
      const response = yield call(fetch, 'http://localhost:3000/auth/login', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
           'Content-Type': 'application/json'
           // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(user)
     });
      const res = yield response.json();
      if(res.success) {
         localStorage.setItem("_id", res.token);
         localStorage.setItem("id_session", res.userDetails.uuid);
         yield put({type: "GET_USERDETAIL", action:{uuid: res.userDetails.uuid, token: res.token, success: res.success}});
      }
      
   } catch (e) {
      yield put({type: "LOGIN_USER_ERROR", message: e.message});
   }
}


export function* insertUserAsync(action) {
   var user = action.payload;
   try {
       console.log(action);
      const response = yield call(fetch, 'http://localhost:3000/users/add', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
           'Content-Type': 'application/json'
           // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(user)
     });
      const res = yield response.json();
      if(res.success) {
         toast.success(res.message);
         yield put({type: "ACTIVATE_ACCOUNT", payload: user});
      }
      
   } catch (e) {
      toast.error(res.message);
      yield put({type: "REGISTER_USER_ERROR", message: e.message});
   }
}


export function* activateAccountAsync(action) {
   var user = action.payload;
   try {
       console.log(action);
      const response = yield call(fetch, 'http://localhost:3000/users/activateAccount', {
        method: 'POST', 
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
     });
      const res = yield response.json();
      if(res.success) {
         toast.success(res.message);
         yield put({type: "ACTIVATE_USER_SUCCESS", message: e.message});
      }
      
   } catch (e) {
      toast.error(res.message);
      yield put({type: "ACTIVATE_USER_ERROR", message: e.message});
   }
}