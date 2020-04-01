import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
//import Api from '...'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* sendQuestionAsync(action) {
    var question = action.payload;
   try {
      const response = yield call(fetch, 'http://localhost:3000/questions/add',  {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
           'Content-Type': 'application/json'
           // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(question)
      });
      const res = yield response.json();
      if(res.success) {
        yield put({type: "SEND_QUESTION_SUCCESS", success: res.success});
        yield put({type: "GET_ANNONCE_QUESTION", payload: question.annonce_uuid});
      }
   } catch (e) {
      yield put({type: "SEND_QUESTION_ERROR", message: e.message});
   }
}

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* sendReplyAsync(action) {
   var reply = action.payload.reply;
   var annonce_uuid = action.payload.annonce_uuid;
  try {
     const response = yield call(fetch, 'http://localhost:3000/replies/add',  {
       method: 'POST', // *GET, POST, PUT, DELETE, etc.
       headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
       },
       body: JSON.stringify(reply)
     });
     const res = yield response.json();
     if(res.success) {
       yield put({type: "SEND_REPLY_SUCCESS", success: res.success});
       yield put({type: "GET_ANNONCE_QUESTION", payload: annonce_uuid});
     }
  } catch (e) {
     yield put({type: "SEND_REPLY_ERROR", message: e.message});
  }
}