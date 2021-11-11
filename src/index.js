import React,{ Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Loading } from './Loading.js';
import { Box } from '@material-ui/core';
import { ROUTER_BASE } from './envSetting.js';

ReactDOM.render(
  <React.StrictMode>
  <Suspense
  fallback={
    <Box display="flex" height="100vh">
      <Box m="auto">
        <Loading />
      </Box>
    </Box>
  }
 >
  
      <BrowserRouter basename={ROUTER_BASE}>
        <App/>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
