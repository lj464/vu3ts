
import { RouteRecordRaw } from 'vue-router'

export function setRouter(youROutes:any[]):RouteRecordRaw[]{
    const routers:RouteRecordRaw[] = []
    const ALLroutes:RouteRecordRaw[] = []
    const routeFiles = require.context('../router/main',true,/\.ts/)
    routeFiles.keys().forEach(key=>{
        let target = require(('../router/main' + key.split('.')[1]))
        ALLroutes.push(target.default)
    })

    const  findmenu = (menus:any[])=>{
        for (const menu of menus) {
            if (menu.type === 2) {
              const route = ALLroutes.find((route) => route.path === menu.url)
              if (route) routers.push(route)
            } else {
                findmenu(menu.children)
            }
          }
    }

    findmenu(youROutes)
    return routers
}