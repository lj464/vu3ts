import { ref } from 'vue'
export function useModel(editCallback?:()=>void,addCallback?:()=>void) {
  let modelRef = ref<any>('')
  let defaultinfo = ref({})
  const handleNewData = () => {
    defaultinfo.value= {}
    addCallback()
    modelRef.value.centerDialogVisible = true
  }
  const handleEditData = (data) => {
    editCallback && editCallback()
    defaultinfo.value = {...data}
    modelRef.value.centerDialogVisible = true
  }
  return [modelRef, handleNewData, handleEditData,defaultinfo]
}
