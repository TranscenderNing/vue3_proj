<template>
    <div>
        <span>获取验证码({{ time }}秒)</span>
    </div>
</template>

<script setup lang="ts">

import { ref, watch } from 'vue'

let props = defineProps(['isCountDown'])
let $emit = defineEmits(['changeIsCountDown'])

let time = ref<number>(5)

watch(() => props.isCountDown, () => {
    let timer = setInterval(() => {
        time.value--
        if (time.value === 0) {
            $emit('changeIsCountDown', false)
            clearInterval(timer)
            time.value = 5
        }
    }, 1000)
}, )

</script>

<style scoped lang="scss"></style>