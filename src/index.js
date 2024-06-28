// src/index.js or src/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/reset.css'; // Import Ant Design styles
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
