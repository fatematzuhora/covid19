import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from 'serviceWorker';
// redux
import { Provider } from 'react-redux';
import configureStore from 'store';
// import main app
import App from 'App';

// import antd css
import 'assets/css/antd.css';
// import app css
import 'assets/css/styles.css';


// render from here
ReactDOM.render(
  <Provider store={configureStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();