import React, { useState, useEffect } from 'react';
import { getChartDataByCountry } from 'api';
import { Line } from 'react-chartjs-2';


const LineChart = (props) => {
    const [chartData, setChartData] = useState([]);

    const fetchData = async(slug) => {
        setChartData(await getChartDataByCountry(slug));
    }

    useEffect(() => {
        const country = props.country;
        fetchData(country);
    }, [props.country])

    const dateString = (date) => {
        const str = new Date(date).toString().slice(4, 10);
        return str;
    }

    const lineChart = (
        chartData.length ?
        (<Line
            data={{
                labels: chartData.map(( { Date } ) => dateString(Date) ),
                datasets: [{
                    data: chartData.map(( { Confirmed } ) => Confirmed),
                    label: 'Confirmed',
                    borderColor: '#ff5a0d',
                    borderWidth: '1',
                    fill: true
                }, {
                    data: chartData.map(( { Recovered } ) => Recovered),
                    label: 'Recovered',
                    borderColor: '#006721',
                    borderWidth: '1',
                    fill: true
                }, {
                    data: chartData.map(( { Deaths } ) => Deaths),
                    label: 'Deaths',
                    borderColor: '#d70029',
                    borderWidth: '1',
                    fill: true
                }]
            }}
        />)
        :
        (<Line
            data={{
                labels: null,
                datasets: [{
                    data: null,
                    label: 'Confirmed',
                    borderColor: '#ff5a0d',
                    borderWidth: '1',
                    fill: true
                }, {
                    data: null,
                    label: 'Recovered',
                    borderColor: '#006721',
                    borderWidth: '1',
                    fill: true
                }, {
                    data: null,
                    label: 'Deaths',
                    borderColor: '#d70029',
                    borderWidth: '1',
                    fill: true
                }]
            }}
        />)
    )

    return (
        <div>
            {lineChart}
        </div>
    )
}

export default LineChart;