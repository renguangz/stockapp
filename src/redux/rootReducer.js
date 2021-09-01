import { combineReducers } from 'redux';
import stockReducer from './stockInfo/stockReducer';
import listReducer from './stockList/listReducer';
import searchReducer from './search/searchReducer';
import basicReducer from './infoBasic/basicReducer';
import candlestickReducer from './candlestick/candlestickReducer';
import mouseEventReducer from './mouseEvent/mouseReducer';

const rootReducer = combineReducers({
    stockInfo: stockReducer,
    stockList: listReducer,
    search: searchReducer,
    basic: basicReducer, 
    price: candlestickReducer,
    mouseEvent: mouseEventReducer,
});

export default rootReducer;