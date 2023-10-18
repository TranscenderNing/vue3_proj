<template>
  <div>
    <Carousel />
    <Search />
    <el-row gutter="20">
      <el-col :span="20">
          <Level @getLevel="getLevel" />
          <Region @getRegion="getRegion" />
          <div class="cards" v-if="hospitalArr.length > 0">
            <Card class="card" v-for="item in hospitalArr" :key="item.id" :hospitalInfo="item" />
          </div>
          <el-empty v-else description="暂无数据"></el-empty>
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="getHospital"
              :current-page="pageNo"
              :page-sizes="[10, 20, 50]"
              :page-size="limit"
              layout="prev, pager, next, jumper, ->, sizes, total"
              :total="total">
            </el-pagination>
      </el-col>
      <el-col :span="4">
        <Tip />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import Carousel from './carousel/index.vue'
import Search from './search/index.vue'
import Level from './level/index.vue'
import Region from './region/index.vue'
import Card from './card/index.vue'
import Tip from './tip/index.vue'

import { ref, onMounted } from 'vue'
import { reqHospital } from '@/api/home/index.ts'
import { ElMessage } from 'element-plus'
import { HospitalResponseData } from '@/api/home/type.ts'


// 分页相关的数据
let pageNo = ref<number>(1)
let limit = ref<number>(10)
let total = ref<number>(100)

let hospitalArr = ref<any>([])

// 带给服务器的参数数据
let hostype = ref<string>('')
let districtCode = ref<string>('')


// 触发子组件的自定义时事件的回调
const getLevel = (level)=>{
    console.log('父组件拿到了子组件的数据1',level)
    hostype.value = level
    getHospital()
}

const getRegion = (regionCode)=>{
    console.log('父组件拿到了子组件的数据2',regionCode)
    districtCode.value = regionCode
    getHospital()
}


onMounted(() => {
  getHospital()
})


// 改变页容量的回调
const handleSizeChange = (pageSize) =>{
  limit.value = pageSize
  getHospital()
}

// 获取分页数据  改变页码的回调
const getHospital = async (page = 1)=>{
    pageNo.value = page
    let res: HospitalResponseData = await reqHospital(pageNo.value,limit.value,hostype.value,districtCode.value)
    if(res.code === 200){
      hospitalArr.value = res.data.content
      total.value = res.data.totalElements
    }else{
      ElMessage({
        type: 'error',
        message: '获取数据失败'
      })
    }
}

</script>

<style scoped lang="scss">
.cards{

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .card{
    width: 48%;
    margin: 10px 0px;
  }
}
</style>