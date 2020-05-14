import React from 'react';
import { Row, Col } from 'antd';
import CountUp from 'react-countup';
import { connect } from 'react-redux';


const GlobalData = (props) => {
    const { global } = props;

    return (
        <Row>
            <Col span={24}>
                <div className="global">
                    <p>
                        Confirmed:
                        <CountUp
                            start={0}
                            end={global.TotalConfirmed}
                            duration={2}
                            separator=","
                        />
                        
                        <br/>+
                        <CountUp
                            start={0}
                            end={global.NewConfirmed}
                            duration={2}
                            separator=","
                        />
                    </p>
                    <p>
                        Recovered: {global.TotalRecovered}<br/>
                        + {global.NewRecovered}
                    </p>
                    <p>
                        Deaths: {global.TotalDeaths}<br/>
                        + {global.NewDeaths}
                    </p>
                </div>
            </Col>
        </Row>
    )
}

// redux state and dispatch
const mapStateToProps = (state) => ({
    global: state.summary.global
})

export default connect(mapStateToProps, null)(GlobalData);