<template>
  <div class="order">
    <div v-if="$route.query.orderId">
      <orderDetail />
    </div>
    <div v-else>
      <allOrder />
    </div>
  </div>
</template>

<script setup lang="ts">

import { useRoute } from 'vue-router'
import allOrder from './allOrder/index.vue'
import orderDetail from './orderDetail/index.vue'

let $route = useRoute()

</script>

<style lang="scss" scoped>

</style>