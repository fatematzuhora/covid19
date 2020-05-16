import React, { useState, useEffect } from 'react';
import { GlobalData } from 'components';
import { Radio, Row, Col } from 'antd';
import { VectorMap } from 'react-jvectormap';
import { connect } from 'react-redux';


const WorldMap = (props) => {
    const [type, setType] = useState('confirmed');
    const [mapData, setMapData] = useState({});
    const [countryData, setCountryData] = useState({});

    useEffect(() => {
        setMapData(getMapData(type));
    }, {})

    const getMapData = (type) => {
        let data = {}, color = [];
        
        if(type === 'confirmed') {
            color = ['#ffb18c', '#ff7d40', '#ff6b26', '#ff5a0d'];
            props.countries.forEach(country => {
                data[country.CountryCode] = country.TotalConfirmed;
            })
        } else if(type === 'deaths') {
            color = ['#ffbfca', '#ff8ca1', '#f0002e', '#d70029'];
            props.countries.forEach(country => {
                data[country.CountryCode] = country.TotalDeaths;
            })
        } else if(type === 'recovered') {
            color = ['#ceffde', '#00b43a', '#006721', '#004014'];
            props.countries.forEach(country => {
                data[country.CountryCode] = country.TotalRecovered;
            })
        } else if(type === 'active') {
            color = ['#ffb18c', '#ff7d40', '#ff6b26', '#ff5a0d'];
            props.countries.forEach(country => {
                data[country.CountryCode] = ( country.TotalConfirmed - (country.TotalDeaths + country.TotalRecovered));
            })
        }

        return { data, color };
    }

    const handleClick = (e, countryCode) => {
        let code = countryCode;
        const country = props.countries.find(country => country.CountryCode === code);
        setCountryData(country);
    }

    const onChange = e => {
        let newType = e.target.value;
        setType(newType);
        setMapData(getMapData(newType));
    }

    return (
        <section className="section_map">

            {/* left side global data info */}
            <GlobalData />

            {/* world map */}
            <Row>
                <Col span={24}>
                    <div className="worldmap">
                        <VectorMap
                            map={"world_mill"}
                            backgroundColor="transparent" // map background color
                            zoomOnScroll={false}
                            zoomButtons={false}
                            containerStyle={{
                                width: "100%",
                                height: "100%"
                            }}
                            onRegionClick={handleClick} // gets the country code
                            regionsSelectable={false}
                            series={{
                                regions: [{
                                    values: mapData.data, // map data
                                    scale: mapData.color, // map color palette based on case type
                                    normalizeFunction: "polynomial"
                                }]
                            }}
                        />
                    </div>
                </Col>
            </Row>

            {/* right side case type changer */}
            <Row>
                <Col span={24}>
                    <div className="mapcase">
                        <Radio.Group onChange={onChange} value={type} className="mapcase_options">
                            <Radio value="confirmed">Confirmed</Radio>
                            <Radio value="deaths">Deaths</Radio>
                            <Radio value="recovered">Recovered</Radio>
                            <Radio value="active">Active</Radio>
                        </Radio.Group>
                    </div>
                </Col>
            </Row>

        </section>
    )
}

// redux state and dispatch
const mapStateToProps = (state) => ({
    countries: state.summary.countries
})

export default connect(mapStateToProps, null)(WorldMap);