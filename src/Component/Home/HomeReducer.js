import {GET_CATEGORIE_PENDING, GET_CATEGORIE_SUCCESS, GET_CATEGORIE_ERROR} from './HomeActions';

const initialState = {
    pending: false,
    categories: [],
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
                categories: action.categories
            }
        case GET_CATEGORIE_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default: 
            return state;
    }
}

export const getCategorie = state => state.categories;
export const getCategoriePending = state => state.pending;
export const getCategorieError = state => state.error;