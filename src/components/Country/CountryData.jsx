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
            countryData ? (
                <div className="country">
                    <div className="name">{countryData.Country}</div>

                    <div className="case case_confirmed">
                        <span className="name">Confirmed</span>
                        <span className="total">
                            <CountUp
                                start={0}
                                end={countryData.TotalConfirmed}
                                duration={2}
                                separator=","
                            />
                        </span>
                        <span className="new">
                            +
                            <CountUp
                                start={0}
                                end={countryData.NewConfirmed}
                                duration={2}
                                separator=","
                            />
                        </span>
                    </div>
                    <div className="case case_recovered">
                        <span className="name">Recovered</span>
                        <span className="total">
                            <CountUp
                                start={0}
                                end={countryData.TotalRecovered}
                                duration={2}
                                separator=","
                            />
                        </span>
                        <span className="new">
                            +
                            <CountUp
                                start={0}
                                end={countryData.NewRecovered}
                                duration={2}
                                separator=","
                            />
                        </span>
                    </div>
                    <div className="case case_deaths">
                        <span className="name">Deaths</span>
                        <span className="total">
                            <CountUp
                                start={0}
                                end={countryData.TotalDeaths}
                                duration={2}
                                separator=","
                            />
                        </span>
                        <span className="new">
                            +
                            <CountUp
                                start={0}
                                end={countryData.NewDeaths}
                                duration={2}
                                separator=","
                            />
                        </span>
                    </div>
                </div>
            )
            :
            ('')
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