import axios from 'axios'
import { AxiosInstance, AxiosResponse } from 'axios'
import { LJAxiosRequestConfig } from './type'
import { ElLoading } from 'element-plus'
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
        return config
      },
      (err) => err
    )
    this.instance.interceptors.response.use(
      (res) => {
        setTimeout(() => {
          this.LJloading?.close()
        }, 5000)
        return res
      },
      (err) => err
    )
  }
  request(config: LJAxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance(config)
  }
}
export default LJrequst
