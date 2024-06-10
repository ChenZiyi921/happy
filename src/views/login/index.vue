<script setup>
import { useUserStore } from "@/store/modules/user.js"
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const loginFormRef = ref(null)
const loading = ref(false)
const active = ref(1)

const loginFormData = reactive({
  account: "",
  password: "",
  code: ""
})

const loginFormRules = {
  account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, message: "长度6个字符", trigger: "blur" }
  ]
}

const tabChange = (index) => {
  active.value = index
}

const handleLogin = () => {
  loginFormRef.value?.validate((valid, fields) => {
    if (valid) {
      loading.value = true
      useUserStore()
        .login(loginFormData)
        .then(() => {
          router.push({ path: "/" })
        })
        .catch(() => {
          loginFormData.password = ""
        })
        .finally(() => {
          loading.value = false
        })
    } else {
      console.error("error", fields)
    }
  })
}
</script>

<template>
  <div class="login-container">
    <div class="main">
      <div class="left_bg"><img src="@/assets/login/left_bg.png" alt="" /></div>
      <div class="login-card">
        <div class="content">
          <div class="logo"><img src="@/assets/login/logo.png" alt="" /></div>
          <div class="tabs">
            <span :class="{ active: active === 1 }" @click="tabChange(1)">密码登录</span>
            <span :class="{ active: active === 2 }" @click="tabChange(2)">短信登录</span>
          </div>
          <el-form ref="loginFormRef" :model="loginFormData" :rules="loginFormRules" @keyup.enter="handleLogin">
            <template v-if="active === 1">
              <el-form-item prop="account">
                <el-input
                  v-model.trim="loginFormData.account"
                  placeholder="请输入您的手机号"
                  type="text"
                  tabindex="1"
                  size="large"
                />
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model.trim="loginFormData.password"
                  placeholder="请输入您的登陆密码"
                  type="password"
                  tabindex="2"
                  size="large"
                  show-password
                />
              </el-form-item>
            </template>
            <template v-else>
              <el-form-item prop="account">
                <el-input
                  v-model.trim="loginFormData.account"
                  placeholder="请输入您的手机号"
                  type="text"
                  tabindex="1"
                  size="large"
                />
              </el-form-item>
              <el-form-item prop="password">
                <div class="code_container">
                  <el-input
                    v-model.trim="loginFormData.code"
                    placeholder="请输入验证码"
                    type="text"
                    tabindex="2"
                    size="large"
                  />
                  <button class="code">获取验证码</button>
                </div>
              </el-form-item>
            </template>
            <el-form-item>
              <button class="submit" v-loading="loading" @click.prevent="handleLogin">登 录</button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import url("./index.less");
</style>
