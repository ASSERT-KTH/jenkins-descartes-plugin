import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Bubble from './Bubble';
import * as serviceWorker from './serviceWorker';

// make sure parent container have a defined height when using responsive component,
// otherwise height will be 0 and no chart will be rendered.
// website examples showcase many properties, you'll often use just a few of them.

//ReactDOM.render(<App />, document.querySelector('#root'));

ReactDOM.render(<> <App /> <Bubble /> </>, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

