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
                    <div className="global_head">
                        <img src={require('assets/img/icons/global.svg')} alt="global-icon"/>
                        <span className="text">Global Data</span>
                    </div>

                    <div className="case case_confirmed">
                        <span className="name">Confirmed</span>
                        <span className="total">
                            <CountUp
                                start={0}
                                end={global.TotalConfirmed}
                                duration={2}
                                separator=","
                            />
                        </span>
                        <span className="new">
                            +
                            <CountUp
                                start={0}
                                end={global.NewConfirmed}
                                duration={2}
                                separator=","
                            />
                        </span>
                    </div>

                    <div className="case case_recovered">
                        <span className="name">Recovered</span>
                        <span className="total">
                            <CountUp
                                start={0}
                                end={global.TotalRecovered}
                                duration={2}
                                separator=","
                            />
                        </span>
                        <span className="new">
                            +
                            <CountUp
                                start={0}
                                end={global.NewRecovered}
                                duration={2}
                                separator=","
                            />
                        </span>
                    </div>

                    <div className="case case_deaths">
                        <span className="name">Deaths</span>
                        <span className="total">
                            <CountUp
                                start={0}
                                end={global.TotalDeaths}
                                duration={2}
                                separator=","
                            />
                        </span>
                        <span className="new">
                            +
                            <CountUp
                                start={0}
                                end={global.NewDeaths}
                                duration={2}
                                separator=","
                            />
                        </span>
                    </div>
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