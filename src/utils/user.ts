
export const SET_USERINFO = (userInfo: string)=>{
    localStorage.setItem('USERINFO',userInfo)
}

export const GET_USERINFO = ()=>{
    return localStorage.getItem('USERINFO')
}

export const REMOVE_USERINFO = ()=>{
    localStorage.removeItem('USERINFO')
}