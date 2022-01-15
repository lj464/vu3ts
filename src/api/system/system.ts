import lJaxios from '@/service/request/index'
import { userListType, deleteType } from './type'
export const systemApi = {
  // 获取用户列表接口
  getUsersList(data) {
    return lJaxios.post<userListType>({
      url: '/users/list',
      data
    })
  },
  getRoleList(data) {
    return lJaxios.post<userListType>({
      url: '/role/list',
      data
    })
  },
  getGoodsList(data) {
    return lJaxios.post<userListType>({
      url: '/goods/list',
      data
    })
  },
  getMenuList(data) {
    return lJaxios.post<userListType>({
      url: '/menu/list',
      data
    })
  },
  // 删除逻辑
  deleteTableData(name, id) {
    return lJaxios.delete<deleteType>({
      url: `${name}/${id}`
    })
  },
  // 模态框新增
  createPageData(url: string, newData: any) {
    return lJaxios.post({
      url: url,
      data: newData
    })
  },
  //   模态框编辑
  editPageData(url: string, newData: any) {
    return lJaxios.patch({
      url: url,
      data: newData
    })
  },
  // 获取部门角色列表
  getDepartment(data) {
    return lJaxios.post<userListType>({
      url: '/department/list',
      data
    })
  }
}
