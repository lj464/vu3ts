import { RouteRecordRaw } from 'vue-router'
let firstMenu: any = null
export function setRouter(youROutes: any[]): RouteRecordRaw[] {
  const routers: RouteRecordRaw[] = []
  const ALLroutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    let target = require('../router/main' + key.split('.')[1])
    ALLroutes.push(target.default)
  })

  const findmenu = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        if (firstMenu === null) {
          firstMenu = menu
        }
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
export function getMenuId(userMenu: any[], userPath: string) {
  for (const menu of userMenu) {
    if (menu.type === 2 && menu.url == userPath) {
      return menu
    } else if (menu.type === 1) {
      let target = getMenuId(menu.children, userPath)
      if (target) {
        return {
          target,
          parent: menu
        }
      }
    }
  }
}
export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = []

  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)

  return permissions
}
export { firstMenu }
