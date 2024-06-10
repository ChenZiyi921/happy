<script setup>
import { departmentCascade } from "@/api/dict"
import { departmentUserList } from "@/api/user"
import { ElMessage } from "element-plus"
import { onMounted, reactive, ref } from "vue"
import createModal from "./createModal.vue"
import back from "@/components/back/index.vue"

const data = ref([])
const createModalRef = ref()
const cascadeLoading = ref(true)
const deleteVisible = ref(false)

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

const updateAuth = (row) => {
  createModalRef.value.setVisible(true, "编辑")
}

const createAuth = () => {
  createModalRef.value.setVisible(true, "添加")
}

const deleteBefore = (row) => {
  deleteVisible.value = true
}
</script>

<template>
  <div class="auth">
    <!-- <back title="标题" /> -->
    <div style="padding: 10px; background: #fff; margin-bottom: 10px; border-radius: 8px 8px 0 0">
      <el-button type="warning" plain @click="createAuth">添加权限</el-button>
    </div>
    <div class="table">
      <el-table
        :data="user.list"
        style="width: 100%; border-radius: 8px 8px 0 0"
        :row-style="{ background: '#FBF9F4' }"
        :header-cell-style="{ backgroundColor: '#F5E9D0', color: '#5B380F' }"
        default-expand-all
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="username" label="姓名" min-width="100" />
        <el-table-column prop="position" label="职务" min-width="140" />
        <el-table-column prop="job_name" label="角色" min-width="180" />
        <el-table-column prop="department_name" label="部门" min-width="140" />
        <el-table-column prop="account" label="账号" min-width="120" />
        <el-table-column prop="status" label="状态" min-width="80" />
        <el-table-column prop="address" label="操作" min-width="130" fixed="right">
          <template #default="{ row }">
            <span class="operation" @click="updateAuth(row)">修改</span>
            <span class="operation" @click="deleteBefore(row)">删除</span>
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
    <createModal ref="createModalRef"></createModal>
    <el-dialog v-model="deleteVisible" title="提示" width="500" align-center>
      <div>此操作将永久删除，是否继续？</div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="deleteVisible = false">取消</el-button>
          <el-button color="#ff7e16" style="color: #fff" @click="deleteVisible = false">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<style lang="less" scoped>
.auth {
  height: 100%;
  background-color: #f2f3f5;
  .table {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    background-color: #fff;
  }
}
</style>
