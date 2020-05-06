import React, { useState, useEffect } from 'react';
import { VectorMap } from 'react-jvectormap';
import { connect } from 'react-redux';


const WorldMap = (props) => {
    const [type, setType] = useState('confirmed');
    const [mapData, setMapData] = useState({});
    const [caseColor, setCaseColor] = useState();

    useEffect(() => {
        let initialState = getMapData(type);

        setCaseColor(initialState.color);
        setMapData(initialState.data);
    }, [])
    
    const getMapData = (type) => {
        let data = {}, color = [];
        
        if(type === 'confirmed') {
            color = ['#fffacd', '#ffed4d', '#ffe500', '#ffa500'];
            props.countries.forEach(country => {
                data[country.CountryCode] = country.TotalConfirmed;
            })
        } else if(type === 'deaths') {
            color = ['#ffe7e7', '#ffb3b3', '#ff9a9a', '#ff0000'];
            props.countries.forEach(country => {
                data[country.CountryCode] = country.TotalDeaths;
            })
        } else if(type === 'recovered') {
            color = ['green'];
            props.countries.forEach(country => {
                data[country.CountryCode] = country.TotalRecovered;
            })
        } else if(type === 'active') {
            color = ['#fffacd', '#ffed4d', '#ffe500', '#ffa500'];
            props.countries.forEach(country => {
                data[country.CountryCode] = ( country.TotalConfirmed - (country.TotalDeaths + country.TotalRecovered));
            })
        }

        return { data, color };
    }

    const handleClick = (e, countryCode) => {
        let code = countryCode;
        console.log(code);
        console.log(mapData[code]);
    };


    return (
        <div>
            <div>

            </div>
            <VectorMap
                map={"world_mill"}
                backgroundColor="transparent" // change it to ocean blue: #0077be
                zoomOnScroll={false}
                containerStyle={{
                    width: "100%",
                    height: "320px"
                }}
                onRegionClick={handleClick} // gets the country code
                containerClassName="map"
                regionStyle={{
                    initial: {
                        fill: "#e4e4e4",
                        "fill-opacity": 0.9,
                        stroke: "none",
                        "stroke-width": 0,
                        "stroke-opacity": 0,
                    },
                    hover: {
                        "fill-opacity": 0.8,
                        cursor: "pointer"
                    },
                    // selected: {
                    //     fill: "#000" // color for the clicked country
                    // },
                    selectedHover: {
                        fill: "#2938bc"
                    }
                }}
                regionsSelectable={false}
                series={{
                    regions: [{
                        values: mapData, // this is your data
                        scale: caseColor, // your color game's here
                        normalizeFunction: "polynomial"
                    }]
                }}
            />
        </div>
    )
}

// redux state and dispatch
const mapStateToProps = (state) => ({
    countries: state.summary.countries
})

export default connect(mapStateToProps, null)(WorldMap);