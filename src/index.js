import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/index.css';
import App from 'pages/App';
import registerServiceWorker from 'registerServiceWorker';
import { DataProvider } from 'contexts/Data';

ReactDOM.render(
  <DataProvider>
    <App />    
  </DataProvider>
  , document.getElementById('root'));
registerServiceWorker();
