import lJaxios from '@/service/request/index'
import { IAccount,ILoginResult } from './types'

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


