<script setup>
import { isExternal } from "@/utils/validate.js"

const props = defineProps()
</script>

<template>
  <a v-if="isExternal(props.to)" :href="props.to" target="_blank" rel="noopener">
    <slot />
  </a>
  <router-link v-else :to="props.to">
    <slot />
  </router-link>
</template>
