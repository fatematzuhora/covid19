import React, { useState, useEffect } from 'react';
import { getAllCountries } from 'api';
import { CountryData, LineChart } from 'components';
import { Button, Row, Col, Select } from 'antd';
import { connect } from 'react-redux';


const Country = (props) => {
    const [countryList, setCountryList] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(props.visitFrom);
    
    const fetchData = async() => {
        setCountryList(await getAllCountries()); 
    }

    useEffect(() => {
        fetchData(selectedCountry);
    }, [])

    const handleSelectCountry = async(slug) => {
        setSelectedCountry(slug);
    }
    
    const countrySelectOptions = countryList.map((country, i) => {
        return (
            <option key={i} value={country.Slug}>{country.Country}</option>
        )
    })

    return (
        <div className="country-data">
            <Row className="header">
                <Col xs={24} lg={12} className="report-date">
                    Last Update: {new Date(props.reportDate).toUTCString().split(',')[1]}
                </Col>
                <Col xs={24} lg={12}>
                    <Row justify="end" className="options">
                        <Button type="primary" shape="round" size="large"
                            className="my-country"
                            onClick={() => {setSelectedCountry(props.visitFrom)}} >
                            My Country
                        </Button>
                        <Select
                            showSearch
                            className="select-country"
                            placeholder="Select a Country"
                            optionFilterProp="children"
                            onChange={(e) => handleSelectCountry(e)}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {countrySelectOptions}
                        </Select>
                    </Row>
                </Col>
            </Row>
            <Row type="flex" className="content">
                <Col xs={24} lg={8}>
                    <CountryData country={selectedCountry} />
                </Col>
                <Col xs={24} lg={16}>
                    <LineChart country={selectedCountry} />
                </Col>
            </Row>
        </div>
    )
}

// redux state and dispatch
const mapStateToProps = (state) => ({
    reportDate: state.summary.reportDate
})

export default connect(mapStateToProps, null)(Country);