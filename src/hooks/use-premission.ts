import { useStore } from 'vuex'
export function usePremission(pageName, hanldeName) {
  const store = useStore()
  const permission = store.state.permissions
  const verifyPermission = `system:${pageName}:${hanldeName}`
  console.log(
    permission.find((item) => {
        console.log(item,verifyPermission)
      if (item == verifyPermission) {
        return true
      }
    })
  )
  return !!permission.some((item) => {
    if (item == verifyPermission) {
      return true
    }
  })
}
