import React, { Component } from 'react';
import { CountryData, LineChart, CountryTable, GlobalData, WorldMap } from 'components';
// antd
import { Spin } from 'antd';
// api endpoint
import { getSummaryData, getGeoInfo } from 'api';
// redux
import { connect } from 'react-redux';
import { summaryData } from 'store/actions';


// dashboard view class
class Dashboard extends Component {
    // class constructor
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visitorCountry: undefined,
            mapData: {},
            Global: {},
            Countries: {},
            Date: undefined
        }
    }

    // async all data while component mount
    async componentDidMount() {
        this.setState({ loading: true })

        const visitorCountry = await getGeoInfo();
        const { Global, Countries, Date } = await getSummaryData();

        let mapData = {};
        Countries.forEach(country => {
            mapData[country.CountryCode] = country.TotalConfirmed;
        })

        this.props.storeSummaryData(Global, Countries, Date);
        this.setState({ visitorCountry, Global, Countries, Date, mapData, loading: false })
    }

    // render starts from here
    render() {
        const { loading, visitorCountry, Global, mapData } = this.state;

        if(loading) {
            return (
                <div className="spin">
                    <Spin size="large" tip="Loading..." />
                </div>
            )
        }
        
        // return the jsx
        return (
            <div>
                <WorldMap />
                <GlobalData data={Global} />
                {new Date(this.state.Date).toUTCString().split(',')[1]}
                <LineChart visitFrom={visitorCountry} />
                <CountryTable />
            </div>
        )
    }
}

// redux state and dispatch
const mapDispatchToProps = (dispatch) => ({
    storeSummaryData: (global, countries, date) => {
        dispatch(summaryData(global, countries, date));
    },
})

export default connect(null, mapDispatchToProps)(Dashboard);