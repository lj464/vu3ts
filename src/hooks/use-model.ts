import { ref } from 'vue'
export function useModel(editCallback?:(item?:any)=>void,addCallback?:()=>void) {
  let modelRef = ref<any>('')
  let defaultinfo = ref({})
  const handleNewData = () => {
    console.log('执行了创建')
    defaultinfo.value= {}
    addCallback && addCallback()
    modelRef.value.centerDialogVisible = true
  }
  const handleEditData = (data) => {
    editCallback && editCallback(data)
    defaultinfo.value = {...data}
    modelRef.value.centerDialogVisible = true
  }
  return [modelRef, handleNewData, handleEditData,defaultinfo]
}
