import React from 'react';
import { Line } from 'react-chartjs-2';


const LineChart = (props) => {

    const dateString = (date) => {
        const str = new Date(date).toString().slice(4, 10);
        return str;
    }

    const lineChart = (
        props.data.length ?
        (<Line
            data={{
                labels: props.data.map(( { Date } ) => dateString(Date) ),
                datasets: [{
                    data: props.data.map(( { Confirmed } ) => Confirmed),
                    label: 'Confirmed',
                    borderColor: '#3333ff',
                    fill: true
                }, {
                    data: props.data.map(( { Recovered } ) => Recovered),
                    label: 'Recovered',
                    borderColor: 'green',
                    fill: true
                }, {
                    data: props.data.map(( { Deaths } ) => Deaths),
                    label: 'Deaths',
                    borderColor: 'red',
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
                    borderColor: '#3333ff',
                    fill: true
                }, {
                    data: null,
                    label: 'Recovered',
                    borderColor: 'green',
                    fill: true
                }, {
                    data: null,
                    label: 'Deaths',
                    borderColor: 'red',
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