export const LOGIN_USER_PENDING = 'LOGIN_USER_PENDING';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';

export const FORGET_PASSWORD_PENDING = 'FORGET_PASSWORD_PENDING';
export const FORGET_PASSWORD_SUCCESS = 'FORGET_PASSWORD_SUCCESS';
export const FORGET_PASSWORD_ERROR = 'FORGET_PASSWORD_ERROR';

export const RESET_PASSWORD_PENDING = 'RESET_PASSWORD_PENDING';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';

export const CHANGE_EMAIL_PENDING = 'CHANGE_EMAIL_PENDING';
export const CHANGE_EMAIL_SUCCESS = 'CHANGE_EMAIL_SUCCESS';
export const CHANGE_EMAIL_ERROR = 'CHANGE_EMAIL_ERROR';

export const CHANGE_INFO_PENDING = 'CHANGE_INFO_PENDING';
export const CHANGE_INFO_SUCCESS = 'CHANGE_INFO_SUCCESS';
export const CHANGE_INFO_ERROR = 'CHANGE_INFO_ERROR';

export const CHANGE_PASSWORD_PENDING = 'CHANGE_PASSWORD_PENDING';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_ERROR = 'CHANGE_PASSWORD_ERROR';


const initialState = {
    pending: false,
    isAuthenticated: false,
    user: {},
    token: null,
    refreshToken: null,
    message: null,
    success: null
}

export default function userReducer(state = initialState, action) {
    switch(action.type) {
        case LOGIN_USER_PENDING: 
            return {
                ...state,
                pending: true
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                pending: false,
                isAuthenticated: action.payload.response.success,
                user: action.payload.response.user,
                token: action.payload.response.token,
                refreshToken: action.payload.response.refreshToken,
                success: action.payload.response.success,
                message: action.payload.response.message
            }
        case LOGIN_USER_ERROR:
            return {
                ...state,
                pending: false,
                message: action.payload.error,
                success: action.payload.success
            }
            
        case FORGET_PASSWORD_PENDING: 
            return {
                ...state,
                pending: true
            }
        case FORGET_PASSWORD_SUCCESS:
            return {
                ...state,
                pending: false,
                success: action.payload.response.success,
                message: action.payload.response.message
            }
        case FORGET_PASSWORD_ERROR:
            return {
                ...state,
                pending: false,
                message: action.payload.error,
                success: action.payload.success
            }

        case RESET_PASSWORD_PENDING: 
            return {
                ...state,
                pending: true
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                pending: false,
                success: action.payload.response.success,
                message: action.payload.response.message
            }
        case RESET_PASSWORD_ERROR:
            return {
                ...state,
                pending: false,
                message: action.payload.error,
                success: action.payload.success
            }

        case CHANGE_EMAIL_PENDING: 
            return {
                ...state,
                pending: true
            }
        case CHANGE_EMAIL_SUCCESS:
            return {
                ...state,
                pending: false,
                success: action.payload.response.success,
                message: action.payload.response.message
            }
        case CHANGE_EMAIL_ERROR:
            return {
                ...state,
                pending: false,
                message: action.payload.error,
                success: action.payload.success
            }

        case CHANGE_INFO_PENDING: 
            return {
                ...state,
                pending: true
            }
        case CHANGE_INFO_SUCCESS:
            return {
                ...state,
                pending: false,
                success: action.payload.response.success,
                message: action.payload.response.message
            }
        case CHANGE_INFO_ERROR:
            return {
                ...state,
                pending: false,
                message: action.payload.error,
                success: action.payload.success
            }
        case CHANGE_PASSWORD_PENDING: 
            return {
                ...state,
                pending: true
            }
        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                pending: false,
                success: action.payload.response.success,
                message: action.payload.response.message
            }
        case CHANGE_PASSWORD_ERROR:
            return {
                ...state,
                pending: false,
                message: action.payload.error,
                success: action.payload.success
            }


        default: 
            return state;
    }
}

export function login(user) {
    return {
        types: [LOGIN_USER_PENDING, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR],
        api:  {type: 'post',path: 'auth/login'},
        data: user
      };
}

export function forgetPassword(user) {
    return {
        types: [FORGET_PASSWORD_PENDING, FORGET_PASSWORD_SUCCESS, FORGET_PASSWORD_ERROR],
        api:  {type: 'post',path: 'auth/forgetPassword'},
        data: user
      };
}

export function resetPassword(user) {
    return {
        types: [RESET_PASSWORD_PENDING, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR],
        api:  {type: 'post',path: 'auth/resetPassword'},
        data: user
      };
}

export function changePassword(user) {
    return {
        types: [CHANGE_PASSWORD_PENDING, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_ERROR],
        api:  {type: 'post',path: 'users/changePassword'},
        data: user
      };
}

export function changeEmail(email) {
    return {
        types: [CHANGE_EMAIL_PENDING, CHANGE_EMAIL_SUCCESS, CHANGE_EMAIL_ERROR],
        api:  {type: 'post',path: 'users/changeEmail'},
        data: email
      };
}

export function changeInfo(user) {
    return {
        types: [CHANGE_INFO_PENDING, CHANGE_INFO_SUCCESS, CHANGE_INFO_ERROR],
        api:  {type: 'post',path: 'users/changeInfo'},
        data: user
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