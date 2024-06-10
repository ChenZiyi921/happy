<script lang="ts" setup>
import { useAppStore } from "@/store/modules/app.js"
import { usePermissionStore } from "@/store/modules/permission"
import { getCssVariableValue } from "@/utils/index.js"
import { computed } from "vue"
import { useRoute } from "vue-router"
import Logo from "../Logo/index.vue"
import SidebarItem from "./SidebarItem.vue"

const v3SidebarMenuBgColor = getCssVariableValue("--v3-sidebar-menu-bg-color")
const v3SidebarMenuTextColor = getCssVariableValue("--v3-sidebar-menu-text-color")
const v3SidebarMenuActiveTextColor = getCssVariableValue("--v3-sidebar-menu-active-text-color")

const route = useRoute()
const appStore = useAppStore()
const permissionStore = usePermissionStore()

const activeMenu = computed(() => {
  const {
    meta: { activeMenu },
    path
  } = route
  return activeMenu ? activeMenu : path
})
const noHiddenRoutes = computed(() => permissionStore.routes.filter((item) => !item.meta?.hidden))
const isCollapse = computed(() => !appStore.sidebar.opened)
const backgroundColor = computed(() => v3SidebarMenuBgColor)
const textColor = computed(() => v3SidebarMenuTextColor)
const activeTextColor = computed(() => v3SidebarMenuActiveTextColor)
const sidebarMenuItemHeight = computed(() => {
  return "var(--v3-sidebar-menu-item-height)"
})
const sidebarMenuHoverBgColor = computed(() => {
  return "var(--v3-sidebar-menu-hover-bg-color)"
})
const tipLineWidth = computed(() => {
  return "0px"
})
</script>

<template>
  <div :class="'has-logo'">
    <Logo :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="backgroundColor"
        :text-color="textColor"
        :active-text-color="activeTextColor"
        :collapse-transition="false"
        :mode="'vertical'"
      >
        <SidebarItem v-for="route in noHiddenRoutes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.has-logo {
  .el-scrollbar {
    height: calc(101% - var(--v3-header-height));
  }
}

.el-scrollbar {
  height: 101%;
  :deep(.scrollbar-wrapper) {
    overflow-x: hidden !important;
    .el-scrollbar__view {
      height: 100%;
    }
  }
  :deep(.el-scrollbar__bar) {
    &.is-horizontal {
      display: none;
    }
    &.is-vertical {
      display: none;
    }
  }
}

.el-menu {
  border: none;
  min-height: 100%;
  width: 100% !important;
}

.el-menu--horizontal {
  height: v-bind(sidebarMenuItemHeight);
}
:deep(.el-sub-menu__title) {
  padding: 6px 0;
  box-sizing: content-box;
}
:deep(.el-menu-item),
:deep(.el-sub-menu__title),
:deep(.el-sub-menu .el-menu-item),
:deep(.el-menu--horizontal .el-menu-item) {
  height: 40px;
  line-height: 40px;
  &.is-active {
    background-color: #ff7e16;
  }
}

:deep(.el-sub-menu) {
  &.is-active {
    > .el-sub-menu__title {
      color: v-bind(activeTextColor) !important;
    }
  }
}
</style>
