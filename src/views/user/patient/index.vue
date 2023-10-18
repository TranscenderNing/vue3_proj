<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>就诊人管理</span>
          <el-button class="button" type="primary" :icon="UserFilled" @click="addUser">添加就诊人</el-button>
        </div>
      </template>

      <div class="visitors" v-if="scene === 0">
        <visitor @deletePatient="deletePatient" @changeScene="changeScene" v-for="(user, index) in userArr" :key="user.id" :user="user" :index="index">
        </visitor>
      </div>

      <div class="form" v-if="scene === 1">
        <el-divider content-position="left">就诊人信息</el-divider>
        <el-form ref="form" :model="form" label-width="80px" style="width: 60%;margin: 10px auto">
          <el-form-item label="用户姓名">
            <el-input placeholder="请输入用户姓名" v-model="userParams.name"></el-input>
          </el-form-item>
          <el-form-item label="证件类型">
            <el-select v-model="userParams.certificatesType" placeholder="请选择证件的类型" style="width: 100%;">
              <el-option :label="item.name" v-for="(item, index) in typeArr" :key="index" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input placeholder="请输入证件号码" v-model="userParams.certificatesNo"></el-input>
          </el-form-item>
          <el-form-item label="用户性别">
            <el-radio-group v-model="userParams.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker v-model="userParams.birthdate" type="date" value-format="YYYY-MM-DD" placeholder="选择日期"
              :size="size" />
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input placeholder="请输入手机号码" v-model="userParams.phone"></el-input>
          </el-form-item>
        </el-form>

        <el-divider content-position="left">建档信息 (完善后部分医院首次就诊不排队建档）</el-divider>
        <el-form ref="form" :model="form" label-width="80px" style="width: 60%;margin: 10px auto">
          <el-form-item label="婚姻状况">
            <el-radio-group v-model="userParams.isMarry">
              <el-radio :label="1">已婚</el-radio>
              <el-radio :label="0">未婚</el-radio>
            </el-radio-group>
          </el-form-item>


          <el-form-item label="自费/医保">
            <el-radio-group v-model="userParams.isInsure">
              <el-radio :label="1">自费</el-radio>
              <el-radio :label="0">医保</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="选择地址">
            <el-cascader :props="props" v-model="userParams.addressSelected"></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input placeholder="请输入详细地址" v-model="userParams.address"></el-input>
          </el-form-item>

        </el-form>

        <el-divider content-position="left">联系人信息（选填）</el-divider>
        <el-form ref="form" :model="form" label-width="80px" style="width: 60%;margin: 10px auto">
          <el-form-item label="用户姓名">
            <el-input placeholder="请输入用户姓名" v-model="userParams.contactsName"></el-input>
          </el-form-item>
          <el-form-item label="证件类型">
            <el-select v-model="userParams.contactsCertificatesType" placeholder="请选择证件的类型" style="width: 100%;">
              <el-option :label="item.name" v-for="(item, index) in typeArr" :key="index" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input placeholder="请输入证件号码" v-model="userParams.contactsCertificatesNo"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input placeholder="请输入手机号码" v-model="userParams.contactsPhone"></el-input>
          </el-form-item>
          <el-form-item label="操作">
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button type="primary" @click="reset">重写</el-button>
          </el-form-item>
        </el-form>

      </div>

    </el-card>
  </div>
</template>

<script setup lang="ts">

import { UserFilled } from '@element-plus/icons-vue';
import { reqUser } from '@/api/detail/index.ts'
import { ref, onMounted, reactive, watch } from 'vue'
import { reqCertificationType, reqCity, reqAddOrUpdatePatient } from '@/api/user/index.ts'
import { CascaderProps, ElMessage } from 'element-plus'
import { useRoute,useRouter} from 'vue-router'


let userArr = ref<any>([])
let scene = ref<number>(0)
let typeArr = ref<any>({})
let $route = useRoute()
let $router = useRouter()

let certificateType = ref<any>('')
let userParams = reactive<any>({
  name: "",
  certificatesType: "",
  certificatesNo: "",
  sex: 0,
  birthdate: "",
  phone: "",
  isMarry: 0,
  isInsure: 0,
  addressSelected: [],
  address: "",
  contactsName: '',
  contactsCertificatesNo: "",
  contactsCertificatesType: "",
  contactsPhone: ''
})


onMounted(() => {
  getUser()
  getCertificationType()
  if($route.query.type === 'add'){
    scene.value = 1
  }
  if($route.query.type === 'edit'){
    scene.value = 1
  }
})



watch(
  ()=>userArr.value,
  ()=>{
      if($route.query.type === 'edit'){
          let user = userArr.value.find(item=>{
            return item.id == $route.query.id
          })
          Object.assign(userParams,user)
      }
    }
)

const deletePatient = ()=>{
  getUser()
}


const getCertificationType = async () => {
  let res = await reqCertificationType('CertificatesType')
  if (res.code === 200) {
    typeArr.value = res.data
  }
}


const reset = () => {
  Object.assign(userParams, {
    id:null,
    name: "",
    certificatesType: "",
    certificatesNo: "",
    sex: 0,
    birthdate: "",
    phone: "",
    isMarry: 0,
    isInsure: 0,
    addressSelected: [],
    address: "",
    contactsName: '',
    contactsCertificatesNo: "",
    contactsCertificatesType: "",
    contactsPhone: ''
  })
}



const submit = async () => {
  try {
    await reqAddOrUpdatePatient(userParams)
    ElMessage({
      type: 'success',
      message: userParams.id ? '修改成功' : '新增成功'
    })
    if($route.query.type){
      $router.back()
    }else{
      scene.value = 0
    }
    getUser()
  } catch (error) {
    ElMessage({
      type: 'error',
      message: userParams.id ? '修改失败' : '新增失败'
    })
  }
}




const addUser = () => {
  reset()
  scene.value = 1
}

const changeScene = (user:any) => {
  Object.assign(userParams,user)
  scene.value = 1
}

const getUser = async () => {
  let res = await reqUser()
  if (res.code === 200) {
    userArr.value = res.data
  }
}


const props: CascaderProps = {
  lazy: true,
  async lazyLoad(node, resolve) {
    let res = await reqCity(node.data.id || '86')
    let showData = res.data.map(item => {
      return {
        id: item.id,
        value: item.value,
        label: item.name,
        leaf: !item.hasChildren
      }
    })
    resolve(showData)
  },
}

</script>

<style lang="scss" scoped>
.box-card {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .visitors {
    display: flex;
    flex-wrap: wrap;

    .visitor {
      width: 32%;
      margin: 5px;
    }
  }

}
</style>