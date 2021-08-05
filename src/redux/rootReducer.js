import { combineReducers } from 'redux';
import stockReducer from './stockInfo/stockReducer';
import listReducer from './stockList/listReducer';
import searchReducer from './search/searchReducer';
import basicReducer from './infoBasic/basicReducer';

const rootReducer = combineReducers({
    stockInfo: stockReducer,
    stockList: listReducer,
    search: searchReducer,
    basic: basicReducer, 
});

export default rootReducer;