import {
    FETCH_STOCKINFO_REQUEST,
    FETCH_STOCKINFO_SUCCESS,
    FETCH_STOCKINFO_FAILURE,
    HANDLE_SEARCH,
} from './stockTypes';

const initialState = {
    loading: true,
    inputValue: '',
    stockinfo: [], 
    error: ''
};

const stockReducer = (state = initialState, action) => {
    console.log(state, action)
    switch (action.type) {
        case FETCH_STOCKINFO_REQUEST:
            console.log(state, action)
            return {
                ...state,
                loading: true
            }
        case HANDLE_SEARCH:
            console.log(state)
            return {
                ...state,
                loading: false,
                inputValue: action.payload
            }
        case FETCH_STOCKINFO_SUCCESS:
            console.log(state)
            return {
                loading: false,
                stockinfo: action.payload,
                error: ''
            }
        case FETCH_STOCKINFO_FAILURE:
            console.log(state)
            return {
                loading: false,
                stockinfo: [],
                error: action.payload
            }
        default: return state
    }
};

export default stockReducer;
