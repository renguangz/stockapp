const initialState = {
    loading: true,
    key: '',
    stockid: [],
    stockname: [],
    basic: [],
    cash: '',
    own: ''
}

const listReducer = (state = initialState, action) => {
    console.log(state, action)
    switch (action.type) {
        case 'FETCH_LIST_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'ADD_STOCK':
            return {
                ...state,
                loading: false,
                stockid: action.payload
            }

        case 'DELETE_STOCK':
            return {
                ...state,
                loading: false,
                stockid: action.payload
            }
        case 'FETCH_LIST_STOCK':
            return {
                ...state,
                loading: false,
                stockid: action.payload
            }
        default: return state
    }
};

export default listReducer;