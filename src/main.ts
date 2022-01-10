import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import './assets/css/index.css'
import router from './router/index'
import srore from './store/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {setDefault} from '@/store/index'
import {regester} from '@/global/regester'
const app = createApp(App)

const win: any = window
if (process.env.NODE_ENV === 'development') {
  if ('__VUE_DEVTOOLS_GLOBAL_HOOK__' in win) {
    win.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app
  }
}
setDefault()
app.use(ElementPlus)
app.use(router)
app.use(srore)
// 注册全局
app.use(regester)
app.mount('#app')
