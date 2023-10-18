<template>
  <div class="detail">
    <div class="top">
      <div class="title">{{ detailStore.details.hospital?.hosname }}</div>
      <div class="level">
        <svg t="1695816913370" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="4087" width="16" height="16">
          <path
            d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"
            p-id="4088" fill="#1afa29"></path>
        </svg>
        <span>{{ detailStore.details.hospital?.param.hostypeString }}</span>
      </div>
    </div>

    <div class="middle">
      <div class="left"><img :src="`data:image/jpeg;base64,${detailStore.details.hospital?.logoData}`"></div>
      <div class="right">
        <div class="address">
          <svg t="1695819447176" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5185" width="16" height="16"><path d="M512 960C265.6 960 64 758.4 64 512S265.6 64 512 64s448 201.6 448 448-201.6 448-448 448z m0-64c211.2 0 384-172.8 384-384S723.2 128 512 128 128 300.8 128 512s172.8 384 384 384z m188.8-531.2L608 592c-3.2 9.6-9.6 16-19.2 19.2l-227.2 89.6c-25.6 9.6-51.2-16-41.6-41.6l89.6-227.2c3.2-9.6 9.6-16 19.2-19.2l227.2-89.6c28.8-9.6 54.4 16 44.8 41.6z m-233.6 102.4l-57.6 144 144-57.6 57.6-144-144 57.6z" fill="#1afa29" p-id="5186"></path></svg>
          <p>具体地址：{{ detailStore.details.hospital?.param.fullAddress }}</p>
        </div>
        <div class="route">规划路线：{{ detailStore.details.hospital?.route }}</div>
      </div>
    </div>


    <div class="footer">
        <h1>医院介绍</h1>
        <p>
          {{ detailStore.details.hospital?.intro }}
        </p>
    </div>
  </div>
</template>

<script setup lang="ts">

import useDetailStore from '@/store/modules/detail.ts'

let detailStore = useDetailStore()

</script>

<style scoped lang="scss">
.detail {
  display: flex;
  flex-direction: column;

  .top {
    display: flex;
    align-items: center;

    .title {
      font-size: 20px;
      margin-right: 10px;
    }

    .level {
      color: #7f7f7f;
    }

  }

  .middle{
    margin-top: 10px;
    display: flex;
    // align-items: center;
    img{
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    .right{
      margin-top: 15px;
      .address{
        color: #7f7f7f;
        display: flex;
        align-items: center;
        p{
          margin-left: 5px;
        }
      }

      .route{
        margin-top: 10px;
        line-height: 20px;
        color: #7f7f7f;
      }

    }
  }

  .footer{
    margin-top: 20px;
        line-height: 20px;
        color: #7f7f7f;
  }
}</style>