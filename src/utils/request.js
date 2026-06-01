import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 5000,
})

request.interceptors.request.use(config => {
  return config
})

request.interceptors.response.use(
  response => response.data,
  error => {
    return Promise.reject(error)
  }
)

export default request
