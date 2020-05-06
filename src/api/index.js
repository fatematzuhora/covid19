import axios from 'axios';
// config
import { BASE_URL, IP_URL } from 'config';


// fetch summary
export const getSummaryData = async() => {
    try {
        const { data: { Global, Countries, Date } } = await axios.get(`${BASE_URL}/summary`);
        return { Global, Countries, Date };
    } catch(err) {
        console.log(err);
    }
}

// fetch country code from visitor IP
export const getGeoInfo = async() => {
    try {
        const { data: { country_name } } = await axios.get(IP_URL);
        return country_name.toLowerCase();
    } catch (err) {
        console.log(err);
    }
}

// fetch countries name
export const getAllCountries = async() => {
    try {
        const { data } = await axios.get(`${BASE_URL}/countries`);
        return data;
    } catch(err) {
        console.log(err);
    }
}

// fetch country's all data by country code
export const getChartDataByCountry = async(code) => {
    try {
        const { data }  = await axios.get(`${BASE_URL}/country/${code}`);
        return data;
    } catch(err) {
        console.log(err);
    }
}