import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './config/store';

const render = () => ReactDOM.render(<App />, 
  document.getElementById('root'));

store.subscribe(render)
render()

serviceWorker.unregister();