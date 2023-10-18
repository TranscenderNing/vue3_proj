import router from './router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import pinia from '@/store'
import useUserStore from './store/modules/user'

let userStore = useUserStore(pinia)
let whiteList = [
                    '/home','/detail/register',
                    '/detail/detailInfo','/detail/notice',
                    '/detail/close','/detail/search',
                ]

router.beforeEach((to,from,next)=>{
    Nprogress.start()
    document.title = to.meta.title || 'vue3项目'

    let  token = userStore.userInfo.token
    console.log(token)
    if(token){
        next()
    }else{
        if(whiteList.includes(to.path)){
            next()
        }else{
            next({path:'/home',query:{redirect: to.fullPath}})
            userStore.dialogFormVisible = true
        }
    }

    next()
})


router.afterEach((to,from)=>{
    Nprogress.done()
})