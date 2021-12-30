let BASE_URL: string = ''
let TIME_OUT: number = 3500

import { LJAxiosRequestConfig } from './request/type'
if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://coderwhy.org/prod'
} else {
  BASE_URL = 'http://coderwhy.org/test'
}
export default {
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptor: {
    requestSuccess(config: LJAxiosRequestConfig) {
      return config
    }
  }
}
