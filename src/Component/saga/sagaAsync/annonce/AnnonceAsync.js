import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
//import Api from '...'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* getMyAnnonceAsync(payload) {
    var user = {user_id: payload.action.user_id};
   try {
      const response = yield call(fetch, 'http://localhost:3000/annonces/getByUser',{
        method: 'POST', 
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_id: 2})
      });
      const myAnnonces = yield response.json();
      yield put({type: "GET_MYANNONCE_SUCCESS", annonces: myAnnonces});
   } catch (e) {
      yield put({type: "GET_MYANNONCE_ERROR", message: e.message});
   }
}


export function* searchAnnonceAsync(action) {
   var data =  action.payload;
  try {
     const response = yield call(fetch, 'http://localhost:3000/annonces/search',{
       method: 'POST', 
       headers: {
          'Content-Type': 'application/json'
       },
       body: JSON.stringify(data)
     });
     const annonces = yield response.json();
     yield put({type: "SEARCH_ANNONCE_SUCCESS", annonces: annonces});
  } catch (e) {
     yield put({type: "SEARCH_ANNONCE_ERROR", message: e.message});
  }
}

export function* getAnnonceByIdAsync(action) {
   var id =  action.payload;
  try {
     const response = yield call(fetch, 'http://localhost:3000/annonces/getById',{
       method: 'POST', 
       headers: {
          'Content-Type': 'application/json'
       },
       body: JSON.stringify({id})
     });
     const myAnnonce = yield response.json();
     if(myAnnonce.success) {
         yield put({type: "GET_ANNONCE_QUESTION", payload: myAnnonce.data[0].id});
         yield put({type: "GET_ANNONCE_BY_ID_SUCCESS", myAnnonce: myAnnonce.data});
     }
     
  } catch (e) {
     yield put({type: "GET_ANNONCE_BY_ID_ERROR", message: e.message});
  }
}

export function* getAnnonceQuestionAsync(action) {
   var id =  action.payload;
  try {
     const response = yield call(fetch, 'http://localhost:3000/questions/getByAnnonceId',{
       method: 'POST', 
       headers: {
          'Content-Type': 'application/json'
       },
       body: JSON.stringify({id})
     });
     const questions = yield response.json();
      yield put({type: "GET_ANNONCE_QUESTION_SUCCESS", annonceQuestions: questions});
     
  } catch (e) {
     yield put({type: "GET_ANNONCE_QUESTION_ERROR", message: e.message});
  }
}