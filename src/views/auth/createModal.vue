<script setup>
import { reactive, ref } from "vue"

const title = ref("")
const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = "140px"

const form = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: ""
})

const setVisible = (visible) => {
  dialogFormVisible.value = visible
}

defineExpose({ setVisible })
</script>

<template>
  <el-dialog v-model="dialogFormVisible" :title="`${title}权限`" width="500">
    <el-form :model="form">
      <el-form-item label="Promotion name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Zones" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button color="#ff7e16" style="color: #fff" @click="dialogFormVisible = false">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped></style>
