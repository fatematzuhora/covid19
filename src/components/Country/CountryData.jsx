import React from 'react';
import CountUp from 'react-countup';


const CountryData = (props) => {
    const { data } = props;

    return (
        <div>
            Name: {data.Country}<br/>
            Total Confirmed: {data.TotalConfirmed}
            <CountUp
                start={0}
                end={data.TotalConfirmed}
                duration={2}
                separator=","
            /><br/>
            + {data.NewConfirmed}
            <CountUp
                start={0}
                end={data.NewConfirmed}
                duration={2}
                separator=","
            />
        </div>
    )
}

export default CountryData;