import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App.jsx';

import './index.css';

import { ProviderConfig } from './config/ProviderConfig.jsx';
import { persistor, store } from './redux/store.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ProviderConfig>
          <App />
        </ProviderConfig>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
