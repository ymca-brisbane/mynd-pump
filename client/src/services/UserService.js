import { api } from '../api/init'

const fetchUser = () => {
    api.get('/users').then((res) => {
        console.log(res.data)
    }).catch((err) => {
        console.error('Could not fetch user', err)
    })
}

export { fetchUser }