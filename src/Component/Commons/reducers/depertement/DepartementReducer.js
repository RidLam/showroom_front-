import {GET_DEPARTEMENT_PENDING, GET_DEPARTEMENT_SUCCESS, GET_DEPARTEMENT_ERROR, GET_DEPARTEMENT_BY_ID} from './DepartementActions';

const initialState = {
    pending: false,
    departements: [],
    error: null
}

export default function departementReducer(state = initialState, action) {
    switch(action.type) {
        case GET_DEPARTEMENT_PENDING: 
            return {
                ...state,
                pending: true
            }
        case GET_DEPARTEMENT_SUCCESS:
            return {
                ...state,
                pending: false,
                departements: action.departements
            }
        case GET_DEPARTEMENT_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case GET_DEPARTEMENT_BY_ID:
            return {
                ...state,
                pending: false,
                departements: action.departements
            }
        default: 
            return state;
    }
}
