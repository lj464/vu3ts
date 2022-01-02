import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import './assets/css/index.css'
import router from './router/index'
import srore from './store/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import LJi from '@/components/i/index.vue'

// ElIconModules as string{}
const app = createApp(App)
// console.log(Object.keys(ElIconModules))
// Object.keys(ElIconModules).forEach((v )=>{
//     app.component(v,ElIconModules[v  ])
// })
app.component('LJi',LJi)
app.use(ElementPlus)
app.use(router)
app.use(srore)
app.mount('#app')
