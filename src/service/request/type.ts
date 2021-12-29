import type { AxiosRequestConfig, AxiosResponse } from 'axios'
interface LJAxiosRequestConfig extends AxiosRequestConfig {
  // 传入拦截器类型
  interceptor?: {
    requestSuccess?: (config: AxiosRequestConfig) => AxiosRequestConfig
    requestError?: (error: any) => any
    respoceSuccess?: (res: AxiosResponse) => AxiosResponse
    respoceError?: (err: any) => any
  }
  ShowLoadling?: boolean
}
export { LJAxiosRequestConfig }
