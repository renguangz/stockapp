const initialState = {
    loading: true,
    id_and_name: [],
    error: null,
    notSearch: true,
    sidebarTitle: ''
}

const searchReducer = (state = initialState, action) => {
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
        case 'SEARCHLIST_CLICK':
            return {
                ...state,
                loading: false,
                notSearch: false,
                sidebarTitle: action.payload
            }
        default: return state
    }
};

export default searchReducer;