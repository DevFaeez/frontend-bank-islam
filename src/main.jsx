import React from 'react'; 
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { store } from './user/store/index.jsx';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
