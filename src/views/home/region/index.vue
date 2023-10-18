<template>
  <div class="region">
    <div class="content">
      <div class="left">地区:</div>
      <ul class="right">
        <li :class="{active: activeFlag===''}" @click="changeRegion('')">全部</li>
        <li :class="{active: activeFlag===region.value}" @click="changeRegion(region.value)" v-for="region in regionArr" :key="region.value">
          {{ region.name }}
        </li>

      </ul>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'

import { reqHospitalLevelAndRegion } from '@/api/home'
import { ref, onMounted } from 'vue'


let $emit = defineEmits(['getRegion'])

// 从服务器获取的数据
let regionArr = ref<any>([])

// 控制选中的数据高亮效果
let activeFlag = ref<string>('')

// 从服务器获取数据
const getRegion = async () => {
  let res = await reqHospitalLevelAndRegion('Beijin')
  if (res.code === 200) {
    regionArr.value = res.data
  }
}


// 点击li标签的回调
const changeRegion = (regionValue)=>{
  activeFlag.value = regionValue
  $emit('getRegion',regionValue)
}

onMounted(() => {
  getRegion()
})


</script>
  
<style scoped lang="scss" >
.region {
  margin-top: 10px;
  color: #7f7f7f;

  .content {
    display: flex;

    .left {
      margin-right: 10px;
      width: 40px;
    }

    .right {
      display: flex;
      flex-wrap: wrap;

      li {
        margin-right: 10px;
        margin-bottom: 10px;

        &.active {
          color: #55a6fe
        }
      }

      li:hover {
        color: #55a6fe;
        cursor: pointer;
      }

    }
  }
}</style>