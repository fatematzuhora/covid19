import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import { connect } from 'react-redux';


const CountryData = (props) => {
    const [countryData, setCountryData] = useState({});

    useEffect(() => {
        const data = props.countries.find(c => c.Slug === props.country);
        setCountryData(data);
    }, [props.country])

    return (
        <div>
            Name: {countryData.Country}<br/>
            Total Confirmed: {countryData.TotalConfirmed}
            <CountUp
                start={0}
                end={countryData.TotalConfirmed}
                duration={2}
                separator=","
                onEnd={({ pauseResume, reset, start, update }) => update()}
                // onEnd={() => console.log('Ended! 👏')}
                onStart={() => console.log(`Started! ${countryData.TotalConfirmed}`)}
            /><br/>
            + {countryData.NewConfirmed}
            <CountUp
                end={countryData.NewConfirmed}
                duration={2}
                separator=","
            />
        </div>
    )
}

// redux state and dispatch
const mapStateToProps = (state) => ({
    countries: state.summary.countries
})

export default connect(mapStateToProps, null)(CountryData);