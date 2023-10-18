<template>
  <div class="search">
    <h1> {{ detailStore.details.hospital?.hosname }} 查询信息</h1>
    <el-empty description="暂无信息"></el-empty>
  </div>
</template>

<script setup lang="ts">
import useDetailStore from '@/store/modules/detail.ts'

let detailStore = useDetailStore()
</script>

<style scoped lang="scss">
.search{
  h1{
    text-align: center;
    font-size: 25px;
  }
}
</style>