<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="detail-head">
          <span>挂号详情</span>
        </div>
      </template>
 
      <div class="top">
        <el-tag class="ml-2" type="success">
          <div class="tag">
            <svg t="1696837082118" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="3982" width="16" height="16">
              <path
                d="M364.037087 836.187497c-5.176906 0-10.354835-1.954515-14.334473-5.872754l-1.402953-1.381463c-0.103354-0.102331-0.205685-0.204661-0.306992-0.309038L66.585511 539.439956c-7.869225-8.087189-7.693216-21.022803 0.393973-28.892027 8.086166-7.867178 21.021779-7.692193 28.891004 0.393973l268.255627 275.66948 565.584406-571.97086c7.934716-8.023744 20.87033-8.096399 28.893051-0.162706 8.024767 7.933693 8.096399 20.87033 0.162706 28.894074L378.565988 830.122361C374.569978 834.162374 369.304044 836.187497 364.037087 836.187497z"
                fill="#1afa29" p-id="3983"></path>
            </svg>
            <span>{{ orderInfo.orderStatus === 1?'已支付':'预约成功，待支付' }}</span>
          </div>
        </el-tag>

        <div class="right">
          <img src="../../../../assets/images/code_app.png">
          <div>
            <p>微信 关注 “北京114预约挂号”</p>
            <p>“快速预约挂号”</p>
          </div>
        </div>
      </div>

      <div class="bottom">
        <div class="b-left">
          <el-descriptions class="margin-top" :column="1" border>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  就诊人信息
                </div>
              </template>
              {{ orderInfo.patientName }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  就诊日期
                </div>
              </template>
              {{ orderInfo.reserveDate }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  就诊医院
                </div>
              </template>
              {{ orderInfo.hosname }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  就诊科室
                </div>
              </template>
              {{ orderInfo.depname }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  医生职称
                </div>
              </template>
              {{ orderInfo.title }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  医生服务费
                </div>
              </template>
              {{ orderInfo.amount }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  挂号单号
                </div>
              </template>
              {{ orderInfo.outTradeNo }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  挂号时间
                </div>
              </template>
              {{ orderInfo.createTime }}
            </el-descriptions-item>

          </el-descriptions> 

          <div class="btns" v-if="orderInfo.orderStatus == 0 || orderInfo.orderStatus == 1">
            <el-popconfirm title="确定取消预约吗?" @confirm="cancelOrder">
              <template #reference>
                <el-button>取消预约</el-button>
              </template>
            </el-popconfirm>
            <el-button type="primary" v-if="orderInfo.orderStatus == 0" @click="goPay">支付</el-button>
          </div>

        </div>
        <div class="b-right">
          <el-card class="box-card">
            <template #header>
              <div>
                <span>注意事项</span>
              </div>
            </template>
            <p>1.请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担;</p>
            <p>2.[取号] 就诊当天需在2023-06-1009:00前 在医院取号，未取号视为爽约，该号不退不换;</p>
            <p>3.[退号]在2023-06-09 15:30前可在线退号，逾期将不可办理退号退费;</p>
            <p>4.北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号:</p>
            <p>5.请注意北京市医保患者在住院期间不能使用社保卡在门诊取号</p>

          </el-card>
        </div>
      </div>
    </el-card>


    <!-- 支付对话框 -->
    <el-dialog v-model="dialogTableVisible" title="微信支付" width="400px" @close="closeDialog">
        <div class="qrcode">
          <img :src="imgUrl" alt="">
          <p>请使用微信扫一扫</p>
          <p>扫描二维码支付</p>
        </div>
        <template #footer>
          <div>
            <el-button type="primary" @click="closeDialog">关闭窗口</el-button>
          </div>
        </template>
    </el-dialog>
  </div>
</template>

<script setup  lang="ts">

import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { reqOrderDetail, reqCancelOrder, reqQrcode, reqQuerqyPayState } from '@/api/user/index.ts'
import { ElMessage } from 'element-plus'
import QRCode from 'qrcode'

let $route = useRoute()

let orderInfo = ref<any>({})
let dialogTableVisible = ref<boolean>(false)
let imgUrl = ref<string>('')
let timer = ref<any>()

onMounted(() => {
  getOrderDetail()
})

const getOrderDetail = async () => {
  let res = await reqOrderDetail($route.query.orderId)
  if (res.code === 200) {
    orderInfo.value = res.data
  }
}

const cancelOrder = async () => {
  let res = await reqCancelOrder($route.query.orderId)
  if (res.message === "不能取消预约") {
    // getOrderDetail()
    orderInfo.value.orderStatus = -1
  } else {
    ElMessage({
      type: 'error',
      message: '取消订单失败'
    })
  }
}

const goPay = async ()=>{
  dialogTableVisible.value = true
  let res = await reqQrcode($route.query.orderId)
  if(res.code === 200){
    imgUrl.value = await QRCode.toDataURL(res.data.codeUrl)
    timer.value = setInterval(async ()=>{
      let payRes =  await  reqQuerqyPayState($route.query.orderId)
      if(payRes.data){
        dialogTableVisible.value = false
        ElMessage({
          type: 'success',
          message:'支付成功'
        })
        clearInterval(timer.value)
        getOrderDetail()
      }
    },2000)
  }

}

const closeDialog = ()=>{
  dialogTableVisible.value = false
  clearInterval(timer.value)
}

</script>

<style scoped lang="scss">
.box-card {

  .detail-head {
    color: #7f7f7f;
    font-weight: 900;
  }

  .top {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding: 10px;

    .tag {
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        margin-left: 5px;
      }
    }

    .right {
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }
    }
  }

  .bottom {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    .b-left {
      flex: 4;
      margin-right: 20px;

      .btns {
        margin-top: 10px;
      }
    }

    .b-right {
      flex: 6;

      p {
        line-height: 20px;
        margin-bottom: 10px;
      }
    }
  }
}

.qrcode{
  display: flex;
  flex-direction: column;
  align-items: center;
  p{
    line-height: 25px;
  }
}

::v-deep(.el-dialog__body){
  border-top: 1px solid #7f7f7f;
  border-bottom: 1px solid #7f7f7f;
}
</style>