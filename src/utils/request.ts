import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user.ts'

const request = axios.create({
    baseURL: '/api',
    timeout: 5000
})


request.interceptors.request.use((config)=>{
    let userStore = useUserStore()
    if(userStore.userInfo.token){
        config.headers.token = userStore.userInfo.token
    }
    return config
})


request.interceptors.response.use((response)=>{
    return response.data
},(err)=>{
    return Promise.reject(new Error(err.message))
})


export default request
