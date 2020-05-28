import React, { useState, useEffect } from 'react';
import { GlobalData } from 'components';
import { Radio, Row, Col } from 'antd';
import { VectorMap } from 'react-jvectormap';
import { connect } from 'react-redux';


const WorldMap = (props) => {
    const [type, setType] = useState('confirmed');
    const [mapData, setMapData] = useState({});

    useEffect(() => {
        setMapData(getMapData(type));
    }, {})

    const getMapData = (type) => {
        let data = {}, color = [], bgcolor = undefined;
        
        if(type === 'confirmed') {
            color = ['#ffb18c', '#ff7d40', '#ff6b26', '#ff5a0d'];
            bgcolor = '#fff2ed';
            props.countries.forEach(country => {
                data[country.CountryCode] = country.TotalConfirmed;
            })
        } else if(type === 'deaths') {
            color = ['#ffbfca', '#ff8ca1', '#f0002e', '#d70029'];
            bgcolor = '#fffafa';
            props.countries.forEach(country => {
                data[country.CountryCode] = country.TotalDeaths;
            })
        } else if(type === 'recovered') {
            color = ['#ceffde', '#00b43a', '#006721', '#004014'];
            bgcolor = '#f5fff8';
            props.countries.forEach(country => {
                data[country.CountryCode] = country.TotalRecovered;
            })
        } else if(type === 'active') {
            color = ['#ffb18c', '#ff7d40', '#ff6b26', '#ff5a0d'];
            bgcolor = '#fff2ed';
            props.countries.forEach(country => {
                data[country.CountryCode] = ( country.TotalConfirmed - (country.TotalDeaths + country.TotalRecovered));
            })
        }

        return { data, color, bgcolor };
    }

    const onChange = e => {
        let newType = e.target.value;
        setType(newType);
        setMapData(getMapData(newType));
    }

    const formatNumber = num => {
        if(num > 999) {
            return `${( Math.floor(num / 100) / 10.0 )}k`;
        } else {
            return num;
        }
    }

    const getCount = countryCode => {
        let code = countryCode,
            totalCount = 0,
                newCount = 0;

        if (code) {
            const country = props.countries.find(country => country.CountryCode === code);

            if (country) {
                if(type === 'confirmed') {
                    totalCount = formatNumber(country.TotalConfirmed);
                    newCount = formatNumber(country.NewConfirmed);
                } else if(type === 'deaths') {
                    totalCount = formatNumber(country.TotalDeaths);
                    newCount = formatNumber(country.NewDeaths);
                } else if(type === 'recovered') {
                    totalCount = formatNumber(country.TotalRecovered);
                    newCount = formatNumber(country.NewRecovered);
                } else if(type === 'active') {
                    totalCount = formatNumber(( country.TotalConfirmed - (country.TotalDeaths + country.TotalRecovered) ));
                    newCount = formatNumber(country.NewConfirmed);
                }
            }
        }
        
        return {totalCount, newCount};
    }

    return (
        <section className="section_map">

            {/* left side global data info */}
            <GlobalData />

            {/* world map */}
            <Row>
                <Col span={24}>
                    <div id="customTip" class="jvectormap-tip"></div>
                    <VectorMap
                        map={"world_mill"}
                        backgroundColor={mapData.bgcolor} // map background color
                        zoomOnScroll={false}
                        zoomButtons={false}
                        containerStyle={{
                            width: "100%",
                            height: "48rem",
                            margin: "0 auto"
                        }}
                        onRegionClick={false}
                        onRegionTipShow={(e, label, code) => {
                            label.html(`<img src="https://www.countryflags.io/${code}/flat/16.png" alt="${code}"/>
                                ${label.html()}: ${getCount(code).totalCount}<br/>
                                    + ${getCount(code).newCount}`);
                        }}
                        regionsSelectable={false}
                        regionLabelStyle = {{
                            initial: {
                                'font-family': 'Verdana',
                                'font-size': '12',
                                'font-weight': 'bold',
                                'cursor': 'default',
                                'fill': 'red'
                            },
                            hover: {
                                'cursor': 'pointer'
                            }
                        }}
                        series={{
                            regions: [{
                                values: mapData.data, // map data
                                scale: mapData.color, // map color palette based on case type
                                normalizeFunction: "polynomial"
                            }]
                        }}
                    />
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