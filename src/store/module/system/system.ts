import type { Module } from 'vuex'
import { ISystemState } from './types'
import { stateType } from '../../types'
import { systemApi } from '@/api/system/system'
import {} from 'element-plus'
const login: Module<ISystemState, stateType> = {
  namespaced: true,
  state: () => {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  mutations: {
    changeUsersList(state, userList: any[]) {
      state.usersList = userList
    },
    changeUsersCount(state, usersCount: number) {
      state.usersCount = usersCount
    },
    changeRoleList(state, data: any[]) {
      state.roleList = data
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count
    },
    changeGoodsList(state, data: any[]) {
      state.goodsList = data
    },
    changeGoodsCount(state, count: number) {
      state.goodsCount = count
    },
    changeMenuList(state, data: any[]) {
      state.menuList = data
    },
    changeMenuCount(state, count: number) {
      state.menuCount = count
    }
  },
  actions: {
    async getListAction({ commit }, payload: any) {
      // 1.对页面发送请求
      let targetName = payload.targetName
      const pageResult = await systemApi[`get${targetName}List`](
        payload.queryInfo
      )
      const { list, totalCount } = pageResult.data
      commit(`change${targetName}List`, list)
      commit(`change${targetName}Count`, totalCount)
    },
    async deleteListAction({ dispatch }, payload: any) {
      let { id, name } = payload
      let res = await systemApi.deleteTableData(name, id)
      if (res.data.code === 0) {
        const targetName =name.slice(0, 1).toUpperCase() + name.slice(1)
        dispatch('getListAction', {
          queryInfo: {
            offset: 0,
            size: 10,
          },
          targetName
        })
      }
      console.log(res, 'resssssssss')
    },
    // 模态框新增
    async createPageDataAction({ dispatch }, payload: any) {
      // 1.创建数据的请求
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      let res = await systemApi.createPageData(pageUrl, newData)

      // 2.请求最新的数据
        const targetName =pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
        dispatch('getListAction', {
          queryInfo: {
            offset: 0,
            size: 10,
          },
          targetName
        })
    },
    // 模态框编辑
    async editPageDataAction({ dispatch }, payload: any) {
      // 1.创建数据的请求
      const { pageName, newData ,id} = payload
      const pageUrl = `/${pageName}/${id}`
      let res = await systemApi.editPageData(pageUrl, newData)

      // 2.请求最新的数据
        const targetName =pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
        dispatch('getListAction', {
          queryInfo: {
            offset: 0,
            size: 10,
          },
          targetName
        })
    },
  },
  getters: {
    pageListData(state): (pageName: string) => any {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    listCount(state): (pageName: string) => any {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  }
}
export default login
