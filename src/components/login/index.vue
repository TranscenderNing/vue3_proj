<template>
    <div class="login-container">
        <el-dialog v-model="userStore.dialogFormVisible" title="登录" @close="clearInfo">
            <div class="content">
                <el-row :gutter="10">
                    <el-col :span="12">
                        <div class="login" >
                            <div v-show="scene===0">
                                <el-form ref="formRef" :model="formParam" :rules="rules">
                                    <el-form-item prop="phone">
                                        <el-input v-model="formParam.phone" placeholder="请您输入手机号码" :prefix-icon="User"></el-input>
                                    </el-form-item>
                                    <el-form-item prop="usercode"> 
                                        <el-input v-model="formParam.usercode" placeholder="请您输入手机验证码" :prefix-icon="Lock"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button :disabled="!isPhone || isCountDown" >
                                            <span v-show="!isCountDown" @click="getUsercode">获取验证码</span>
                                            <CountDown  v-show="isCountDown" :isCountDown="isCountDown"  @changeIsCountDown="changeIsCountDown()"/>
                                        </el-button>
                                    </el-form-item>
                                </el-form>

                                <div class="bottom">
                                    <el-button type="primary" style="width:90%;" @click="goLogin" :disabled="!isPhone || formParam.usercode.length<6">用户登录</el-button>
                                    <p @click="changeScene">微信扫码登录</p>
                                    <svg @click="changeScene" t="1695863594894" class="icon" viewBox="0 0 1025 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="6317" width="32" height="32">
                                        <path
                                            d="M1024.16 694.816c0-149.92-143.104-271.392-319.584-271.392-176.576 0-319.68 121.504-319.68 271.392S528 966.208 704.576 966.208c55.456 0 107.648-12.096 153.184-33.248l125.984 54.528-14.592-140.544c34.784-43.392 55.04-95.808 55.04-152.128zM596.832 621.28c-25.152 0-45.472-20.352-45.472-45.472s20.32-45.472 45.472-45.472c25.12 0 45.44 20.384 45.44 45.472s-20.384 45.472-45.44 45.472z m215.392 0c-25.056 0-45.44-20.352-45.44-45.472s20.384-45.472 45.44-45.472c25.184 0 45.536 20.384 45.536 45.472s-20.352 45.472-45.536 45.472zM704.576 387.488c49.376 0 96.416 8.8 139.264 24.64 0.32-5.728 0.992-11.232 0.992-16.992 0-198.08-189.152-358.624-422.432-358.624C189.184 36.512 0.032 197.024 0.032 395.136c0 74.496 26.816 143.776 72.704 201.12L53.472 781.92l166.432-72.096c41.216 19.2 86.784 32.16 134.88 38.784-3.616-17.504-5.824-35.424-5.824-53.792 0.032-169.44 159.552-307.296 355.616-307.296z m-139.808-209.6c33.184 0 60 26.88 60 60 0 33.184-26.816 60.064-60 60.064s-60.032-26.88-60.032-60.064c0-33.152 26.88-60 60.032-60zM280.032 297.952c-33.184 0-60-26.88-60-60.064 0-33.152 26.848-60 60-60 33.184 0 60.032 26.88 60.032 60s-26.88 60.064-60.032 60.064z"
                                            fill="#51C332" p-id="6318"></path>
                                    </svg>
                                </div>
                            </div>

                            <div v-show="scene===1">
                                <div id="login_container"></div>
                                <div>
                                    <p class="messageLogin" @click="toScene1">手机短信验证码登录</p>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="right">
                            <div class="top">
                                <div class="item">
                                    <img src="../../assets/images/code_app.png" alt="">
                                    <svg t="1695863893435" class="icon" viewBox="0 0 1025 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="6567" width="16" height="16">
                                        <path
                                            d="M1024.16 694.816c0-149.92-143.104-271.392-319.584-271.392-176.576 0-319.68 121.504-319.68 271.392S528 966.208 704.576 966.208c55.456 0 107.648-12.096 153.184-33.248l125.984 54.528-14.592-140.544c34.784-43.392 55.04-95.808 55.04-152.128zM596.832 621.28c-25.152 0-45.472-20.352-45.472-45.472s20.32-45.472 45.472-45.472c25.12 0 45.44 20.384 45.44 45.472s-20.384 45.472-45.44 45.472z m215.392 0c-25.056 0-45.44-20.352-45.44-45.472s20.384-45.472 45.44-45.472c25.184 0 45.536 20.384 45.536 45.472s-20.352 45.472-45.536 45.472zM704.576 387.488c49.376 0 96.416 8.8 139.264 24.64 0.32-5.728 0.992-11.232 0.992-16.992 0-198.08-189.152-358.624-422.432-358.624C189.184 36.512 0.032 197.024 0.032 395.136c0 74.496 26.816 143.776 72.704 201.12L53.472 781.92l166.432-72.096c41.216 19.2 86.784 32.16 134.88 38.784-3.616-17.504-5.824-35.424-5.824-53.792 0.032-169.44 159.552-307.296 355.616-307.296z m-139.808-209.6c33.184 0 60 26.88 60 60 0 33.184-26.816 60.064-60 60.064s-60.032-26.88-60.032-60.064c0-33.152 26.88-60 60.032-60zM280.032 297.952c-33.184 0-60-26.88-60-60.064 0-33.152 26.848-60 60-60 33.184 0 60.032 26.88 60.032 60s-26.88 60.064-60.032 60.064z"
                                            fill="#51C332" p-id="6568"></path>
                                    </svg>
                                    <p>微信扫一扫关注</p>
                                    <p>快速预约挂号</p>
                                </div>
                                <div class="item">
                                    <img src="../../assets/images/code_login_wechat.png" alt="">
                                    <svg t="1695863987892" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="7670" width="16" height="16">
                                        <path
                                            d="M820.409449 797.228346q0 25.19685-10.07874 46.866142t-27.716535 38.299213-41.322835 26.204724-50.897638 9.574803l-357.795276 0q-27.212598 0-50.897638-9.574803t-41.322835-26.204724-27.716535-38.299213-10.07874-46.866142l0-675.275591q0-25.19685 10.07874-47.370079t27.716535-38.80315 41.322835-26.204724 50.897638-9.574803l357.795276 0q27.212598 0 50.897638 9.574803t41.322835 26.204724 27.716535 38.80315 10.07874 47.370079l0 675.275591zM738.771654 170.330709l-455.559055 0 0 577.511811 455.559055 0 0-577.511811zM510.992126 776.062992q-21.165354 0-36.787402 15.11811t-15.622047 37.291339q0 21.165354 15.622047 36.787402t36.787402 15.622047q22.173228 0 37.291339-15.622047t15.11811-36.787402q0-22.173228-15.11811-37.291339t-37.291339-15.11811zM591.622047 84.661417q0-8.062992-5.03937-12.598425t-11.086614-4.535433l-128 0q-5.03937 0-10.582677 4.535433t-5.543307 12.598425 5.03937 12.598425 11.086614 4.535433l128 0q6.047244 0 11.086614-4.535433t5.03937-12.598425z"
                                            p-id="7671" fill="#1afa29"></path>
                                    </svg>
                                    <p>扫一扫下载</p>
                                    <p>预约挂号APP</p>
                                </div>

                            </div>

                            <p class="tip">xxxxx 官方指定平台</p>
                            <p class="tip">快速挂号 安全放心</p>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="userStore.dialogFormVisible = false">关闭窗口</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { ref, reactive, computed , watch} from 'vue'
import useUserStore from '@/store/modules/user.ts'
import CountDown from '@/components/countDown/index.vue'
import { ElMessage } from 'element-plus'
import { useRouter,useRoute } from 'vue-router'
import { reqWxLogin } from '@/api/detail/index.ts'

let $router = useRouter()
let $route = useRoute()

let userStore = useUserStore()

let formRef = ref()

// 收集登录表单数据
let formParam = reactive<any>({
    phone: '',
    usercode: ''
})

let isPhone = computed(()=>{
    const phoneNumberRegex = /^1[3-9]\d{9}$/;
    return phoneNumberRegex.test(formParam.phone)
})

// 控制登录 场景的切换
let scene = ref<number>(0)
let isCountDown = ref<boolean>(false)


watch(()=>scene.value,(val: number)=>{
    if(val === 1){
        userStore.queryState()
    }
})

// 点击使用微信登录 切换场景
const changeScene = async ()=>{
    scene.value = 1
  //发请求获取微信扫码二维码需要参数
  //咱们在想硅谷学校的服务器发请求,获取微信扫码登录页面参数
  //还需要携带一个参数:告诉学校服务器用户授权成功以后重定向项目某一个页面
  let redirect_URL = encodeURIComponent(window.location.origin + "/wxlogin");
  console.log(redirect_URL)
  let result = await reqWxLogin(redirect_URL);
  //生成微信扫码登录二维码页面
  //@ts-ignore
  new WxLogin({
    self_redirect: true, //true:手机点击确认登录后可以在 iframe 内跳转到 redirect_uri
    id: "login_container", //显示二维码容器设置
    appid: result.data.appid, //应用位置标识appid
    scope: "snsapi_login", //当前微信扫码登录页面已经授权了
    redirect_uri: result.data.redirectUri, //填写授权回调域路径,就是用户授权成功以后，微信服务器向公司后台推送code地址
    state: result.data.state, //state就是学校服务器重定向的地址携带用户信息
    style: "black",
    href: "",
  });

}

// 点击 获取验证码的回调
const getUsercode = async ()=>{
    if(!isPhone.value || isCountDown.value) return ;
    isCountDown.value = true
    try{
        await userStore.getUsercode(formParam.phone)
        formParam.usercode = userStore.usercode
        console.log(userStore)
        console.log(formParam.usercode,userStore.usercode)
    }catch(err){
        alert('获取验证码失败')
    }

}

// 子组件自定义事件的回调
const changeIsCountDown = (paramFalse)=>{
    isCountDown.value = paramFalse
}

// 点击用户登录的 回调
const goLogin = async ()=>{
    let param = {
        phone: formParam.phone,
        code: formParam.usercode
    }
    await formRef.value.validate()
    try{

        await userStore.userLogin(param)
        userStore.dialogFormVisible = false
        ElMessage({
            type: 'success',
            message: '登录成功'
        })

        if($route.query.redirect){
            $router.push({path:$route.query.redirect as string})
        }else{
            $router.push('/home')
        }
    
        
    }catch(err){
        ElMessage({
            type: 'success',
            message: '登录失败'
        })
    }
}


// 表单校验

const validatePhone = (rule,value,callback)=>{
    const phoneNumberRegex = /^1[3-9]\d{9}$/;
    if(phoneNumberRegex.test(value)){
        callback()
    }else{
        callback(new Error('请输入正确的手机号码'))
    }
}

const validateUsercode = (rule,value,callback)=>{
    if(value.length === 6){
        callback()
    }else{
        callback(new Error('请输入正确的验证码'))
    }
}

const rules = {
    phone: [
        {required: true, trigger: 'blur', message:'手机号码长度必须是11位', validator: validatePhone}
    ],
    usercode: [
        {required: true, trigger: 'blur', message:'手机号码长度必须是6位', validator: validateUsercode}
    ]
}

// 关闭对话框的回调
const clearInfo = ()=>{
    Object.assign(formParam,{
        phone: '',
        usercode: ''
    })
    formRef.value.resetFields()
}

// 回到短信验证码登录场景
const toScene1 = ()=>{
    scene.value = 0
}

</script>


<script lang="ts">
export default {
    name: 'Login'
}
</script>

<style scoped lang="scss">
.login-container {

    ::v-deep(.el-dialog__body) {
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }

    .content {

        .login {
            padding: 10px;
            border: 1px solid #ccc;

            .bottom {
                display: flex;
                flex-direction: column;
                align-items: center;

                p {
                    margin: 10px 0px;
                }
            }

            .messageLogin{
                text-align: center;
            }
        }

        .right {
            .top {
                display: flex;
                justify-content: space-around;

                .item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    img {
                        width: 130px;
                        height: 130px;
                    }

                    p {
                        margin-top: 10px;
                    }
                }
            }

            .tip {
                text-align: center;
                margin-top: 20px;
                font-size: 20px;
            }
        }

    }

}</style>