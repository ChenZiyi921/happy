<script setup>
import logo from "@/assets/logo.png?url"
import { getSidebarStatus } from "@/utils/cache/local-storage"

const props = withDefaults(defineProps(), {
  collapse: true
})
</script>

<template>
  <div class="layout-logo-container">
    <img :src="logo" class="layout-logo" :style="{ width: getSidebarStatus() === 'opened' ? '50px' : '32px' }" />
  </div>
</template>

<style lang="scss" scoped>
.layout-logo-container {
  position: relative;
  width: 100%;
  height: var(--v3-header-height);
  line-height: var(--v3-header-height);
  text-align: center;
  overflow: hidden;
  .layout-logo {
    width: 50px;
    vertical-align: middle;
  }
}
</style>
