// api.jsx
import axios from 'axios'

export const get = (url, data) => {
    return axios.get(url, data)
        .then(response => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
}

export const post = (url, data) => {
    return axios.post(url, data)
        .then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
}

export const put = (url, data) => {
    return axios.put(url, data)
        .then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
}

export const del = (url, data) => {
    return axios.delete(url, data)
        .then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
}
