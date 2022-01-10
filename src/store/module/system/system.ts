import type {Module} from  'vuex'
import { ISystemState } from './types'
import {stateType} from '../../types'
import {systemApi} from '@/api/system/system'
const login:Module<ISystemState,stateType> = {
    namespaced:true,
    state:()=>{
        return {
            userList:[],
            userCount:0,
            roleList:[],
            roleCount:0,
        }
    },
    mutations:{
        changeUserList(state, userList: any[]) {
            state.userList = userList
          },
          changeUserCount(state, userCount: number) {
            state.userCount = userCount
          },
          changeRoleList(state, data: any[]) {
            state.roleList = data
          },
          changeRoleCount(state, count: number) {
            state.roleCount = count
          }
    },
    actions: {
        async getListAction({ commit }, payload: any) {
          // 1.对页面发送请求
          let targetName = payload.targetName
          const pageResult = await systemApi[`get${targetName}List`](
            payload.queryInfo
          )
          console.log(pageResult.data,'444444444444')
          const { list, totalCount } = pageResult.data
          commit(`change${targetName}List`, list)
          commit(`change${targetName}Count`, totalCount)
        },

      },
      getters:{
        pageListData(state):(pageName: string)=>any {
          return (pageName: string) => {
            return (state as any)[`${pageName}List`]
          }
        }
      }
}
export default login