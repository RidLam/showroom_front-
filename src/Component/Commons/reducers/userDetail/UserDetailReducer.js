import {GET_USERDETAIL_PENDING, GET_USERDETAIL_SUCCESS, GET_USERDETAIL_ERROR, LOGOUT_USER,
        LOGIN_USER_SUCCESS, LOGIN_USER_ERROR, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR, REGISTER_USER_EMPTY_MESSAGE,
        UPDATE_USER_SUCCESS,UPDATE_USER_ERROR
} from './UserDetailActions';

const initialState = {
    pending: false,
    userDetails: [],
    error: null,
    inserted: null,
    message: null,
    success: null,
    isAuthenticated: false
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
                userDetails: action.userDetails,
                isAuthenticated: true
            }
        case GET_USERDETAIL_ERROR:
            return {
                ...state,
                pending: false,
                error: action.message,
                isAuthenticated: false
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                pending: false,
                token: action.token
            }
        case LOGIN_USER_ERROR:
            return {
                ...state,
                pending: false,
                token: null
            }
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                pending: false,
                inserted: action.payload.success,
                message: action.payload.message
        }
        case REGISTER_USER_EMPTY_MESSAGE:
            return {
                ...state,
                pending: false,
                inserted: null,
                message: null
        }
        case REGISTER_USER_ERROR:
            return {
                ...state,
                pending: false,
                insered: action.payload.success,
                message: action.payload.message
        }
        case LOGOUT_USER:
            return {
                ...state,
                pending: false,
                userDetails: []
            }
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                pending: false,
                success: action.response.success,
                message: action.response.message
            }
        case UPDATE_USER_ERROR:
            return {
                ...state,
                pending: false,
                success: action.response.success,
                message: action.response.message
            }
        default: 
            return state;
    }
}
