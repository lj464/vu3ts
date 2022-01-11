import type { Module } from 'vuex'
import { ISystemState } from './types'
import { stateType } from '../../types'
import { systemApi } from '@/api/system/system'
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
    }
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
