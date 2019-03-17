import store from '../config/store'
import { setSessionsAction, setSessionAction } from '../config/actions'
import { api } from '../api/init'

const fetchSessions = () => {
    api.get('/sessions').then((res) => {
        store.dispatch(setSessionsAction(res.data))
    }).catch((err) => {
        console.error('Could not fetch sessions', err)
    })
   
}

const fetchSession = (id) => {
    api.get(`/sessions/${id}`).then((res) => {
        store.dispatch(setSessionAction(res.data))
    }).catch((err) => {
        console.error('Could not fetch sessions', err)
    })
    
}

// Do we need to be able to add sessions?
const addSession = (session) => {
    api.post('/session', {
        title: session.title,
        description: session.description,
    }).then((res)=>{
        const newSessions = [...store.getState().sessions,res.data]
        store.dispatch(setSessionsAction(newSessions))
    }).catch((err) => {
        console.error('Could not add sessions', err)
    })
}

// Do we need to be able to update sessions?
const updateSession = (session) => {
    const {title, description, id} = session
    const index = store.getState().Sessions.findIndex(session => session._id === id)
    api.put(`/Sessions/${id}`, {
        title,
        description,
    }).then((res)=>{
        if (index >= 0) {
            const newSessions = [...store.getState().Sessions]
            newSessions[index] = res.data
            store.dispatch(setSessionsAction(newSessions))
        }
    }).catch((err) => {
        console.error('Could not update Sessions', err)
    })
}

// Do we need to be able to remove sessions?
const removeSession = (id) => {
    api.delete(`/sessions/${id}`)
    const index = store.getState().session.findIndex(session => session._id === id)
    if (index >= 0) {
      const newSessions = [...store.getState().sessions]
      newSessions.splice(index, 1)
      store.dispatch(setSessionsAction(newSessions))
    }
  
  }

export { fetchSessions, fetchSession, removeSession, addSession, updateSession }