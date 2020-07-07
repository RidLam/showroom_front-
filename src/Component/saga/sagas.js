import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
import { getCategorieAsync } from '../saga/sagaAsync/categorie/categorieAsync';
import { getRegionAsync, getDepartementAsync, getCommuneAsync, getDepartementByIdAsync } from '../saga/sagaAsync/region/regionAsync';
import { getUserDetailsAsync, updateUserAsync, loginUserAsync, insertUserAsync, activateAccountAsync } from '../saga/sagaAsync/userDetails/UserDetailsAsync';
import { contactSeller, resetPasswordAsync ,changePasswordAsync} from './sagaAsync/mailingAsync/SendMailAsync';
import { getMyAnnonceAsync, searchAnnonceAsync, getAnnonceByIdAsync, getAnnonceQuestionAsync } from '../saga/sagaAsync/annonce/AnnonceAsync';
import { sendQuestionAsync, sendReplyAsync } from '../saga/sagaAsync/question/QuestionAsync';
import ApiClient from '../Api/ApiClient';

const API_CALL = 'API_CALL';


const client = new ApiClient();

export function* watchAll() {
  yield all([
    takeEvery(API_CALL, callApi),
    // takeLatest("GET_REGION", getRegionAsync),
    // takeLatest("GET_DEPARTEMENT", getDepartementAsync),
    // takeLatest("GET_DEPARTEMENT_BY_ID", getDepartementByIdAsync),
    // takeLatest("GET_USERDETAIL", getUserDetailsAsync),
    // takeLatest("CONTACT_SELLER", contactSeller),
    // takeLatest("UPDATE_USER", updateUserAsync),
    // takeLatest("LOGIN_USER", loginUserAsync),
    // takeLatest("GET_MYANNONCE", getMyAnnonceAsync),
    // takeLatest("REGISTER_USER", insertUserAsync),
    // takeEvery("RESET_PASSWORD", resetPasswordAsync),
    // takeEvery("CHANGE_PASSWORD", changePasswordAsync),
    // takeEvery("ACTIVATE_ACCOUNT", activateAccountAsync),
    // takeEvery("SEARCH_ANNONCE", searchAnnonceAsync),
    // takeEvery("GET_ANNONCE_BY_ID", getAnnonceByIdAsync),
    // takeEvery("GET_ANNONCE_QUESTION", getAnnonceQuestionAsync),
    // takeEvery("SEND_QUESTION", sendQuestionAsync),
    // takeEvery("SEND_REPLY", sendReplyAsync),
  ])
}

export function* callApi(action) {
  try {
     var param ={};
     if(action.payload.data) {
       param.data = action.payload.data;
     }
     if(action.payload.params) {
       param.params = action.payload.params;
     }
     const response = yield client[action.payload.api.type](action.payload.api.path, param) ;
     //const categories = yield response.json();
      if(action.payload.next) {
        if(response.success) {
          next(action.payload.next);
        }
      }

     yield put({type: action.payload.types[1], payload:{response}});
  } catch (e) {
     yield put({type:  action.payload.types[2], payload: {error: e.message}});
  }
}

function next(action) {
  
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

