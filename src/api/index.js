import { get, post, put, del } from './fetch'

// book api
export const addBook = (rData) => post('/api/book', rData)
export const getBook = (rData) => get('/api/book', rData)
export const getTag = (rData) => get('/api/tag', rData)
export const getCategory = (rData) => get('/api/category', rData)
export const getPos = (rData) => get('/api/pos', rData)
