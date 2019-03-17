  export function setSessionsAction(sessions) {
    return {
      type: 'set_sessions',
      sessions
    }
  }
  
  export function setSessionAction(session) {
    return {
      type: 'set_session',
      session
    }
  }
  
  export function setTokenAction(token) {
    return {
      type: 'set_token',
      token
    }
  }
  
  export function setLoginErrorAction(loginError) {
    return {
      type: 'set_loginError',
      loginError
    }
  }
  
  export function setSignupErrorAction(signupError) {
    return {
      type: 'set_signupError',
      signupError
    }
  }