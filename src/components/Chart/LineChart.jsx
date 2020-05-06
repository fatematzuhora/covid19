import React, { useState, useEffect } from 'react';
// api endpoint
import { getAllCountries, getChartDataByCountry } from 'api';
import { Select } from 'antd';
import { Line } from 'react-chartjs-2';


const LineChart = (props) => {
    const [countryList, setCountryList] = useState([]);
    const [visitorCountry, setVisitorCountry] = useState(props.visitFrom);
    const [selectedCountry, setSelectedCountry] = useState(props.visitFrom);
    const [chartData, setChartData] = useState([]);
    
    const fetchData = async(code) => {
        setCountryList(await getAllCountries());    
        setChartData(await getChartDataByCountry(code));
    }

    useEffect(() => {
        fetchData(selectedCountry);
    }, [])

    
    const dateString = (date) => {
        const str = new Date(date).toString().slice(4, 10);
        return str;
    }

    const handleSelectCountry = async(country) => {
        setChartData(await getChartDataByCountry(country));
    }
    
    const countrySelectOptions = countryList.map((country, i) => {
        return (
            <option key={i} value={country.Slug}>{country.Country}</option>
        )
    })

    const lineChart = (
        chartData.length
            ? (
            <Line
                data={{
                    labels: chartData.map(( { Date } ) => dateString(Date) ),
                    datasets: [{
                        data: chartData.map(( { Confirmed } ) => Confirmed),
                        label: 'Confirmed',
                        borderColor: '#3333ff',
                        fill: true
                    }, {
                        data: chartData.map(( { Recovered } ) => Recovered),
                        label: 'Recovered',
                        borderColor: 'green',
                        fill: true
                    }, {
                        data: chartData.map(( { Deaths } ) => Deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        fill: true
                    }]
                }}
            />) : null
    )
    
    return (
        <div>
            <Select onChange={(e) => handleSelectCountry(e)} defaultValue={selectedCountry}>
                {countrySelectOptions}
            </Select>

            {lineChart}
        </div>
    )
}

export default LineChart;