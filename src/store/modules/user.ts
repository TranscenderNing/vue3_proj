import { defineStore } from 'pinia'
import { reqUsercode, reqUserLogin } from '@/api/detail/index.ts'
import { GET_USERINFO, SET_USERINFO, REMOVE_USERINFO } from '@/utils/user'

const useUserStore = defineStore('user',{
    state: ()=>{
        return {
            dialogFormVisible: false,  // 控制登录组件中对话框的显示和隐藏
            usercode: '',
            userInfo: JSON.parse(GET_USERINFO() as string) || {}
        }
    },
    actions:{
        async getUsercode(phone: string){
            let res = await reqUsercode(phone)
            if(res.code === 200){
                this.usercode = res.data
                return 'ok'
            }else{
                Promise.reject(new Error('获取验证码失败'))
            }
        },
        
        async userLogin(data: any){
            let res = await reqUserLogin(data)
            if(res.code === 200){
                this.userInfo = res.data
                SET_USERINFO(JSON.stringify(this.userInfo))
                return 'ok'
            }else{
                Promise.reject(new Error('用户登录失败'))
            }
        },

        logout(){
            this.userInfo = {}
            REMOVE_USERINFO()
        },
        // 本地存储是否有数据
        queryState(){
            let timer = setInterval(()=>{
                if(GET_USERINFO()){
                    this.dialogFormVisible = false
                    this.userInfo = JSON.parse(GET_USERINFO() as string)
                    clearInterval(timer)
                }
            },1000)
        }
    },
    getters:{

    }
})

export default useUserStore
