import {CONTACT_SELLER_PENDING, CONTACT_SELLER_SUCCESS, CONTACT_SELLER_ERROR, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR} from './SendMailActions';

const initialState = {
    pending: false,
    response: [],
    error: null,
    message: null,
    success: null
}

export default function contactSellerReducer(state = initialState, action) {
    switch(action.type) {
        case CONTACT_SELLER_PENDING: 
            return {
                ...state,
                pending: true
            }
        case CONTACT_SELLER_SUCCESS:
            return {
                ...state,
                pending: false,
                success: action.response.success,
                message: action.response.message
            }
        case CONTACT_SELLER_ERROR:
            return {
                ...state,
                pending: false,
                success: action.response.success,
                error: action.error
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                pending: false,
                success: action.response.success,
                message: action.response.message
            }
        case RESET_PASSWORD_ERROR:
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
