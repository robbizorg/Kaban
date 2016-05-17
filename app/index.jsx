import './main.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

// Avoid rendering directly to document.body
// Can cause strange problems when using react
ReactDOM.render(<App />, document.getElementById('app'));


