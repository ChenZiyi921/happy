<script lang="ts" setup>
import { Expand, Fold } from "@element-plus/icons-vue"

interface Props {
  isActive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false
})

const emit = defineEmits<{
  toggleClick: []
}>()

const toggleClick = () => {
  emit("toggleClick")
}
</script>

<template>
  <div>
    <el-icon :size="20" class="icon" @click="toggleClick">
      <Fold v-if="props.isActive" />
      <Expand v-else />
    </el-icon>
    <span style="padding-left: 10px; font-weight: bold">快乐上工</span>
  </div>
</template>

<style lang="scss" scoped>
.icon {
  vertical-align: middle;
  color: var(--v3-hamburger-text-color);
}
</style>
