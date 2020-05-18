export const GET_CATEGORIE_PENDING = 'GET_CATEGORIE_PENDING';
export const GET_CATEGORIE_SUCCESS = 'GET_CATEGORIE_SUCCESS';
export const GET_CATEGORIE_ERROR = 'GET_CATEGORIE_ERROR';

export const GET_REGION_PENDING = 'GET_REGION_PENDING';
export const GET_REGION_SUCCESS = 'GET_REGION_SUCCESS';
export const GET_REGION_ERROR = 'GET_REGION_ERROR';

const initialState = {
    pending: false,
    categories: [],
    regions: [],
    error: null
}

export default function homeReducer(state = initialState, action) {
    switch(action.type) {
        case GET_CATEGORIE_PENDING: 
            return {
                ...state,
                pending: true
            }
        case GET_CATEGORIE_SUCCESS:
            return {
                ...state,
                pending: false,
                categories: action.payload.response
            }
        case GET_CATEGORIE_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload.error
            }


        case GET_REGION_PENDING: 
            return {
                ...state,
                pending: true
            }
        case GET_REGION_SUCCESS:
            return {
                ...state,
                pending: false,
                regions: action.payload.response
            }
        case GET_REGION_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload.error
            }
        default: 
            return state;
    }
}

export function getCategories() {
    return {
        types: [GET_CATEGORIE_PENDING, GET_CATEGORIE_SUCCESS, GET_CATEGORIE_ERROR],
        api:  {type: 'get',path: 'categories/getAll'},
        data: {}
      };
}

export function getRegions() {
    return {
        types: [GET_REGION_PENDING, GET_REGION_SUCCESS, GET_REGION_ERROR],
        api:  {type: 'get',path: 'regions/getAll'},
        data: {}
      };
}