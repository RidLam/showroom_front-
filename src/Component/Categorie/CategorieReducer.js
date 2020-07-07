export const GET_ANNONCE = 'GET_ANNONCE';
export const GET_ANNONCE_PENDING = 'GET_ANNONCE_PENDING';
export const GET_ANNONCE_SUCCESS = 'GET_ANNONCE_SUCCESS';
export const GET_ANNONCE_ERROR = 'GET_ANNONCE_ERROR';

export const GET_ANNONCE_BY_ID = 'GET_ANNONCE_BY_ID';
export const GET_ANNONCE_BY_ID_SUCCESS = 'GET_ANNONCE_BY_ID_SUCCESS';
export const GET_ANNONCE_BY_ID_ERROR = 'GET_ANNONCE_BY_ID_ERROR';

export const GET_ANNONCE_QUESTION = 'GET_ANNONCE_QUESTION';
export const GET_ANNONCE_QUESTION_SUCCESS = 'GET_ANNONCE_QUESTION_SUCCESS';
export const GET_ANNONCE_QUESTION_ERROR = 'GET_ANNONCE_QUESTION_ERROR';


const initialState = {
    pending: false,
    annonces: [],
    error: null,
    annonces: [],
    myAnnonce: {}
}

export default function annonceReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ANNONCE_PENDING: 
            return {
                ...state,
                pending: true
            }
        case GET_ANNONCE_SUCCESS:
            return {
                ...state,
                pending: false,
                annonces: action.payload.response
            }
        case GET_ANNONCE_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload.error
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


export function getAnnonces(values) {
    return {
        types: [GET_ANNONCE_PENDING, GET_ANNONCE_SUCCESS, GET_ANNONCE_ERROR],
        api:  {type: 'get',path: 'annonces/getAll'},
        data:  {}
      };
}




function objectToParams(object) {
    let str = '';
    for (const key in object) {
      if (str !== '') {
        str += '&';
      }
      str += key + '=' + encodeURIComponent(object[key]);
    }
    return str;
  }