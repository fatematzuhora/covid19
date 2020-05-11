import React, { Component } from 'react';
import { Country, CountryTable, WorldMap } from 'components';
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
            visitorCountry: undefined
        }
    }

    // async all data while component mount
    async componentDidMount() {
        this.setState({ loading: true })

        const visitorCountry = await getGeoInfo();
        const { Global, Countries, Date } = await getSummaryData();
        this.props.storeSummaryData(Global, Countries, Date);

        this.setState({ visitorCountry, loading: false })
    }

    // render starts from here
    render() {
        const { loading, visitorCountry } = this.state;

        if(loading) {
            return (
                <div className="spin">
                    <Spin size="large" tip="Loading..." />
                </div>
            )
        }
        
        // return the jsx
        return (
            <div className="main">
                <WorldMap />
                <Country visitFrom={visitorCountry} />
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