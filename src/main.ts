import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import './assets/css/index.css'
import router from './router/index'
import srore from './store/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './service/index'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(srore)
app.mount('#app')
