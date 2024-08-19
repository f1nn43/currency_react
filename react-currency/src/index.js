import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
let response = await fetch('https://open.er-api.com/v6/latest/EUR');

if (response.ok) {
  let json = await response.json();
  if(json){
    console.log(json)
    root.render(
      <React.StrictMode>
        <App data={json} />
      </React.StrictMode>
    );
  }
} else {
  alert("Попробуйте перезагрузить страницу. Ошибка HTTP: " + response.status);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
