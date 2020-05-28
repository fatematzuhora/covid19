import React, { Component } from 'react';
// antd
import { Layout } from 'antd';


// 404 / not found view class
export default class NotFound extends Component {

    // render starts from here
    render() {
        // return the jsx
        return (
            <Layout className="main">
                <Layout.Content className="content">
                    <div className="notfound">
                        <img src={require('assets/img/blank_canvas.svg')} alt="404"/>
                    </div>
                </Layout.Content>
            </Layout>
        )
    }
}