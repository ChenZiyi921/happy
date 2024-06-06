<script setup>
import { setCssVariableValue } from "@/utils"
import { watchEffect } from "vue"
import Layout from "./Layout.vue"

const cssVariableName = "--v3-tagsview-height"

watchEffect(() => {
  setCssVariableValue(cssVariableName, "0px")
})
</script>

<template>
  <div>
    <Layout />
  </div>
</template>

<style lang="scss" scoped>
.showGreyMode {
  filter: grayscale(1);
}

.showColorWeakness {
  filter: invert(0.8);
}
</style>
