
export interface stateType {
    token:string,
    userInfo:any,
    userMenus:any,
    permissions:string[],
    entireDepartment: any[]
    entireRole: any[],
    entireMenu:any[]
}
export default interface userMenuObj {
    name:string,
    id:number,
    sort:number,
    type:number,
    url:string,
    icon?:string,
    children?: userMenuObj[]
}
