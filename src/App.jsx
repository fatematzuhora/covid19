import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// redux
import { connect } from 'react-redux';
// views
import { Dashboard, NotFound } from 'views';


// main app class
class App extends Component {
  
  // render starts from here
  render() {
    // return the jsx
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={Dashboard} />
          <Route path='*' exact={true} component={NotFound} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default connect()(App);