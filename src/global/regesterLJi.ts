import {App} from 'vue'
import LJi from '@/components/i/index.vue'

export let  regesterLJi = function(app:App){
    app.component('LJi',LJi)
}