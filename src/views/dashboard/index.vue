<script setup>
import { departmentCascade } from "@/api/dict"
import { departmentUserList } from "@/api/user"

import { ElMessage } from "element-plus"
import { reactive, ref } from "vue"

const defaultProps = {
  children: "children",
  label: "label"
}

const data = ref([])
const multipleSelection = ref([])
const user = reactive({
  list: [],
  pageinfo: {}
})

departmentCascade({ only_department: 1 }).then((res) => {
  if (res.code_status === 0) {
    data.value = res.data.list
  } else {
    ElMessage.error(res.msg)
  }
})

const getDepartmentUserList = (data) => {
  departmentUserList({ department_id: data.id, keywords: "", page: 1, size: 10 }).then((res) => {
    user.list = res.data.list
    user.pageinfo = res.data.pageinfo
  })
}

const handleSelectionChange = (val) => {
  multipleSelection.value = val
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
      <el-tree class="department" :data="data" :props="defaultProps" @node-click="getDepartmentUserList">
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <img src="@/assets/folder.png" style="padding-right: 4px" />
            <span>{{ node.label }}</span>
          </span>
        </template>
      </el-tree>
    </div>
    <el-table
      :data="user.list"
      style="width: 100%; margin-left: 14px"
      @selection-change="handleSelectionChange"
      :header-cell-style="{ backgroundColor: '#f7f7f7' }"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="username" label="姓名" min-width="100" />
      <el-table-column prop="position" label="职务" min-width="140" />
      <el-table-column prop="job_name" label="角色" min-width="180" />
      <el-table-column prop="department_name" label="部门" min-width="140" />
      <el-table-column prop="account" label="账号" min-width="120" />
      <el-table-column prop="status" label="状态" min-width="80" />
      <el-table-column prop="address" label="操作" min-width="180" fixed="right">
        <template #default="{ row }">
          <span v-if="row.status == 1">停用</span>
          <span v-if="row.status == 2">启用</span>
          <span>重置密码</span>
          <span v-if="row.status == 2">删除</span>
        </template>
      </el-table-column>
    </el-table>
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
