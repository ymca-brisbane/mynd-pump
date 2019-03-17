import React, { Component, Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import { fetchSessions } from "./services/SessionService"
import store from './config/store'
import {
  setTokenAction,
  setLoginErrorAction,
  setSignupErrorAction,
  setSessionsAction,
} from './config/actions'
import { api, setJwt } from './api/init'
import decodeJWT from 'jwt-decode'

// Components
import Signin from './components/Signin'
import Signup from './components/Signup'
import Dashboard from "./components/Dashboard/Dashboard"
import Navbar from "./components/Navbar"
import NotFound from "./components/NotFound"
import Sessions from "./components/Sessions"
import SessionCard from "./components/Session"
import User from "./components/User"
import EditUser from "./components/EditUser"

class App extends Component {
  sessions = []

  componentDidMount() {
    // fetchBookmarks()
    fetchSessions()
    const token = localStorage.getItem('token')
    if (token) {
      store.dispatch(setTokenAction(token))
      setJwt(token)
    }

    api.get('/sessions').then((res) => {
      this.sessions = [...res.data]
      console.log(this.sessions)
    }).catch((err) => {
      console.error('Could not fetch', err)
    })
  }

  handleSignIn = async (event) => {
    try {
      event.preventDefault()
      const form = event.target
      const response = await api.post('/auth/login', {
        email: form.elements.email.value,
        password: form.elements.password.value
      })
      let token = response.data.token
      localStorage.setItem('token', token)
      setJwt(response.data.token)
      store.dispatch(setTokenAction(token))
      fetchSessions()
    } catch (error) {
      store.dispatch(setLoginErrorAction(error.message))
    }
  }

  handleSignOut = (event) => {
    api.get('/auth/logout').then(() => {
      localStorage.removeItem('token')
      store.dispatch(setTokenAction(null))
      store.dispatch(setSessionsAction([]))
      console.log('ping')
    })
  }

  handleSignUp = async (event) => {


    try {
      event.preventDefault()
      const form = event.target
      let unitIndex = this.units[form.elements.unit.value]
      console.log(unitIndex)

      const response = await api.post('/auth/register', {
        email: form.elements.email.value,
        password: form.elements.password.value,
        name: {
          firstname: form.elements.firstname.value,
          lastname: form.elements.lastname.value,
          guidename: form.elements.guidename.value
        },
        membershipNo: form.elements.membershipNo.value,
        phone: form.elements.phone.value,
        unit: {
          ...unitIndex
        }
      })
      let token = response.data.token
      localStorage.setItem('token', token)
      setJwt(response.data.token)
      store.dispatch(setTokenAction(token))

    } catch (error) {
      store.dispatch(setSignupErrorAction(error.message))
    }

  }

  render() {
    const sessions = store.getState().sessions
    const token = store.getState().token
    const tokenDetails = token && decodeJWT(token)
    console.log('sessions array', sessions)
    return (
      <div className="App">
        {

          <Router>

            <Fragment>
              <div>
                <Navbar tokenDetails={tokenDetails} />
              </div>
  
              <Switch>
                <Route exact path='/login' render={() => {
                  if (tokenDetails) {
                    return (<Redirect to="/" />)
                  } else {
                    return (<Signin loginError={store.getState().loginError} handleSignIn={this.handleSignIn} />)
                  }
                }} />

                <Route exact path='/signup' render={() => {
                  if (tokenDetails) {
                    return (<Redirect to="/" />)
                  } else {
                    return (<Signup signupError={store.getState().signupError} handleSignUp={this.handleSignUp} units={this.units && this.units} />)
                  }
                }} />

                <Route exact path="/" render={() => {
                  if (tokenDetails) {
                    return <Redirect to="/user" />
                  } else {
                    return <Redirect to="/login" />
                  }
                }} />
                <Route exact path="/user" render={() => {
                  if (tokenDetails) {
                    return (<User handleSignOut={this.handleSignOut} />)
                  } else {
                    return <Redirect to="/login" />
                  }
                }} />
                <Route path="/user/edit" exact component={EditUser} />
                <Route exact path="/" render={() => (
                  <Sessions session={sessions} />
                )} />
                <Route exact path="/sessions" render={() => {
                  return <Sessions sessions={sessions} />
                }} />
                <Route exact path="/sessions/:id" component={SessionCard} />
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