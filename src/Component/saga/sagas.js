import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
import { getCategorieAsync } from '../saga/sagaAsync/categorie/categorieAsync';
import { getRegionAsync, getDepartementAsync, getCommuneAsync, getDepartementByIdAsync } from '../saga/sagaAsync/region/regionAsync';
import { getUserDetailsAsync, updateUserAsync, loginUserAsync, insertUserAsync, activateAccountAsync } from '../saga/sagaAsync/userDetails/UserDetailsAsync';
import { contactSeller, resetPasswordAsync ,changePasswordAsync} from './sagaAsync/mailingAsync/SendMailAsync';
import { getMyAnnonceAsync, searchAnnonceAsync, getAnnonceByIdAsync, getAnnonceQuestionAsync } from '../saga/sagaAsync/annonce/AnnonceAsync';
import { sendQuestionAsync, sendReplyAsync } from '../saga/sagaAsync/question/QuestionAsync';


export function* watchAll() {
  yield all([
    takeLatest("GET_CATEGORIE", getCategorieAsync),
    takeLatest("GET_REGION", getRegionAsync),
    takeLatest("GET_DEPARTEMENT", getDepartementAsync),
    takeLatest("GET_DEPARTEMENT_BY_ID", getDepartementByIdAsync),
    takeLatest("GET_USERDETAIL", getUserDetailsAsync),
    takeLatest("CONTACT_SELLER", contactSeller),
    takeLatest("UPDATE_USER", updateUserAsync),
    takeLatest("LOGIN_USER", loginUserAsync),
    takeLatest("GET_MYANNONCE", getMyAnnonceAsync),
    takeLatest("REGISTER_USER", insertUserAsync),
    takeEvery("RESET_PASSWORD", resetPasswordAsync),
    takeEvery("CHANGE_PASSWORD", changePasswordAsync),
    takeEvery("ACTIVATE_ACCOUNT", activateAccountAsync),
    takeEvery("SEARCH_ANNONCE", searchAnnonceAsync),
    takeEvery("GET_ANNONCE_BY_ID", getAnnonceByIdAsync),
    takeEvery("GET_ANNONCE_QUESTION", getAnnonceQuestionAsync),
    takeEvery("SEND_QUESTION", sendQuestionAsync),
    takeEvery("SEND_REPLY", sendReplyAsync),
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

