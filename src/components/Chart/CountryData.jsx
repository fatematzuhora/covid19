import React from 'react';
import CountUp from 'react-countup';

const CountryData = () => {
    return (
        <>
            <CountUp
                start={0}
                end={100000}
                duration={2.5}
                separator=","
            />
            <p>Card content</p>
        </>
    )
}

export default CountryData;