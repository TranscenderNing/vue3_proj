<template>
  <div class="register">
    <div class="top">
      <div class="title">{{ detailStore.details.hospital?.hosname }}</div>
      <div class="level">
        <svg t="1695816913370" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4087" width="16" height="16"><path d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z" p-id="4088" fill="#1afa29"></path></svg>
        <span>{{ detailStore.details.hospital?.param.hostypeString }}</span>
      </div>
    </div>

    <div class="content">
      <div class="left">
        <img :src="`data:image/jpeg;base64,${detailStore.details.hospital?.logoData}`" >
      </div>
      <div class="right">
          <div>挂号规则</div>
          <div class="time">
            预约周期：{{ detailStore.details.bookingRule?.cycle }}天 放号时间：{{ detailStore.details.bookingRule?.releaseTime }} 停挂时间：{{ detailStore.details.bookingRule?.stopTime }}
          </div>
          <div class="address">
            具体位置： {{ detailStore.details.hospital?.param.fullAddress }}
          </div>
          <div class="route">
            具体路线： {{ detailStore.details.hospital?.route }}
          </div>
          <div class="quit-time">
            退号时间： 就诊前一工作日{{ detailStore.details.bookingRule?.quitTime }}
          </div>
          <div class="rule">
            预约挂号规则
          </div>
          <div class="rule-info" v-for="(item,index) in detailStore.details.bookingRule?.rule" :key="index">
              {{ index+1 }} . {{ item }}
          </div>
      </div>
    </div>

    <div class="department">
      <div class="left">
          <ul>
            <li @click="changeActive(index)" :class="{active: activeIndex===index}"  v-for="(item,index) in detailStore.departments" :key="item.id">{{ item.depname }}</li>
          </ul>
      </div>
      <div class="right">
          <div class="show-department" v-for="(item) in detailStore.departments" :key="item.id">
            <h1 class="h1-elem">{{ item.depname }}</h1>
            <ul>
              <li v-for="(item1) in item.children" :key="item1.depcode" @click="goLogin(item1)">
                  {{ item1.depname }}
              </li>
            </ul>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useDetailStore from '@/store/modules/detail.ts'
import useUserStore from '@/store/modules/user.ts'
import {useRouter, useRoute} from 'vue-router'
import { ref } from 'vue'

let $router = useRouter()
let $route = useRoute()

// 创建仓库实例
let detailStore = useDetailStore()
let userStore = useUserStore()

// 控制高亮的响应式数据
let activeIndex = ref<number>(0)

// 点击li标签回调 切换高亮
const changeActive = (index)=>{
  activeIndex.value = index
  let allH1 = document.querySelectorAll('.h1-elem')
  console.log(allH1)
  allH1[index].scrollIntoView({behavior:'smooth'})
}

// 点击小科室的li标签 需要回到登录界面
const goLogin = (item:any)=>{
  console.log(item,12222222222222222222222222222)
  $router.push({path:'/detail/register_step1',query:{hoscode: $route.query.hoscode,depcode: item.depcode}})
  // userStore.dialogFormVisible = true
}

</script>

<style scoped lang="scss">
.register{

  .top{
    display: flex;
    align-items: center;
    .title{
      font-size: 20px;
      margin-right: 10px;
    }
    .level{
      color: #7f7f7f;
    }

  }

  .content{
    margin-top: 20px;
    display: flex;

    .left{
      width: 80px;
      margin-right: 10px;
      img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }

    .right{
      flex: 1;
      font-size: 14px;
      .time,.address,.route,.quit-time{
        margin-top: 10px;
        color: #7f7f7f;
        line-height: 20px;
      }
      .rule{
        margin: 20px 0px;
      }
      .rule-info{
        color: #7f7f7f;
      }
    }

  }

  .department{
    margin-top: 10px;
    width: 100%;
    height: 500px;
    // background-color: royalblue;
    display: flex;

    .left{
        width:  80px;
        height: 100%;
        ul{
          width:  100%;
          height: 100%;
          background-color: rgb(248,248,248,);
          display: flex;
          flex-direction: column;
          li{
            flex: 1;
            text-align: center;
            color: #7f7f7f;
            font-size: 14px;
            &.active{
                border-left: 1px solid red;
                color: red;
                background: white;
            }
          }
        }
    }

    .right{
      flex: 1;
      margin-left: 20px;
      height: 100%;
      overflow: auto;
      &::-webkit-scrollbar{
        display: none;
      }
      .show-department{

        h1{
          background-color: rgb(248,248,248,);
          color: #7f7f7f;
        }

        ul{
          display: flex;
          flex-wrap: wrap;
          li{
            width: 33%;
            color: #7f7f7f;
            line-height: 30px;
          }
        }

      }
    }
  }
}

</style>