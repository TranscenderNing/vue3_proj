<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div>
          <h1>实名信息</h1>
        </div>
      </template>

      <div class="tip">
        <p>
          <el-icon>
            <InfoFilled />
          </el-icon>
          完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证
        </p>
      </div>

      <div class="bottom">
        <!-- 第一种结构 -->
        <el-descriptions v-if="userInfo.authStatus === 1" class="margin-top" :column="1" border size="small">
          <el-descriptions-item :width="20" label-align="center">
            <template #label>
              <div class="cell-item">
                用户姓名
              </div>
            </template>
            {{ userInfo.name }}
          </el-descriptions-item>
          <el-descriptions-item label-align="center">
            <template #label>
              <div class="cell-item">
                证件类型
              </div>
            </template>
            {{ userInfo.certificatesType === '10' ? '身份证' : '户口本' }}
          </el-descriptions-item>
          <el-descriptions-item label-align="center">
            <template #label>
              <div class="cell-item">
                证件号码
              </div>
            </template>
            {{ userInfo.certificatesNo }}
          </el-descriptions-item>
        </el-descriptions>
        <!-- 第二种结构 -->
        <el-form  v-else ref="form" :model="params" :rules="rules" label-width="80px" style="width:60%;margin:20px auto;">
          <el-form-item label="用户姓名" prop="name">
            <el-input placeholder="请输入用户姓名" v-model="params.name"></el-input>
          </el-form-item>
          <el-form-item label="证件类型" prop="certificatesType">
            <el-select v-model="params.certificatesType" placeholder="请选择证件类型" style="width:100%;">
              <el-option :label="item.name" :value='item.value' v-for="(item, index) in typeArr" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码"  prop="certificatesNo">
            <el-input placeholder="请输入证件号码" v-model="params.certificatesNo"></el-input>
          </el-form-item>
          <el-form-item label="上传证件" prop="certificatesUrl">
            <el-upload ref="upload" v-model:file-list="fileList" action="/api/oss/file/fileUpload?fileHost=userAuah"
              list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :limit="1"
              :on-exceed="exceedHandler" :on-success="successHandler">
              <el-icon>
                <Plus />
              </el-icon>
            </el-upload>

            <el-dialog v-model="previewVisible">
              <img w-full alt="预览图片" :src="params.certificatesUrl" style="width:100%;height:100%">
            </el-dialog>

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
import { InfoFilled } from '@element-plus/icons-vue'
import { Plus } from '@element-plus/icons-vue'
import { reqUserInfo, reqCertificationType, reqUserCertification } from '@/api/user/index.ts'
import { ref, onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'

let userInfo = ref<any>({})
let typeArr = ref<any>([])
let params = reactive<any>({
  certificatesNo: "",
  certificatesType: "",
  certificatesUrl: "",
  name: ""
})

let form = ref()

let upload = ref()

let previewVisible = ref<boolean>(false)


const validateName = (rule,value,callback)=>{
    if(value.length > 0){
      callback()
    }else{
      callback(new Error('至少需要一个字符'))
    }
}

const validateNo = (rule,value,callback)=>{
  if(value.length > 0){
      callback()
    }else{
      callback(new Error('至少需要一个字符'))
    }
}

const validateType = (rule,value,callback)=>{
  if(value.length > 0){
      callback()
    }else{
      callback(new Error('至少需要一个字符'))
    }
}


const validateUrl = (rule,value,callback)=>{
  if(value.length > 0){
      callback()
    }else{
      callback(new Error('至少需要一个字符'))
    }
}


const rules = {
  name: [
    {required: true, validator: validateName}
  ],
  certificatesNo:[
    {required: true, validator: validateNo}
  ],
  certificatesType: [
    {required: true, validator: validateType}
  ],
  certificatesUrl: [
    {required: true, validator: validateUrl}
  ]
}

onMounted(() => {
  getUserInfo()
  getCertificationType()
})

const getUserInfo = async () => {
  let res = await reqUserInfo()
  if (res.code === 200) {
    userInfo.value = res.data
  }
}

const exceedHandler = () => {
  ElMessage({
    type: 'error',
    message: '只能上传一张图片'
  })
}

const handlePictureCardPreview = (uploadFile) => {
  previewVisible.value = true
}

const handleRemove = () => {
  params.certificatesUrl = ''
}


const successHandler = (response, upLoadFile, uploadFiles) => {
  form.value.clearValidate('certificatesUrl')
  params.certificatesUrl = response.data
}



const getCertificationType = async () => {
  let res = await reqCertificationType('CertificatesType')
  if (res.code === 200) {
    typeArr.value = res.data
  }
}

const reset = () => {
  Object.assign(params, {
    certificatesNo: "",
    certificatesType: "",
    certificatesUrl: "",
    name: ""
  })
  upload.value.clearFiles()
}

const submit = async ()=>{
  await form.value.validate()
  let res = await reqUserCertification(params)
  if(res.code === 200){
      ElMessage({
        type:'success',
        message: '认证成功'
      })
      getUserInfo()
  }else{
    ElMessage({
        type:'error',
        message: '认证失败'
      })
  }
}

</script>

<style lang="scss" scoped>
.box-card {
  .tip {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bottom {
    margin-top: 20px;
  }
}
</style>