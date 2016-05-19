import './main.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import alt from './libs/alt';
import storage from './libs/storage';
import persist from './libs/persist';

persist(alt, storage, 'app');

// Avoid rendering directly to document.body
// Can cause strange problems when using react
ReactDOM.render(<App />, document.getElementById('app'));


