const initialState = {
    loading: true,
    id_and_name: [],
    error: null
}

const searchReducer = (state = initialState, action) => {
    // console.log(state, action)
    switch (action.type) {
        case 'FETCH_ID_NAME_REQUEST': 
            return {
                ...state,
                loading: true
            }
        case 'FETCH_ID_NAME_SUCCESS':
            return {
                ...state,
                loading: false,
                id_and_name: action.payload
            }
        case 'FETCH_ID_NAME_ERROR': 
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
};

export default searchReducer;