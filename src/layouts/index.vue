<script lang="ts" setup>
import { setCssVariableValue } from "@/utils"
import { watchEffect } from "vue"
import LeftMode from "./LeftMode.vue"
import useResize from "./hooks/useResize"

useResize()

//#region 隐藏标签栏时删除其高度，是为了让 Logo 组件高度和 Header 区域高度始终一致
const cssVariableName = "--v3-tagsview-height"

watchEffect(() => {
  setCssVariableValue(cssVariableName, "0px")
})
//#endregion
</script>

<template>
  <div>
    <LeftMode />
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
