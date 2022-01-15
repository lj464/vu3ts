import axios from 'axios'
import { AxiosInstance, AxiosResponse } from 'axios'
import { LJAxiosRequestConfig } from './type'
import { ElLoading } from 'element-plus'
import localCache from '@/utils/cache'
import config from '@/service/config'
const DEFAULT_SHOW = true
class LJrequst {
  instance: AxiosInstance
  LJloading?: any
  constructor(config: LJAxiosRequestConfig) {
    this.instance = axios.create(config)
    // 设置传入拦截器
    this.instance.interceptors.request.use(
      config.interceptor?.requestSuccess,
      config.interceptor?.requestError
    )
    this.instance.interceptors.response.use(
      config.interceptor?.respoceSuccess,
      config.interceptor?.respoceError
    )
    // 设置默认拦截器
    this.instance.interceptors.request.use(
      (config: LJAxiosRequestConfig) => {
        if (config.ShowLoadling ?? DEFAULT_SHOW === true) {
          this.LJloading = ElLoading.service({
            lock: true,
            text: '正在加载中',
            background: 'rgba(0,0,0,0.5)'
          })
        }
        const token = localCache.getCache('token')
        if (!!token) {
          config.headers = config.headers ?? {}
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (err) => err
    )
    this.instance.interceptors.response.use(
      (res) => {
          this.LJloading?.close()
        if(res.status === 200){
          return res.data
        }
        return res
      },
      (err) => {
        this.LJloading?.close()
        return err
      }
    )
  }
  request<T = any>(config: LJAxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance(config)
  }
  get<T>(config: LJAxiosRequestConfig):Promise<AxiosResponse<T>>{
    return this.request({...config,method:'get'})
  }
  post<T>(config: LJAxiosRequestConfig):Promise<AxiosResponse<T>>{
    return this.request({...config,method:'post'})
  }
  patch<T>(config: LJAxiosRequestConfig):Promise<AxiosResponse<T>>{
    return this.request({...config,method:'patch'})
  }
  delete<T>(config: LJAxiosRequestConfig):Promise<AxiosResponse<T>>{
    return this.request({...config,method:'delete'})
  }
}
export default new LJrequst(config)

