<template>
  <div class="search">
    <el-autocomplete v-model="hosname" :fetch-suggestions="querySearch" :trigger-on-focus="false" clearable
      class="inline-input w-50" placeholder="请输入医院名称" @select="handleSelect" />

    <el-button type="primary" :icon="Search">搜索</el-button>
  </div>
</template>
  
<script setup lang="ts">

import { Search } from '@element-plus/icons-vue'
import { reqHospitalByKeyword } from '@/api/home'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

let $router = useRouter()

// 收集关键字
let hosname = ref<string>('')

// 显示搜索推荐项回调
const querySearch = async (keyword:string,cb:any)=>{
    let res = await reqHospitalByKeyword(keyword)
    if(res.code === 200){
      let showData = res.data.map(item =>{
        return {
          value: item.hosname,
          hoscode: item.hoscode
        }
      })
      cb(showData)
    }

}

// 点击搜索推荐项回调
const handleSelect = (item)=>{
  console.log(item)
  $router.push({path: '/detail',query:{hoscode: item.hoscode}})
}


</script>


<script lang="ts">
  export default {
    name: 'Search'
  }
</script>
  
<style scoped lang="scss" >
.search {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;

  ::v-deep(.el-input__wrapper) {
    width: 600px;
    margin-right: 10px;
  }
}
</style>