import { SUMMARY_DATA } from 'store/actions/types';

export const summaryData = (global, countries, date) => {
    return {
        type: SUMMARY_DATA,
        payload: { global, countries, date }
    }
}