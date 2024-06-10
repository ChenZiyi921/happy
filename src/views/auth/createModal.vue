<script setup>
import { reactive, ref } from "vue"

const props = defineProps({})

const title = ref("")
const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = "100px"

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

const setVisible = (visible, t) => {
  title.value = t
  dialogFormVisible.value = visible
}

defineExpose({ setVisible })
</script>

<template>
  <el-dialog v-model="dialogFormVisible" :title="`${title}权限`" width="500">
    <el-form :model="form">
      <el-form-item label="父级" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="访问路径" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="权限名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="所属类型" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="Please select a zone">
          <el-option label="菜单" value="menu" />
          <el-option label="按钮" value="btn" />
        </el-select>
      </el-form-item>
      <el-form-item label="所属类型" :label-width="formLabelWidth">
        <el-radio-group v-model="form.radio1" class="ml-4">
          <el-radio :value="1" size="large">禁用</el-radio>
          <el-radio :value="2" size="large">启用</el-radio>
        </el-radio-group>
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
