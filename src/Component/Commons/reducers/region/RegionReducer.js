import {GET_REGION_PENDING, GET_REGION_SUCCESS, GET_REGION_ERROR} from './RegionActions';

const initialState = {
    pending: false,
    regions: [],
    error: null
}

export default function regionReducer(state = initialState, action) {
    switch(action.type) {
        case GET_REGION_PENDING: 
            return {
                ...state,
                pending: true
            }
        case GET_REGION_SUCCESS:
            return {
                ...state,
                pending: false,
                regions: action.regions
            }
        case GET_REGION_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default: 
            return state;
    }
}
