import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import {storage} from './store/Srore'
import {hydrate, render} from "react-dom";

const rootElement = document.getElementById("root");
const app = <Provider store={storage}><App/></Provider>
if (rootElement.hasChildNodes()) {
    hydrate(app, rootElement);
} else {
    render(app, rootElement);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
