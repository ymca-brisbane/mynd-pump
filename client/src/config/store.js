import { createStore } from 'redux'

const initialState = {
  sessions: [],
  session: null,
  loggedIn: false,
  signedUp: false,
  token: null,
  loginError: null,
  signupError: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'set_sessions':
      return { ...state, activities: action.sessions }
    case 'set_session':
      return { ...state, activity: action.session }
    case 'set_loginError':
      return { ...state, loginError: action.loginError }
    case 'set_signupError':
      return { ...state, signupError: action.signupError }
    case 'set_token':
      return { ...state, token: action.token }
    default:
      return state
  }
}

export default createStore(reducer, initialState)