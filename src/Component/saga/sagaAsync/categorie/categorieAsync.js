import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
//import Api from '...'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* getCategorieAsync(action) {
   try {
      const response = yield call(fetch, 'http://localhost:3000/categories/getAll');
      const categories = yield response.json();
      yield put({type: "GET_CATEGORIE_SUCCESS", categories: categories});
   } catch (e) {
      yield put({type: "GET_CATEGORIE_ERROR", message: e.message});
   }
}