import React, { Component, Fragment } from "react";
import "./App.css";
import { Router, Route, Redirect, Switch } from "react-router-dom";

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
import History from './services/History';
import Auth from './services/Auth0';
import Callback from './services/Callback';


const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}
class App extends Component {
  // sessions = [];

  componentDidMount() {
    // fetchBookmarks()
    // fetchSessions()

    const { renewSession } = auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }

      // api.get('/sessions').then((res) => {
      //   this.sessions = [...res.data]
      //   console.log(this.sessions)
      // }).catch((err) => {
      //   console.error('Could not fetch', err)
      // })

  }


  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    auth.login();
  }

  logout() {
    auth.logout();
  }

  render() {
    const { isAuthenticated } = auth;
    const tokenDetails = true;
    return (
      <div className="App">
        {

          <Router history={History}>

            <Fragment>
              <div>
                <Navbar tokenDetails={tokenDetails} />
              </div>

              <Switch>


                <Route exact path="/" render={() => {
                  // return this.login()
                  console.log(isAuthenticated());
                  if (!isAuthenticated()) {
                    return this.login()
                  } else {
                    return <Redirect to="/user" />
                  }
                }} />
                <Route exact path="/user" render={() => {
                  if (!isAuthenticated()) {
                    return <Redirect to="/login" />
                  } else {
                    return (
                      <div>
                        <button
                          id="qsLoginBtn"
                          onClick={this.login.bind(this)}
                        >
                          Log In
                        </button>
                        <button onClick={this.logout.bind(this)}>
                          Log Out
                      </button>
                      </div>
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
                <Route path="/callback" render={(props) => {
                  handleAuthentication(props);
                  return <Callback {...props} />
                }} />
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