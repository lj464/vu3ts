import {formatTime} from './regesterFormatTime'
import {regesterLJi} from './regesterLJi'

export function regester(app){
    app.use(formatTime)
    app.use(regesterLJi)
} 
export default {}
