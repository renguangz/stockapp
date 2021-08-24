import { combineReducers } from 'redux';
import stockReducer from './stockInfo/stockReducer';
import listReducer from './stockList/listReducer';
import searchReducer from './search/searchReducer';
import basicReducer from './infoBasic/basicReducer';
import candlestickReducer from './candlestick/candlestickReducer';

const rootReducer = combineReducers({
    stockInfo: stockReducer,
    stockList: listReducer,
    search: searchReducer,
    basic: basicReducer, 
    price: candlestickReducer,
});

export default rootReducer;