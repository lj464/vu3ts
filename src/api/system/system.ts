import lJaxios from '@/service/request/index'
import {userListType} from './type'
export const systemApi =   {
    // 获取用户列表接口
    getUsersList(data){
        return lJaxios.post<userListType>({
            url:"/users/list",
            data
        })
    },
    getRoleList(data){
        return lJaxios.post<userListType>({
            url:"/role/list",
            data
        })
    },
    getGoodsList(data){
        return lJaxios.post<userListType>({
            url:"/goods/list",
            data
        })
    },
    getMenuList(data){
        return lJaxios.post<userListType>({
            url:"/menu/list",
            data
        })
    }
}