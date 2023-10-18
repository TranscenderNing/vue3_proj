<template>
  <div class="detail">
    <!-- 左侧导航区 -->
    
    <div class="menu">
      <div class="top">
        <el-icon><HomeFilled /></el-icon>
        <span>/ 医院信息</span>
      </div>
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <el-menu-item index="/detail/register" @click="changeActive('/detail/register')">
          <el-icon><icon-menu /></el-icon>
          <span>预约挂号</span>
        </el-menu-item>
        <el-menu-item index="/detail/detailInfo" @click="changeActive('/detail/detailInfo')">
          <el-icon>
            <document />
          </el-icon>
          <span>医院详情</span>
        </el-menu-item>
        <el-menu-item index="/detail/notice" @click="changeActive('/detail/notice')">
          <el-icon>
            <setting />
          </el-icon>
          <span>预约通知</span>
        </el-menu-item>
        <el-menu-item index="/detail/close" @click="changeActive('/detail/close')">
          <el-icon>
            <InfoFilled />
          </el-icon>
          <span>停诊信息</span>
        </el-menu-item>
        <el-menu-item index="/detail/search" @click="changeActive('/detail/search')">
          <el-icon>
            <search></search>
          </el-icon>
          <span>查询和取消</span>
        </el-menu-item>
      </el-menu>

    </div>

    <!-- 内容展示区 -->
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

import { useRouter,useRoute } from 'vue-router'
import { ref,onMounted } from 'vue'
import useDetailStore from '@/store/modules/detail.ts'

let $router = useRouter()
let $route = useRoute()

let detailStore = useDetailStore()

// 挂载的时候 通知仓库发送请求 存储到仓库中
onMounted(() => {
  detailStore.getHospitalDetail($route.query.hoscode)
  detailStore.getHospitalDepartment($route.query.hoscode)
})

// 点击菜单的回调
const changeActive = (path : string)=>{
  $router.push({path,query:{hoscode:$route.query.hoscode}})
}

</script>

<style scoped lang="scss">
.detail {
  display: flex;

  .menu {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;

    .top{
      color: #7f7f7f;
    }
  }

  .content {
    flex: 8
  }

}
</style>