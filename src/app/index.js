import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { transitions, positions, types, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic';

// optional configuration
const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    type: types.SUCCESS,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.FADE,
}

ReactDOM.render(
    <AlertProvider template={AlertTemplate} {...options}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </AlertProvider>,
    document.getElementById('root')
);