import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './config/store';
import Auth from './services/Auth0';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

const render = () => ReactDOM.render(<App auth={auth} />, 
  document.getElementById('root'));

store.subscribe(render)
render()

serviceWorker.unregister();