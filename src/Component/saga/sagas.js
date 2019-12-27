import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
import { getCategorieAsync } from '../saga/sagaAsync/categorie/categorieAsync';
import { getRegionAsync, getDepartementAsync, getCommuneAsync, getDepartementByIdAsync } from '../saga/sagaAsync/region/regionAsync';
import { getUserDetailsAsync } from '../saga/sagaAsync/userDetails/UserDetailsAsync';



export function* watchAll() {
  yield all([
    takeEvery("GET_CATEGORIE", getCategorieAsync),
    takeEvery("GET_REGION", getRegionAsync),
    takeEvery("GET_DEPARTEMENT", getDepartementAsync),
    takeEvery("GET_DEPARTEMENT_BY_ID", getDepartementByIdAsync),
    takeEvery("GET_USERDETAIL", getUserDetailsAsync),
  ])
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
// function* mySaga() {
//   yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
// }

