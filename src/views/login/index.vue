<script lang="ts" setup>
import { useUserStore } from "@/store/modules/user"
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
  loginFormRef.value?.validate((valid: boolean, fields) => {
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
      console.error("表单校验不通过", fields)
    }
  })
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="content">
        <div class="logo"><img src="@/assets/login/logo.png" alt="" /></div>
        <div class="tabs">
          <span :class="{ active: active === 1 }" @click="tabChange(1)">密码登录</span>
          <span :class="{ active: active === 2 }" @click="tabChange(2)">短信登录</span>
        </div>
        <el-form ref="loginFormRef" :model="loginFormData" :rules="loginFormRules" @keyup.enter="handleLogin">
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
          <button class="submit" v-loading="loading" @click.prevent="handleLogin">登 录</button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  min-height: 100%;
  background: #fff url("@/assets/login/bg.png") left center no-repeat;
  background-size: 60%;
  .theme-switch {
    position: fixed;
    top: 5%;
    right: 5%;
    cursor: pointer;
  }
  .login-card {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40%;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 150px;
      img {
        height: 100%;
      }
    }
    .content {
      width: 390px;
      margin-right: 40px;
      .logo {
        width: 68%;
        margin: auto;
      }
      .tabs {
        display: flex;
        padding: 50px 0;
        justify-content: space-evenly;
        span {
          // font-weight: bold;
          font-size: 20px;
          color: #333;
          padding-bottom: 6px;
          cursor: pointer;
        }
        span.active {
          border-bottom: 3px solid #ff7e16;
        }
      }
      .el-form-item {
        margin-bottom: 24px;
      }
      .el-input {
        height: 60px;
        margin-bottom: 6px;
      }
      .submit {
        width: 100%;
        height: 60px;
        line-height: 60px;
        margin-top: 10px;
        font-size: 22px;
        color: #fff;
        border: none;
        background: url("@/assets/login/submit.png");
      }
      :deep(.el-input-group__append) {
        padding: 0;
        overflow: hidden;
        .el-image {
          width: 100px;
          height: 40px;
          border-left: 0px;
          user-select: none;
          cursor: pointer;
          text-align: center;
        }
      }
      .el-button {
        width: 100%;
        margin-top: 10px;
      }
    }
  }
}
</style>
