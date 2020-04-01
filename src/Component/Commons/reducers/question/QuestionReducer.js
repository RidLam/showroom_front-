import { SEND_QUESTION_SUCCESS, SEND_QUESTION_ERROR, SEND_REPLY_SUCCESS, SEND_REPLY_ERROR } from './QuestionActions';

const initialState = {
    pending: false,
    response: [],
    error: null
}

export default function questionReducer(state = initialState, action) {
    switch(action.type) {
        case SEND_QUESTION_SUCCESS:
            return {
                ...state,
                pending: false,
                questionSent: action.success
            }
        case SEND_QUESTION_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case SEND_REPLY_SUCCESS:
            return {
                ...state,
                pending: false,
                replySent: action.success
            }
        case SEND_REPLY_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default: 
            return state;
    }
}
