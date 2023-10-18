<template>
    <div class="user">
        <div class="menu"> 
            <div class="top">
                <el-icon>
                    <HomeFilled />
                </el-icon>
                <span>/ 会员中心</span>
            </div>
            <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                <el-menu-item index="/user/certification" @click="changeActive('/user/certification')">
                    <el-icon><icon-menu /></el-icon>
                    <span>实名认证</span>
                </el-menu-item>
                <el-menu-item index="/user/order" @click="changeActive('/user/order')">
                    <el-icon>
                        <document />
                    </el-icon>
                    <span>挂号订单</span>
                </el-menu-item>
                <el-menu-item index="/user/patient" @click="changeActive('/user/patient')">
                    <el-icon>
                        <setting />
                    </el-icon>
                    <span>就诊人管理</span>
                </el-menu-item>
                <el-menu-item index="/user/profile" @click="changeActive('/user/profile')">
                    <el-icon>
                        <InfoFilled />
                    </el-icon>
                    <span>账号信息</span>
                </el-menu-item>
                <el-menu-item index="/user/feedback" @click="changeActive('/user/feedback')">
                    <el-icon>
                        <search></search>
                    </el-icon>
                    <span>意见反馈</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>

    </div>
</template>

<script setup lang="ts">

import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
    InfoFilled,
    Search,
    HomeFilled
} from '@element-plus/icons-vue'


import { useRouter, useRoute } from 'vue-router'

let $router = useRouter()
let $route = useRoute()

const changeActive = (path)=>{
    $router.push({path:path})
}

</script>

<style scoped lang="scss">
.user {
    display: flex;

    .menu {
        flex: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        .top {
            color: #7f7f7f;
        }
    }

    .content {
        flex: 8;
    }
}
</style>