import { combineReducers } from 'redux';
import stockReducer from './stockInfo/stockReducer';
import listReducer from './stockList/listReducer';
import searchReducer from './search/searchReducer';

const rootReducer = combineReducers({
    stockInfo: stockReducer,
    stockList: listReducer,
    search: searchReducer,
});

export default rootReducer;