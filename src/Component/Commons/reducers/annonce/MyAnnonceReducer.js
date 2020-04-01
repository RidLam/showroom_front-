import {GET_MYANNONCE_PENDING, GET_MYANNONCE_SUCCESS, GET_MYANNONCE_ERROR, SEARCH_ANNONCE_SUCCESS, SEARCH_ANNONCE_ERROR,
GET_ANNONCE_BY_ID_SUCCESS,GET_ANNONCE_BY_ID_ERROR, GET_ANNONCE_QUESTION_SUCCESS, GET_ANNONCE_QUESTION_ERROR} from './MyAnnonceActions';

const initialState = {
    pending: false,
    myAnnonces: [],
    error: null,
    annonces: [],
    myAnnonce: {}
}

export default function annonceReducer(state = initialState, action) {
    switch(action.type) {
        case GET_MYANNONCE_PENDING: 
            return {
                ...state,
                pending: true
            }
        case GET_MYANNONCE_SUCCESS:
            return {
                ...state,
                pending: false,
                myAnnonces: action.myAnnonces
            }
        case GET_MYANNONCE_ERROR:
            return {
                ...state,
                pending: false,
                error: action.message
            }
        case SEARCH_ANNONCE_SUCCESS:
            return {
                ...state,
                pending: false,
                annonces: action.annonces
            }
        case SEARCH_ANNONCE_ERROR:
            return {
                ...state,
                pending: false,
                error: action.message
            }
        case GET_ANNONCE_BY_ID_SUCCESS:
            return {
                ...state,
                pending: false,
                myAnnonce: action.myAnnonce[0]
            }
        case GET_ANNONCE_BY_ID_ERROR:
            return {
                ...state,
                pending: false,
                error: action.message
            }
        case GET_ANNONCE_QUESTION_SUCCESS:
            return {
                ...state,
                pending: false,
                annonceQuestions: action.annonceQuestions
            }
        case GET_ANNONCE_QUESTION_ERROR:
            return {
                ...state,
                pending: false,
                error: action.message
            }
        default: 
            return state;
    }
}
