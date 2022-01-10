import {App} from 'vue'
import { formatUtcString } from '@/utils/date-format'
export function formatTime(app:App) {
    app.config.globalProperties.$formatTime = function(str:string){
        return formatUtcString(str)
    }
}