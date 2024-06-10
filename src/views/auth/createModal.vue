<script setup>
import { reactive, ref } from "vue"
import { ElMessage } from "element-plus"
import { uploadImage } from "@/api/index.js"

const props = defineProps({})
const upload = ref()
const title = ref("")
const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = "100px"
const fileList = ref([])

const form = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
  img_src: ""
})

const setVisible = (visible, t) => {
  title.value = t
  dialogFormVisible.value = visible
}

const onBeforeUploadImage = (file) => {
  const is1M = file.size / 1024 / 1024 < 1
  if (!is1M) {
    ElMessage.error("上传文件大小不能超过 1MB!")
  }
  return is1M
}

const fileChange = (file) => {
  fileList.value = [{ name: file.name, url: file.url }]
}

const handleExceed = (files) => {
  upload.value?.clearFiles()
  const file = files[0]
  file.uid = genFileId()
  upload.value?.handleStart(file)
}

const uploadFile = (param) => {
  let formData = new FormData()
  uploadImage({ file: param.file, module: 3 }).then((res) => {
    if (res.code_status == 0) {
      form.img_src = res.data[0].image_url
      ElMessage({
        type: "success",
        message: res.msg
      })
    } else {
      ElMessage({
        type: "error",
        message: res.msg
      })
    }
  })
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
      <el-form-item label="上传图片" :label-width="formLabelWidth">
        <el-upload
          ref="upload"
          v-model:file-list="fileList"
          :limit="1"
          :on-exceed="handleExceed"
          :http-request="uploadFile"
          :on-change="fileChange"
          :before-upload="onBeforeUploadImage"
          accept="image/jpeg,image/png,image/jpg"
        >
          <el-button size="small" style="border: 0; border: 1px solid #f09b22; background: #fff; color: #f09b22"
            >点击上传</el-button
          >
          <template #tip>
            <div>只能上传jpg/png文件，大小为16*16，且不超过50kb</div>
          </template>
        </el-upload>
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
