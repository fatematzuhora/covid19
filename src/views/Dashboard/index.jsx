import React, { Component } from 'react';
import { Country, CountryTable, WorldMap } from 'components';
// antd
import { Col, Layout, Row, Spin } from 'antd';
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
            time: new Date(),
            loading: false,
            visitorCountry: undefined
        }
    }

    tick() {
        this.setState({
            time: new Date()
        });
    }

    // async all data while component mount
    async componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
        
        this.setState({ loading: true });

        const visitorCountry = await getGeoInfo();
        const { Global, Countries, Date } = await getSummaryData();
        
        this.props.storeSummaryData(Global, Countries, Date);
        this.setState({ visitorCountry, loading: false });
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
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
            <Layout className="layout">
                {/* header / navbar */}
                <Layout.Header className="topnav">
                    <Row type="flex" justify="space-between">
                        <Col>
                            <a href="#">
                                <div className="logo">
                                    Logo
                                </div>
                            </a>
                        </Col>
                        <Col>
                        {new Date().toDateString()}
                        {this.state.time.toLocaleTimeString()}
                        </Col>
                    </Row>
                </Layout.Header>

                {/* main content */}
                <Layout.Content>
                    <div className="main">
                        <WorldMap />
                        <Country visitFrom={visitorCountry} />
                        <CountryTable />
                    </div>
                </Layout.Content>

                <Layout.Footer>
                    Footer
                </Layout.Footer>
            </Layout>
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