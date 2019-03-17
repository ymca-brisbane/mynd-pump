import React, { Component, Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { fetchSessions } from "./services/SessionService"
import store from './config/store'
import { api } from './api/init'

// Components
// import Signin from './components/Signin'
// import Signup from './components/Signup'
import Dashboard from "./components/Dashboard/Dashboard"
import Navbar from "./components/Navbar"
import NotFound from "./components/NotFound"
// import Sessions from "./components/Sessions"
// import SessionCard from "./components/SessionCard"
// import User from "./components/User"
// import EditUser from "./components/EditUser"
import history from './services/history';



class App extends Component {
  // sessions = [];

  componentDidMount() {
    // fetchBookmarks()
    // fetchSessions()

    // const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      // renewSession();

      // api.get('/sessions').then((res) => {
      //   this.sessions = [...res.data]
      //   console.log(this.sessions)
      // }).catch((err) => {
      //   console.error('Could not fetch', err)
      // })
    }

  }


  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    // const sessions = store.getState().sessions
    const token = store.getState().token
    // const tokenDetails = token && decodeJWT(token)
    const tokenDetails = true;
    // console.log('sessions array', sessions)
    return (
      <div className="App">
        {

          <Router history={history}>

            <Fragment>
              <div>
                <Navbar tokenDetails={tokenDetails} />
              </div>

              <Switch>
                <Route exact path='/login' render={() => {
                  if (!isAuthenticated) {
                    return this.login()
                  } else {
                    return (<Redirect to="/" />)
                  }
                }} />

                <Route exact path='/signup' render={() => {
                  if (!isAuthenticated) {
                    return this.login()
                  } else {
                    return (<Redirect to="/" />)
                  }
                }} />

                <Route exact path="/" render={() => {
                  if (!isAuthenticated) {
                    return this.login()
                  } else {
                    return <Redirect to="/user" />
                  }
                }} />
                <Route exact path="/user" render={() => {
                  if (!isAuthenticated) {
                    return <Redirect to="/login" />
                  } else {
                     return (
                        <button
                          id="qsLoginBtn"
                          bsStyle="primary"
                          className="btn-margin"
                          onClick={this.login.bind(this)}
                        >
                          Log In
                        </button>
                     )
                  }
                }} />
                {/* <Route path="/user/edit" exact component={EditUser} /> */}
                {/* <Route exact path="/" render={() => (
                  <Sessions session={sessions} />
                )} /> */}
                {/* <Route exact path="/sessions" render={() => {
                  return <Sessions sessions={sessions} />
                }} /> */}
                {/* <Route exact path="/sessions/:id" component={SessionCard} /> */}
                <Route exact path="/dashboard" component={Dashboard} />
                <Route component={NotFound} />
              </Switch>
            </Fragment>
          </Router>
        }
      </div>
    );
  }
}

export default App;