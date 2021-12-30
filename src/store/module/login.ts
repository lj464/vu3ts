import type {Module} from  'vuex'
import { ILoginState } from './types'
import {stateType} from '../types'
// import {loginApi} from '@/api/login'
// import { IAccount } from '../../api/types'
const login:Module<ILoginState,stateType> = {
    state:()=>{
        return {
            token:""
        }
    },
    mutations:{
        steToken(state,data:string){
            state.token = data
        }
    },
    // actions:{
    //     async accountLoginAction ({commit},payload:IAccount){
    //         console.log('diaoyongl')
    //         let res = await loginApi(payload)
    //         commit('steToken', payload)
    //         console.log(res.data.token,'sssssssssssss')
    //     }  
    // }
    // actions:{
    //     accountLoginAction(){
    //         console.log('888888888888')
    //     }
    // }
}
export default login