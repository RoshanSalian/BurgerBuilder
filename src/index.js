import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './store/reducer';
import { configureStore } from '@reduxjs/toolkit';

const store = createStore(reducer);
const store2 = configureStore({
  reducer: reducer
});

const app = (
  <Provider store={store2}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
