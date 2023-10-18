<template>
    <div>
        <div class="container">
            <h1 class="tip">确认挂号信息</h1>

            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>选择就诊人</span>
                        <el-button type="primary" :icon="User" @click="goUser">添加就诊人</el-button>
                    </div>
                </template>

                <div class="users">
                    <Visitor @click="changeIndex(index)" v-for="(user, index) in userArr" :key="user.id" class="user"
                        :user="user" :index="index" :currentIndex="currentIndex" />
                </div>
            </el-card>


            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>挂号信息</span>
                    </div>
                </template>


                <el-descriptions class="margin-top" :column="2" :size="size" border>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">就诊日期：</div>
                        </template>
                        {{ doctorInfo.workDate }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">就诊医院：</div>
                        </template>
                        {{ doctorInfo.param?.hosname }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">就诊科室：</div>
                        </template>
                        {{ doctorInfo.param?.depname }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">医生姓名：</div>
                        </template>
                        {{ doctorInfo.docname }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">医生职称：</div>
                        </template>
                        {{ doctorInfo.title }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">医生专长：</div>
                        </template>
                        {{ doctorInfo.skill }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">医生服务费：</div>
                        </template>
                        {{ doctorInfo.amount }}
                    </el-descriptions-item>
                </el-descriptions>

            </el-card>

            <div class="btn">
                <el-button type="primary" :disabled="currentIndex === -1" @click="submitOrder">确认挂号</el-button>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">

import { ref, onMounted, computed } from 'vue'
import { reqUser, reqDoctorInfo } from '@/api/detail/index.ts'
import { useRoute, useRouter } from 'vue-router'
import { User } from '@element-plus/icons-vue'

import { reqSubmitOrder } from '@/api/user/index.ts'
import { ElMessage } from 'element-plus'



let $route = useRoute()
let $router = useRouter()
let userArr = ref<any>([])
let doctorInfo = ref<any>({})
let currentIndex = ref<any>(-1)



onMounted(() => {
    getUser()
    getDoctorInfo()
})

const getUser = async () => {
    let res = await reqUser()
    if (res.code === 200) {
        userArr.value = res.data
    }
}

// 添加就诊人的时候跳转到就诊人管理模块
const goUser = ()=>{
    $router.push({path: '/user/patient',query:{type: 'add'}})
}

const getDoctorInfo = async () => {
    let res = await reqDoctorInfo($route.query.docId as string)
    if (res.code === 200) {
        doctorInfo.value = res.data
    }
}


const changeIndex = (index: number) => {
    currentIndex.value = index
}


const submitOrder = async () => {

    let hoscode = doctorInfo.value.hoscode
    let scheduleId = doctorInfo.value.id
    let patientId = userArr.value[currentIndex.value].id
    console.log(hoscode, scheduleId, patientId)
    let res = await reqSubmitOrder(hoscode, scheduleId, patientId)

    if (res.code === 200) {
        $router.push({ path: '/user/order', query: { orderId: res.data } })
    } else {
        ElMessage({
            type: 'error',
            message: '提交订单失败'
        })
    }
}





</script>

<style scoped lang="scss">
.container {
    .tip {
        font-weight: 900;
        color: #7f7f7f;
        font-size: 20px;
    }

    .box-card {
        margin: 20px 0px;

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .users {
            display: flex;
            flex-wrap: wrap;

            .user {
                width: 32%;
                margin: 5px;
            }

        }
    }

    .btn {
        display: flex;
        justify-content: center;
    }
}
</style>