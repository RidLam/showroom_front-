import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects';
import ApiClient from '../../../Api/ApiClient';

const client = new ApiClient();
//import Api from '...'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* getCategorieAsync(action) {
   try {
      //call(fetch, 'http://localhost:3000/categories/getAll')
      const categories = yield client[action.payload.api.type](action.payload.api.path, {data: {}}) ;
      //const categories = yield response.json();
      yield put({type: action.payload.types[1], categories: categories});
   } catch (e) {
      yield put({type:  action.payload.types[2], message: e.message});
   }
}