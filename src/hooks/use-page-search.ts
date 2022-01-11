import { ref } from 'vue'
export function useSearch(){
    let contentref =ref()
    const handleSearch = (data)=>{
      contentref.value.getBaseData(data)
    }
    return {contentref,handleSearch}
}