<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>挂号订单</span>
        </div>
      </template>

      <el-form :inline="true" ref="form" :model="form" label-width="80px">
        <el-form-item label="就诊人">
          <el-select v-model="patientId" placeholder="请选择就诊人" @change="changePatient"> 
            <el-option label="请选择全部就诊人" value=""></el-option>
            <el-option :label="item.name" v-for="item in patientList" :key="item.id" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="orderStatus" placeholder="请选择订单状态" @change="changeStatus">
            <el-option label="请选择全部订单状态" value=""></el-option>
            <el-option :label="item.comment" v-for="(item,index) in orderStatusList" :key="index" :value="item.status"></el-option>
          </el-select>
        </el-form-item>

        <el-table :data="orderList" style="width: 100%;margin:10px 0px;" border >
          <el-table-column prop="reserveDate" label="就诊时间" width="width">
          </el-table-column>
          <el-table-column prop="hosname" label="医院" width="width">
          </el-table-column>
          <el-table-column prop="depname" label="科室" width="width">
          </el-table-column>
          <el-table-column prop="title" label="医生" width="width">
          </el-table-column>
          <el-table-column prop="amount" label="服务费" width="width">
          </el-table-column>
          <el-table-column prop="patientName" label="就诊人" width="width">
          </el-table-column>
          <el-table-column prop="param.orderStatusString" label="订单状态" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template #="{row,$index}">
                <el-button type="primary" size="small" @click="goDetail(row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>


        <el-pagination
          @size-change="handleSizeChange"
          @current-change="getOrders"
          :current-page="pageNo"
          :page-sizes="[10, 20, 50]"
          :page-size="limit"
          layout="prev, pager, next, jumper, ->,  sizes, total"
          :total="total">
        </el-pagination>

      </el-form>

    </el-card>
  </div>
</template>

<script setup  lang="ts">

import { ref, onMounted } from 'vue'
import { reqOrderList, reqAllPatients, reqAllOrderStatus } from '@/api/user/index.ts'
import { useRouter } from 'vue-router'

let pageNo = ref<number>(1)
let limit = ref<number>(10)
let total = ref<number>(0)
let orderList = ref<any>([])
let patientList = ref<any>([])
let orderStatusList = ref<any>([])
let patientId = ref<string>('')
let orderStatus= ref<string>('')

let $router = useRouter()

const handleSizeChange = (pageSize:number)=>{
  limit.value = pageSize
  getOrders()
}

const getOrders = async (page = 1)=>{
    pageNo.value = page
    let res = await reqOrderList(pageNo.value,limit.value,patientId.value,orderStatus.value)
    if(res.code === 200){
      orderList.value = res.data.records
      total.value = res.data.total
    }
}

onMounted(() => {
  getOrders()
  getAllPatients()
  getAllOrderStatus()
})


const changePatient = ()=>{
  getOrders()
}
const changeStatus = ()=>{
  getOrders()
}

const goDetail = (row:any) =>{
  $router.push({path: '/user/order',query:{orderId:row.id}})
}

const getAllPatients = async ()=>{
  let res = await reqAllPatients()
  if(res.code === 200){
    patientList.value = res.data
  }
}

const getAllOrderStatus = async ()=>{
  let res = await reqAllOrderStatus()
  if(res.code === 200){
    orderStatusList.value = res.data
  }
}

</script>

<style scoped lang="scss"></style>