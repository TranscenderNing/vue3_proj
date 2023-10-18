<template>
  <div class="level">
    <h1>医院</h1>
    <div class="content">
      <div class="left">等级:</div>
      <ul class="right">
        <li :class="{active: activeFlag===''}" @click="changeLevel('')">全部</li>
        <li :class="{active: activeFlag===level.value}" v-for="level in levelArr" :key="level.value" @click="changeLevel(level.value)">{{ level.name }}</li>

      </ul>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { reqHospitalLevelAndRegion } from '@/api/home'
import { ref, onMounted } from 'vue'


let $emit = defineEmits(['getLevel'])

// 从服务器获取的数据
let levelArr = ref<any>([])
// 控制选中的数据高亮效果
let activeFlag = ref<string>('')

// 从服务器获取数据
const getLevel = async () => {
  let res = await reqHospitalLevelAndRegion('HosType')
  if (res.code === 200) {
    levelArr.value = res.data
  }
}


// 点击li标签的回调
const changeLevel = (levelValue)=>{
  activeFlag.value = levelValue
  $emit('getLevel',levelValue)
}

onMounted(() => {
  getLevel()
})

</script>
  
<style scoped lang="scss" >
.level {
  color: #7f7f7f;

  h1 {
    font-weight: 900;
    margin: 10px 0px;
  }

  .content {
    display: flex;

    .left {
      margin-right: 10px;
    }

    .right {
      display: flex;

      li {
        margin-right: 10px;

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