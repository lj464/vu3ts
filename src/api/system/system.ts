import lJaxios from '@/service/request/index'
import {userListType} from './type'
export const systemApi =   {
    // 获取用户列表接口
    getUserList(data){
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
    }
}