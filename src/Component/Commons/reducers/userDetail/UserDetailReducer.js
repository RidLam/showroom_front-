import {GET_USERDETAIL_PENDING, GET_USERDETAIL_SUCCESS, GET_USERDETAIL_ERROR, LOGOUT_USER} from './UserDetailActions';

const initialState = {
    pending: false,
    userDetails: [],
    error: null
}

export default function userDetailReducer(state = initialState, action) {
    switch(action.type) {
        case GET_USERDETAIL_PENDING: 
            return {
                ...state,
                pending: true
            }
        case GET_USERDETAIL_SUCCESS:
            return {
                ...state,
                pending: false,
                userDetails: action.userDetails
            }
        case GET_USERDETAIL_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case LOGOUT_USER:
            return {
                ...state,
                pending: false,
                userDetails: []
            }
        default: 
            return state;
    }
}
