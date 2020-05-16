import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import { connect } from 'react-redux';


const CountryData = (props) => {
    const [loading, setLoading] = useState(true);
    const [countryData, setCountryData] = useState({});

    useEffect(() => {
        const data = props.countries.find(c => c.Slug === props.country);
        setCountryData(data);
        setLoading(false);
    }, [props.country])

    return (
        !loading ? (
            <div>
                Name: {countryData.Country}<br/>
                Total Confirmed:
                <CountUp
                    start={0}
                    end={countryData.TotalConfirmed}
                    duration={2}
                    separator=","
                /><br/>
                +
                <CountUp
                    end={countryData.NewConfirmed}
                    duration={2}
                    separator=","
                />
            </div>
        )
        :
        ('')
    )
}

// redux state and dispatch
const mapStateToProps = (state) => ({
    countries: state.summary.countries
})

export default connect(mapStateToProps, null)(CountryData);