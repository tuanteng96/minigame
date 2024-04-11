import axios from 'axios'

class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.DEV ?
        import.meta.env.VITE_API : "",
      timeout: 50000,
      headers: {
        'content-type': 'text/plain'
      },
      withCredentials: true
    })
    this.instance.interceptors.request.use(
      config => {
        // if (this.accessToken) {
        //   config.headers.Authorization = 'Bearer ' + this.accessToken
        // }
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )
    // Add response interceptor
    this.instance.interceptors.response.use(
      ({
        data
      }) => {
        return {
          data
        }
      },
      error => {
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http