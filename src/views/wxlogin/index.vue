<template>
  <div>

  </div>
</template>

<script setup lang="ts">
import { SET_USERINFO } from '@/utils/user.ts'
import { useRoute } from 'vue-router'

let $route = useRoute()

SET_USERINFO(JSON.stringify($route.query))

let html = document.querySelector('html')
html.style.display = 'none'


</script>

<style scoped lang="scss">

</style>