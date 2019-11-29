import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import './Assets/Css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import router from './Component/Commons/Router/router';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
    <BrowserRouter Route = {router}>
        <App />
    </BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

