// api.js
import axios from 'axios'

export const get = (url, data) => {
    return new Promise((resolve, reject) => {
        axios.get(url, { params: data }).then(response => {
            resolve(response.data)
        }).catch((error) => {
            reject(error)
        })
    })
}

export const post = (url, data) => {
    return new Promise((resolve, reject) => {
        // 转换格式
        let params = new window.URLSearchParams()
        Object.keys(data).forEach((key) => {
            params.append(key, data[key])
        })
        axios.post(url, params).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            reject(error)
        })
    })
}

export const put = (url, data) => {
    return new Promise((resolve, reject) => {
        // 转换格式
        let params = new window.URLSearchParams()
        Object.keys(data).forEach((key) => {
            params.append(key, data[key])
        })
        axios.put(url, params)
            .then(response => {
                resolve(response.data)
            }).catch((error) => {
                reject(error)
            })
    })
}

export const del = (url, data) => {
    return new Promise((resolve, reject) => {
        // 转换格式
        axios.delete(url, { params: data })
            .then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error)
            })
    })
}
