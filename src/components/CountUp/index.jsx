import React, { Component } from 'react';

class CountUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    componentDidMount() {
        const { startCount } = this.props;
        this.setState({
            count: startCount
        })

        this.intervalChange()
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    intervalChange = () => {
        this.myInterval = setInterval(() => {
            this.setState(prevState => ({
                count: prevState.count + 1
            }))
        }, 1000)
    }

    render () {
        const { count } = this.state;

        return (
            <span>{count}</span>
        )
    }
}

export default CountUp;