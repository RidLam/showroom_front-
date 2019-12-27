import {GET_CATEGORIE_PENDING, GET_CATEGORIE_SUCCESS, GET_CATEGORIE_ERROR} from './CategorieActions';

const initialState = {
    pending: false,
    categories: [],
    error: null
}

export default function categorieReducer(state = initialState, action) {
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
