<script setup>
import { departmentCascade } from "@/api/dict"
import { departmentUserList } from "@/api/user"
import { ElMessage } from "element-plus"
import { onMounted, reactive, ref } from "vue"

const data = ref([])

const cascadeLoading = ref(true)

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

const handleSizeChange = (size) => {
  getDepartmentUserList({ size })
}

const handleCurrentChange = (page) => {
  getDepartmentUserList({ page })
}
</script>

<template>
  <div class="auth">
    <div class="table">
      <el-table
        :data="user.list"
        style="width: 100%"
        :header-cell-style="{ backgroundColor: '#F5E9D0' }"
        default-expand-all
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
.auth {
  height: 100%;
  background-color: #f2f3f5;
  .table {
    padding: 10px;
    box-sizing: border-box;
    background-color: #fff;
  }
}
</style>
