import { ref } from 'vue'
export function useSearch(){
    let contentref =ref<any>('')
    const handleSearch = (data)=>{
      contentref.value.getBaseData(data)
    }
    return {contentref,handleSearch}
}