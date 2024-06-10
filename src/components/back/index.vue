<script setup>
import router from "@/router/index.js"
const props = defineProps({ title: { type: String } })
const goBack = () => {
  router.back()
}
</script>
<template>
  <el-page-header
    @back="goBack"
    style="padding: 10px 10px; background: #fff; margin-bottom: 10px; border-radius: 8px 8px 0 0"
  >
    <template #content>
      <span class="mr-3">{{ props.title }}</span>
    </template>
  </el-page-header>
</template>
