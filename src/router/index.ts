import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/home',
            component: ()=>import('@/views/home/index.vue'),
            meta: {
                title: '首页'
            }
        },
        {
            path: '/detail',
            component: ()=>import('@/views/detail/index.vue'),
            redirect: '/detail/register',
            children: [
                {
                    path: 'register',
                    component: ()=>import('@/views/detail/register/index.vue')
                },
                {
                    path: 'detailInfo',
                    component: ()=>import('@/views/detail/detailInfo/index.vue')
                },
                {
                    path: 'notice',
                    component: ()=>import('@/views/detail/notice/index.vue')
                },
                {
                    path: 'close',
                    component: ()=>import('@/views/detail/close/index.vue')
                },
                {
                    path: 'search',
                    component: ()=>import('@/views/detail/search/index.vue')
                },
                {
                    path: 'register_step1',
                    component: ()=>import('@/views/detail/register/register_step1.vue')
                },
                {
                    path: 'register_step2',
                    component: ()=>import('@/views/detail/register/register_step2.vue')
                },
            ]
        },
        {
            path: '/user',
            component: ()=>import('@/views/user/index.vue'),
            redirect: '/user/certification',
            children: [
                {
                    path: 'certification',
                    component: ()=>import('@/views/user/certification/index.vue')
                },
                {
                    path: 'order',
                    component: ()=>import('@/views/user/order/index.vue')
                },
                {
                    path: 'patient',
                    component: ()=>import('@/views/user/patient/index.vue')
                },
                {
                    path: 'profile',
                    component: ()=>import('@/views/user/profile/index.vue')
                },
                {
                    path: 'feedback',
                    component: ()=>import('@/views/user/feedback/index.vue')
                }
            ]
        },
        {
            path: '/wxlogin',
            component: ()=>import('@/views/wxlogin/index.vue')
        },
        {
            path: '/',
            redirect: '/home'
        }
    ],
    scrollBehavior(){
        return {
            left: 0,
            top: 0
        }
    }
})