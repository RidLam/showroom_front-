export const LOGIN_USER_PENDING = 'LOGIN_USER_PENDING';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';


const initialState = {
    pending: false,
    isAuthenticated: false,
    user: {},
    token: null,
    refreshToken: null,
    error: null
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
            }
        case LOGIN_USER_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload.error
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