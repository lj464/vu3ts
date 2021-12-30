import LJrequst from '@/service/request/index'

import config from '@/service/config'
import { IAccount,ILoginResult } from './types'

let lJaxios = new LJrequst(config)

export function loginApi (data:IAccount){
  return lJaxios.request<ILoginResult>({
        method: 'post',
        url: '/login',
        ShowLoadling: false,
        data
      })
}

export function requestUserInfoById(id: number) {
  return lJaxios.request({
    method:'get',
    ShowLoadling: false,
    url:`/users/${id}`
  })
}
export function requestUserMenusByRoleId (id: number){
  return lJaxios.request({
    method:'get',
    ShowLoadling: false,
    url:`/role/${id}/menu`
  })
}


