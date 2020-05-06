import { combineReducers } from 'redux';
import summaryReducer from 'store/reducers/summaryReducer';

export default combineReducers({
    summary: summaryReducer,
})