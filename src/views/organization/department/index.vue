<script setup>
import { departmentCascade } from "@/api/dict"
import { departmentUserList } from "@/api/user"
import { ElMessage } from "element-plus"
import { onMounted, reactive, ref } from "vue"

const defaultProps = {
  children: "children",
  label: "label"
}

const data = ref([])
const department = reactive({
  label: "",
  total: ""
})
const cascadeLoading = ref(true)
const multipleSelection = ref([])

const user = reactive({
  list: [],
  pageinfo: {
    page: 1,
    records: 368,
    size: 10
  }
})

onMounted(() => {
  getDepartmentUserList()
})

departmentCascade({ only_department: 1 }).then((res) => {
  cascadeLoading.value = false
  if (res.code_status === 0) {
    data.value = res.data.list
  } else {
    ElMessage.error(res.msg)
  }
})

const getDepartmentUserList = ({ id = "", keywords = "", page = 1, size = 10 } = {}) => {
  departmentUserList({ department_id: id, keywords, page, size }).then((res) => {
    user.list = res.data.list
    user.pageinfo = res.data.pageinfo
  })
}

const clickDepartment = (data) => {
  department.value = data.label
  getDepartmentUserList(data)
}

const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

const handleSizeChange = (size) => {
  getDepartmentUserList({ size })
}

const handleCurrentChange = (page) => {
  getDepartmentUserList({ page })
}
</script>

<template>
  <div class="organization">
    <div style="display: flex; flex-direction: column; width: 300px; background-color: #fff; padding: 20px 0">
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
      <el-tree
        class="department"
        :data="data"
        :props="defaultProps"
        v-loading="cascadeLoading"
        @node-click="clickDepartment"
      >
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <img src="@/assets/folder.png" style="padding-right: 4px" />
            <span>{{ node.label }}</span>
          </span>
        </template>
      </el-tree>
    </div>
    <div style="width: calc(100% - 314px); margin-left: 14px">
      <div class="title">{{ department.label }}（{{ user.pageinfo.records }}人）</div>
      <div>
        <span>创建员工</span>
        <span>批量导入</span>
        <span>移动员工</span>
      </div>
      <el-table
        :data="user.list"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :header-cell-style="{ backgroundColor: '#F5E9D0' }"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="username" label="姓名" min-width="100" />
        <el-table-column prop="position" label="职务" min-width="140" />
        <el-table-column prop="job_name" label="角色" min-width="180" />
        <el-table-column prop="department_name" label="部门" min-width="140" />
        <el-table-column prop="account" label="账号" min-width="120" />
        <el-table-column prop="status" label="状态" min-width="80" />
        <el-table-column prop="address" label="操作" min-width="230" fixed="right">
          <template #default="{ row }">
            <span class="operation" v-if="row.status == 1">停用</span>
            <span class="operation" v-if="row.status == 2">启用</span>
            <span class="operation">重置密码</span>
            <span class="operation" v-if="row.status == 2">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="user.pageinfo.page"
        v-model:page-size="user.pageinfo.size"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="user.pageinfo.records"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<style lang="less" scoped>
.organization {
  display: flex;
  max-width: 100%;
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
