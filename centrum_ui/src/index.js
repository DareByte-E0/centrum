import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swURL = `${process.env.PUBLIC_URL}/serviceWorker.js`;

    navigator.serviceWorker.register(swURL)
    .then((registeration) => {
      console.log(`service worker resgistered with scope: ${registeration.scope}`);
    })
    .catch((error) => {
      console.error(`service worker failed: `, error);
    })
  })
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
