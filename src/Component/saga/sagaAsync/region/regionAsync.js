import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
//import Api from '...'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* getRegionAsync(action) {
   try {
      const response = yield call(fetch, 'http://localhost:3000/regions/getAll');
      const regions = yield response.json();
      yield put({type: "GET_REGION_SUCCESS", regions: regions});
   } catch (e) {
      yield put({type: "GET_REGION_ERROR", message: e.message});
   }
 }

 export function* getDepartementAsync(action) {
   try {
      const response = yield call(fetch, 'http://localhost:3000/departements/getAll');
      const regions = yield response.json();
      yield put({type: "GET_REGION_SUCCESS", regions: regions});
   } catch (e) {
      yield put({type: "GET_REGION_ERROR", message: e.message});
   }
 }

 export function* getCommuneAsync(action) {
   try {
      const response = yield call(fetch, 'http://localhost:3000/communes/getAll');
      const regions = yield response.json();
      yield put({type: "GET_REGION_SUCCESS", regions: regions});
   } catch (e) {
      yield put({type: "GET_REGION_ERROR", message: e.message});
   }
 }

 export function* getDepartementByIdAsync(action) {
   try {
      const response = yield call(fetch, 'http://localhost:3000/departements/getById', {
         method: 'POST', // *GET, POST, PUT, DELETE, etc.
         headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
         },
         body: JSON.stringify({id: action.payload})
      });
      const departements = yield response.json();
      yield put({type: "GET_DEPARTEMENT_BY_ID", departements: departements});
   } catch (e) {
      yield put({type: "GET_DEPARTEMENT_BY_ID", message: e.message});
   }
 }