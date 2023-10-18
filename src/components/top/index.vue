<template>
    <div class="top">

        <div class="content">
            <div class="left" @click="goHome">
                <img src="../../assets/images/logo.png">
                <p>医院 预约挂号统一平台</p>
            </div>
            <div class="right">
                <p class="help">帮助中心</p>
                <p class="login" @click="goLogin" v-if="!userStore.userInfo.name">登录|注册</p>

                <el-dropdown v-else>
                    <span class="el-dropdown-link">
                        {{userStore.userInfo.name}}
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="goUser('/user/certification')">实名认证</el-dropdown-item>
                            <el-dropdown-item @click="goUser('/user/order')">挂号订单</el-dropdown-item>
                            <el-dropdown-item @click="goUser('/user/patient')">就诊人管理</el-dropdown-item>
                            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>


    </div>
</template>

<script setup lang="ts">

import { useRouter } from 'vue-router'

import { ArrowDown } from '@element-plus/icons-vue'
import useUserStore from '@/store/modules/user.ts'

let userStore = useUserStore()

let $router = useRouter()

const goHome = () => {
    $router.push({ path: '/home' })
}

// 登录的回调
const goLogin = () => {
    userStore.dialogFormVisible = true
}


//退出登录的回调
const logout = ()=>{
    userStore.logout()
    $router.push({path: '/home'})
}


const goUser = (path:string)=>{
    $router.push({path:path})
}


</script>

<style scoped lang="scss">
.top {
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: center;

    .content {
        width: 1200px;
        height: 70px;
        display: flex;
        justify-content: space-between;


        .left {
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: 50px;
                height: 50px;
                margin-right: 10px;
            }

            p {
                font-size: 20px;
                color: #55a6fe
            }
        }

        .right {
            margin-top: 25px;
            display: flex;
            justify-content: space-between;
            align-content: center;

            .help {
                margin-right: 10px;
            }

            p {
                font-size: 20px;
                color: #55a6fe
            }
        }
    }
}
</style>