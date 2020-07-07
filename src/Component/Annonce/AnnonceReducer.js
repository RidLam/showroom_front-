export const GET_COMMUNES_PENDING = 'GET_COMMUNES_PENDING';
export const GET_COMMUNES_SUCCESS = 'GET_COMMUNES_SUCCESS';
export const GET_COMMUNES_ERROR = 'GET_COMMUNES_ERROR';

export const ADD_ANNONCE_PENDING = 'ADD_ANNONCE_PENDING';
export const ADD_ANNONCE_SUCCESS = 'ADD_ANNONCE_SUCCESS';
export const ADD_ANNONCE_ERROR = 'ADD_ANNONCE_ERROR';

export const GET_DEPARTEMENT_PENDING = 'GET_DEPARTEMENT_PENDING';
export const GET_DEPARTEMENT_SUCCESS = 'GET_DEPARTEMENT_SUCCESS';
export const GET_DEPARTEMENT_ERROR = 'GET_DEPARTEMENT_ERROR';

export const GET_ALL_ANNONCE_PENDING = 'GET_ALL_ANNONCE_PENDING';
export const GET_ALL_ANNONCE_SUCCESS = 'GET_ALL_ANNONCE_SUCCESS';
export const GET_ALL_ANNONCE_ERROR = 'GET_ALL_ANNONCE_ERROR';

export const SEARCH_ANNONCE_PENDING = 'SEARCH_ANNONCE_PENDING';
export const SEARCH_ANNONCE_SUCCESS = 'SEARCH_ANNONCE_SUCCESS';
export const SEARCH_ANNONCE_ERROR = 'SEARCH_ANNONCE_ERROR';

export const GET_ANNONCE_BY_ID_PENDING = 'GET_ANNONCE_BY_ID_PENDING';
export const GET_ANNONCE_BY_ID_SUCCESS = 'GET_ANNONCE_BY_ID_SUCCESS';
export const GET_ANNONCE_BY_ID_ERROR = 'GET_ANNONCE_BY_ID_ERROR';

export const CONTACT_USER_PENDING = 'CONTACT_USER_PENDING';
export const CONTACT_USER_SUCCESS = 'CONTACT_USER_SUCCESS';
export const CONTACT_USER_ERROR = 'CONTACT_USER_ERROR';

export const MESSAGE_SENT_SUCCESS = 'MESSAGE_SENT_SUCCESS';

export const GET_ANNONCE_OF_USER_PENDING = 'GET_ANNONCE_OF_USER_PENDING';
export const GET_ANNONCE_OF_USER_SUCCESS = 'GET_ANNONCE_OF_USER_SUCCESS';
export const GET_ANNONCE_OF_USER_ERROR = 'GET_ANNONCE_OF_USER_ERROR';



const initialState = {
    pending: false,
    communes: [],
    regions: [],
    departements: [],
    annonces: [],
    annonce: [],
    userAnnonces: [],
    message: null,
    success: false,
    error: null,
    isMessageSent: false
}

export default function annonceReducer(state = initialState, action) {
    switch(action.type) {
        case GET_COMMUNES_PENDING: 
            return {
                ...state,
                pending: true
            }
        case GET_COMMUNES_SUCCESS:
            return {
                ...state,
                pending: false,
                communes: action.payload.response
            }
        case GET_COMMUNES_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload.error
            }


        case ADD_ANNONCE_PENDING: 
            return {
                ...state,
                pending: true
            }
        case ADD_ANNONCE_SUCCESS:
            return {
                ...state,
                pending: false,
                message: action.payload.response.message,
                success: action.payload.response.success,
            }
        case ADD_ANNONCE_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload.error,
                message: action.payload.response.message,
                success: action.payload.response.success,
            }
        case GET_DEPARTEMENT_PENDING: 
            return {
                ...state,
                pending: true
            }
        case GET_DEPARTEMENT_SUCCESS:
            return {
                ...state,
                pending: false,
                departements: action.payload.response
            }
        case GET_DEPARTEMENT_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload.error
            }

        case GET_ALL_ANNONCE_PENDING: 
            return {
                ...state,
                pending: true
            }
        case GET_ALL_ANNONCE_SUCCESS:
            return {
                ...state,
                pending: false,
                annonces: action.payload.response
            }
        case GET_ALL_ANNONCE_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload.error
            }

        case SEARCH_ANNONCE_PENDING:
            return {
                ...state,
                pending: true,
            }
        case SEARCH_ANNONCE_SUCCESS:
            return {
                ...state,
                pending: false,
                annonces: action.payload.response
            }
        case SEARCH_ANNONCE_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload.error
            }

        case GET_ANNONCE_BY_ID_PENDING:
            return {
                ...state,
                pending: true,
            }
        case GET_ANNONCE_BY_ID_SUCCESS:
            return {
                ...state,
                pending: false,
                annonce: action.payload.response.data[0]
            }
        case GET_ANNONCE_BY_ID_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload.error
            }

        case CONTACT_USER_PENDING:
            return {
                ...state,
                pending: true,
            }
        case CONTACT_USER_SUCCESS:
            return {
                ...state,
                pending: false,
                message: action.payload.response,
                success: action.payload.success,
                isMessageSent: action.payload.response.success
            }
        case CONTACT_USER_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload.error
            }
        case GET_ANNONCE_OF_USER_PENDING:
            return {
                ...state,
                pending: true,
            }
        case GET_ANNONCE_OF_USER_SUCCESS:
            return {
                ...state,
                pending: false,
                message: action.payload.response,
                success: action.payload.success,
                userAnnonces : action.payload.response
            }
        case GET_ANNONCE_OF_USER_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload.error
            }

        case MESSAGE_SENT_SUCCESS:
            return {
                ...state,
                pending: false,
                isMessageSent: false
            }

        default: 
            return state;
    }
}

export function getCommunesById(data) {
    return {
        types: [GET_COMMUNES_PENDING, GET_COMMUNES_SUCCESS, GET_COMMUNES_ERROR],
        api:  {type: 'post',path: 'communes/getById'},
        data: data
      };
}

export function addAnnonce(annonce) {
    const data = new FormData();
    data.append('title', annonce.title);
    data.append('description', annonce.description);
    data.append('price', annonce.price);
    data.append('adresse', annonce.adresse);
    data.append('user_id', "1");
    data.append('type_annonce', '');
    data.append('commune_id', annonce.location.id);
    data.append('categorie_id', annonce.categorie.id);
    data.append('departement_id', annonce.location.departement.departement_code);
    data.append('region_id', annonce.location.code_region);

    for(var i = 0 ; i < annonce.files.length; i++) {
        data.append('files', annonce.files[i]);
    }
    return {
        types: [ADD_ANNONCE_PENDING, ADD_ANNONCE_SUCCESS, ADD_ANNONCE_ERROR],
        api:  {type: 'post',path: 'annonces/add'},
        data: data,
        params: {type: 'multipart/form-data'}
      };
}

export function getDepartementById(id) {
    return {
        types: [GET_DEPARTEMENT_PENDING, GET_DEPARTEMENT_SUCCESS, GET_DEPARTEMENT_ERROR],
        api:  {type: 'post',path: 'departements/getById'},
        data: {id}
      };
}

export function getAllAnnonces() {
    return {
        types: [GET_ALL_ANNONCE_PENDING, GET_ALL_ANNONCE_SUCCESS, GET_ALL_ANNONCE_ERROR],
        api:  {type: 'get',path: 'annonces/getAll'},
        data: {}
      };
}

export function annonceAdvancedSearch(values) {
    var data = Object.keys(values).length ? values : {}
    return {
        types: [SEARCH_ANNONCE_PENDING, SEARCH_ANNONCE_SUCCESS, SEARCH_ANNONCE_ERROR],
        api:  {type: 'post',path: 'annonces/search'},
        data:  data
      };
}

export function getAnnonceById(id) {
    return {
        types: [GET_ANNONCE_BY_ID_PENDING, GET_ANNONCE_BY_ID_SUCCESS, GET_ANNONCE_BY_ID_ERROR],
        api:  {type: 'post',path: 'annonces/getById'},
        data:  {id}
      };
}

export function contactUSer(data) {
    return {
        types: [CONTACT_USER_PENDING, CONTACT_USER_SUCCESS, CONTACT_USER_ERROR],
        api:  {type: 'post',path: 'annonces/contactUser'},
        data:  data
      };
}

export function getAnnonceOfUser(id) {
    return {
        types: [GET_ANNONCE_OF_USER_PENDING, GET_ANNONCE_OF_USER_SUCCESS, GET_ANNONCE_OF_USER_ERROR],
        api:  {type: 'post',path: 'annonces/getByUser'},
        data:  { user_id: id }
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