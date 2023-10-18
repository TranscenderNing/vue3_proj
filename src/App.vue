
<template>
  <div class="container">
      <Top />
      <div class="content">
        <router-view></router-view>
      </div>
      <Bottom />
      <!-- 登录对话框 只加载一次 控制显示和隐藏 -->
      <Login />
  </div>

</template>


<script setup lang="ts">



</script>


<style scoped lang="scss">

.container{
  display: flex;
  flex-direction: column;
  align-items: center;

  .content{
    margin-top: 70px;
    width: 1200px;
    min-height: 700px;
    // background-color: red;
  }
}

</style>
