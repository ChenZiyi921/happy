<script setup>
import { departmentCascade } from "@/api/dict"
import { ElMessage } from "element-plus"
import { ref } from "vue"

const defaultProps = {
  children: "children",
  label: "label"
}

const data = ref([])

departmentCascade({ only_department: 1 }).then((res) => {
  if (res.code_status === 0) {
    data.value = res.data.list
  } else {
    ElMessage.error(res.msg)
  }
})

const handleNodeClick = (data) => {
  console.log(data)
}
</script>

<template>
  <div class="organization">
    <div style="display: flex; flex-direction: column; background-color: #fff; padding: 20px 0">
      <el-input
        v-model="input"
        style="
          width: 240px;
          height: 30px;
          background: #e8e8e8;
          border: 0;
          border-radius: 2px;
          text-align: center;
          margin: 0 auto;
        "
        placeholder="搜索部门、员工"
      />
      <el-tree class="department" :data="data" :props="defaultProps" @node-click="handleNodeClick">
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <img src="@/assets/folder.png" style="padding-right: 4px" />
            <span>{{ node.label }}</span>
          </span>
        </template>
      </el-tree>
    </div>
  </div>
</template>
<style lang="less" scoped>
.organization {
  display: flex;
  height: 100%;
  background-color: #f2f3f5;
  .department {
    width: 300px;
    height: 100%;
    padding: 10px 10px 0;
    overflow: auto;
    :deep(.el-tree-node) {
      padding: 6px 0;
      .custom-tree-node {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
