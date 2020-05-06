import { SUMMARY_DATA } from 'store/actions/types';

// initial state
let initialState = {
    global: {},
    countries: [],
    reportDate: undefined
}

const summaryReducer = (state = initialState, action) => {
    switch(action.type) {
        case SUMMARY_DATA:
            state.global = action.payload.global;
            state.countries = action.payload.countries;
            state.reportDate = action.payload.date;
            return Object.assign({}, state);
            
        default:
            return state;
    }
}

export default summaryReducer;