<template>
  <div class="info">

    <h1> {{ detailStore.details.hospital?.hosname }} 停诊信息</h1>
    <el-empty description="暂无信息"></el-empty>

  </div>
</template>

<script setup lang="ts">
import useDetailStore from '@/store/modules/detail.ts'

let detailStore = useDetailStore()
</script>

<style scoped lang="scss">
.info{
  h1{
    text-align: center;
    font-size: 25px;
  }
}
</style>