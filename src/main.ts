import { createApp } from 'vue'
import App from '@/App.vue'
import '@/styles/reset.scss'

import Top from '@/components/top/index.vue'
import Bottom from '@/components/bottom/index.vue'

import router from '@/router/index'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import pinia from '@/store/index.ts'

import Login from '@/components/login/index.vue'
import Visitor from '@/components/visitor/visitor.vue'

import './permission.ts'


const app = createApp(App) 
// 注册全局组件
app.component('Top',Top)
app.component('Bottom',Bottom)
app.component('Login',Login)
app.component('Visitor',Visitor)

// 注册路由插件
app.use(router)
app.use(pinia)
app.use(ElementPlus,{
    locale: zhCn,
  })


app.mount('#app')
