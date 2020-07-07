const OPEN_MOBILE_FILTER = 'OPEN_MOBILE_FILTER';
const CLOSE_MOBILE_FILTER = 'CLOSE_MOBILE_FILTER';


const initialState = {
    pending: false,
    openFilter: false,
    closeFilter: false,
    error: null
}

export default function commonReducer(state = initialState, action) {
    switch(action.type) {
        case OPEN_MOBILE_FILTER: 
            return {
                ...state,
                openFilter: true
            }
        case CLOSE_MOBILE_FILTER:
            return {
                ...state,
                openFilter: false,
            }
        
        default: 
            return state;
    }
}
