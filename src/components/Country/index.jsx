import React, { useState, useEffect } from 'react';
import { getAllCountries, getChartDataByCountry } from 'api';
import { CountryData, LineChart } from 'components';
import { Row, Col, Select } from 'antd';
import { connect } from 'react-redux';


const Country = (props) => {
    const [countryList, setCountryList] = useState([]);
    const [visitorCountry, setVisitorCountry] = useState(props.visitFrom);
    const [selectedCountry, setSelectedCountry] = useState(props.visitFrom);
    const [chartData, setChartData] = useState([]);
    
    const fetchData = async(slug) => {
        const country = props.countries.find(country => country.Slug === slug);
        // setCountryData(country);
        setCountryList(await getAllCountries());    
        setChartData(await getChartDataByCountry(slug));
    }

    useEffect(() => {
        fetchData(selectedCountry);
    }, [])

    const handleSelectCountry = async(slug) => {
        const country = props.countries.find(country => country.Slug === slug);
        // setCountryData(country);
        setChartData(await getChartDataByCountry(slug));
        setSelectedCountry(slug);
    }
    
    const countrySelectOptions = countryList.map((country, i) => {
        return (
            <option key={i} value={country.Slug}>{country.Country}</option>
        )
    })


    return (
        <section className="section_country">
            <Row>
                <Col span={12}>
                    <div className="report-date">
                        Last Update: {new Date(props.reportDate).toUTCString().split(',')[1]}
                    </div>
                </Col>
                <Col span={12}>
                    <Row justify="end">
                        <div>My Country</div>
                        <div>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Select a Country"
                                optionFilterProp="children"
                                onChange={(e) => handleSelectCountry(e)}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {countrySelectOptions}
                            </Select>
                        </div>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <CountryData country={selectedCountry} />
                </Col>
                <Col span={16}>
                    <LineChart data={chartData} />
                </Col>
            </Row>
        </section>
    )
}

// redux state and dispatch
const mapStateToProps = (state) => ({
    countries: state.summary.countries,
    reportDate: state.summary.reportDate
})

export default connect(mapStateToProps, null)(Country);