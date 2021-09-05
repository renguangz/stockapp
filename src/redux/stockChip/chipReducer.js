const initialState = {
    loading: true,
    data: [],
    error: ''
}

const chipReducer = (state = initialState, action) =>  {
    switch(action.type) {
        case 'FETCH_CHIP_REQUEST':
            return {
                ...state,
                loading: false
            }
        case 'FETCH_CHIP_SUCCESS':
            return {
                ...state,
                data: action.payload
            }
        case 'FETCH_CHIP_ERROR':
            return {
                ...state,
                error: action.payload
            }
        default: return state
    }
}

export default chipReducer;