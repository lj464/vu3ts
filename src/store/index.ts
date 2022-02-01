import { createStore } from 'vuex'
import system from './module/system/system'
import { stateType } from './types'
import {
  loginApi,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/api/login/login'
import { IAccount } from '../api/login/types'
import router from '@/router'
import localCache from '@/utils/cache'
import { setRouter, mapMenusToPermissions } from '@/utils/map-menus'
import { systemApi } from '@/api/system/system'
import dashboard from './module/analysis/dashboard'
const store = createStore<stateType>({
  state() {
    return {
      token: '',
      userInfo: '',
      userMenus: localCache.getCache('userMenus'),
      permissions: [],
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    steToken(state, data: string) {
      state.token = data
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      // 获取用户按钮的权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    },
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state,list){
      state.entireMenu = list
    }
  },
  getters: {},
  actions: {
    accountLoginAction: async ({ commit }, payload: IAccount) => {
      let res = await loginApi(payload)
      // 设置token
      commit('steToken', res.data.token)
      localCache.setCache('token', res.data.token)
      let userInfoResult = await requestUserInfoById(res.data.id)
      const userInfo = userInfoResult.data
      // 保存该账号的用户信息用来做按钮权限等
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)
      router.push('/main')
      // 设置用户权限，在main.js中也有调用，这样刷新动态路由也会出现
      setDefault()
    },

    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('steToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
        const routes = setRouter(userMenus)
        console.log(routes,'routessss')
        routes.forEach((route) => {
          router.addRoute('main', route)
        })
      }
    },
    // 获取角色部门列表
    async getInitialDataAction({ commit }) {
      let depres = await systemApi.getDepartment({
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = depres.data
      let roleres = await systemApi.getRoleList({
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleres.data
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      // 保存角色菜单列表
      let menuListRes =  await systemApi.getMenuList({})
      const { list: menuList } = menuListRes.data
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    system,
    dashboard
  }
})

export function setDefault() {
  store.dispatch('loadLocalLogin')
  store.dispatch('getInitialDataAction')
}

export default store
