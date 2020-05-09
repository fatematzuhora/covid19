import React, { useState, useEffect } from 'react';
import { VectorMap } from 'react-jvectormap';
import { connect } from 'react-redux';
import { Radio } from 'antd';


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
        <div>
            <div>
                <Radio.Group onChange={onChange} value={type}>
                    <Radio value="confirmed">Confirmed</Radio>
                    <Radio value="deaths">Deaths</Radio>
                    <Radio value="recovered">Recovered</Radio>
                    <Radio value="active">Active</Radio>
                </Radio.Group>
            </div>

            <div className="map" style={{'height': '440px'}}>
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
                    containerClassName="map"
                    regionsSelectable={false}
                    series={{
                        regions: [{
                            values: mapData.data, // this is your data
                            scale: mapData.color, // your color game's here
                            normalizeFunction: "polynomial"
                        }]
                    }}
                />
            </div>
        </div>
    )
}

// redux state and dispatch
const mapStateToProps = (state) => ({
    countries: state.summary.countries
})

export default connect(mapStateToProps, null)(WorldMap);