
export interface stateType {
    token:string,
    userInfo:any,
    userMenus:any
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
