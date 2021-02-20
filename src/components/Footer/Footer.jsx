import React from 'react';
import { Layout, Row } from 'antd';


const Footer = () => {
    
    return (
        <Layout.Footer className="footer">
            <Row className="flex" justify="space-between">
                <div className="text">
                    {new Date().getFullYear()} &copy; Made with
                    <span className="footer_icon">
                        <img src={require('assets/img/icons/heart.svg')} alt="heart-icon"/>
                    </span>
                    by <a href="https://github.com/fatematzuhora" target="blank">fatematzuhora</a>
                </div>
                <div className="text">
                    <a href="https://github.com/fatematzuhora/covid19" target="blank">
                        <span className="footer_icon">
                            <img src={require('assets/img/icons/github.svg')} alt="github-icon"/>
                        </span>
                        Proudly Open Source
                    </a>
                </div>
            </Row>
        </Layout.Footer>
    )
}

export default Footer;