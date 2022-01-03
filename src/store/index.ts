import { createStore } from 'vuex'
import login from './module/login'
import {stateType} from './types'
import {loginApi , requestUserInfoById ,requestUserMenusByRoleId } from '@/api/login'
import { IAccount } from '../api/types'
import router from '@/router'
import localCache from '@/utils/cache'
import {setRouter} from '@/utils/map-menus'
const store = createStore<stateType>({
  state() {
    return {
      token:"",
      userInfo:'',
      userMenus:localCache.getCache('userMenus')
    }
  },
  mutations: {
    steToken(state,data:string){
      state.token = data
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
    }
  },
  getters: {},
  actions: {
     accountLoginAction :async ({commit},payload:IAccount)=>{
        let res = await loginApi(payload)
        commit('steToken', res.data.token)
        localCache.setCache('token', res.data.token)
        let userInfoResult = await requestUserInfoById(res.data.id)
        const userInfo = userInfoResult.data
        commit('changeUserInfo', userInfo)
        localCache.setCache('userInfo', userInfo)
        const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
        const userMenus = userMenusResult.data
        commit('changeUserMenus', userMenus)
        localCache.setCache('userMenus', userMenus)
        router.push('/main')
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
       const routes =   setRouter(userMenus)
       routes.forEach((route)=>{
         router.addRoute('main',route)
       })
      }
    }  
  },
  modules: {
    login
  }
})

export function setDefault (){
  store.dispatch('loadLocalLogin')
}

export default store
