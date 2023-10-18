<template>
    <div class="visitor">
        <div class="top">
            <div class="left">
                <span class ="free">{{ user.isInsure == 1? '医保':'自费'}}</span>
                <span class="username">{{ user.name }}</span>
            </div>
            <div class="right">
                <el-button type="primary" :icon="Edit" @click="notifyParent"></el-button>
                <el-popconfirm :title="`确定删除${user.name}吗?`" @confirm="deletePatient">
                    <template #reference>
                        <el-button type="danger" :icon="Delete" v-if=" $route.path==='/user/patient' "></el-button>
                    </template>
                </el-popconfirm>
            </div>
        </div>
        <div class="bottom">
            <p>证件类型： {{ user.param.certificatesTypeString }}</p>
            <p>证件号码： {{ user.certificatesNo }}</p>
            <p>用户性别： {{ user.sex == 0? '女生':'男生' }}</p>
            <p>出生日期： {{ user.birthdate }}</p>
            <p>手机号码： {{ user.phone }}</p>
            <p>婚姻状况： {{ user.isMarry ==0? '未婚':'已婚' }}</p>
            <p>当前住址： {{ user.param.cityString }}</p>
            <p>详细住址： {{ user.param.fullAddress }}</p>

            <div class="confirm" v-show="index === currentIndex">
                已选择
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { ref,onMounted, computed } from 'vue'
import { reqHospitalWork,reqHospitalDoctor } from '@/api/detail/index.ts'
import { reqDeletePatient } from '@/api/user/index.ts'
import { useRoute,useRouter } from 'vue-router'
import { User,Edit,Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

let props = defineProps(['user','currentIndex','index'])
let $emit = defineEmits(['changeScene','deletePatient'])

let $route = useRoute()
let $router = useRouter()

const notifyParent = ()=>{
    if($route.path === '/user/patient'){
        $emit('changeScene',props.user)
    }else{
        $router.push({path:'/user/patient',query:{type:'edit',id:props.user.id}})
    }
}

const deletePatient = async ()=>{
    try{
        await reqDeletePatient(props.user.id)
        ElMessage({
            type:'success',
            message: '删除成功'
        })
        $emit('deletePatient')
    }catch(err){
        ElMessage({
            type:'success',
            message: '删除失败'
        })
    }
}




</script>

<style scoped lang="scss">
.visitor{
    box-shadow: 0px 0px 12px rgba(0,0,0,0.12);
    .top{
        height: 60px;
        background-color: #e5e5e5;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .left{
            .free{
                background-color: white;
                padding: 5px;
                margin-right: 5px;
                border-radius: 5px;
            }
            .username{
                color: #7f7f7f;
            }
        }
    }
    .bottom{
        position: relative;
        padding: 20px;
        p{
            line-height: 30px;
        }
        .confirm{
            position: absolute;
            width: 200px;
            height: 200px;
            color: red;
            border-radius: 50%;
            border: 1px dashed red;
            text-align: center;
            line-height: 200px;
            left: 20%;
            top: 20%;
            opacity: 50%;
            transform: rotate(35deg);
            font-weight: 900;
        }

    }
}

</style>