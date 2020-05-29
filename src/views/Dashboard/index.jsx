import React, { Component } from 'react';
import { Country, CountryTable, Footer, WorldMap } from 'components';
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
            visitorCountry: undefined,
            navClass: 'topnav topnav_bg_transparent'
        }
    }

    tick() {
        this.setState({
            time: new Date()
        });
    }

    // async all data while component mount
    async componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
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

    handleScroll = () => {
        if (window.pageYOffset > 0) {
            this.setState({ navClass: "topnav topnav_bg_white" });   
        } else {
            this.setState({ navClass: "topnav topnav_bg_transparent" });
        }
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
            <Layout className="main">
                {/* header / navbar */}
                <Layout.Header className={this.state.navClass}>
                    <Row type="flex" justify="space-between" className="topnav_row">
                        <Col>
                            <a href="/">
                                <div className="logo">
                                    C
                                    <span className="covid19">
                                        <img src={require('assets/img/covid19.svg')} alt="animate-logo"/>
                                    </span>
                                    VID-19
                                </div>
                            </a>
                        </Col>
                        <Col>
                            <div className="time">
                                <span className="today">
                                    {new Date().toDateString()}
                                </span>
                                {this.state.time.toLocaleTimeString()}
                            </div>
                        </Col>
                    </Row>
                </Layout.Header>

                {/* main content */}
                <Layout.Content className="content">
                    <div className="banner">
                        <WorldMap />
                    </div>

                    <div className="data">
                        <Country visitFrom={visitorCountry} />
                        <CountryTable />
                    </div>
                </Layout.Content>

                <Footer />

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