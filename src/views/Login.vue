<template>
  <el-form :model="form" :inline="true" class="login-container" :rules="rules" ref="form" label-width="70px">
    <h3 class="login_title">系统登录</h3>
    <el-form-item label="账号" prop="account">
      <el-input v-model="form.account" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="submit" style="margin-left: 105px; margin-top: 10px" type="primary">登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Cookie from "js-cookie";
import { getMenu } from "@/api";
export default {
  data() {
    return {
      form: {
        account: "",
        password: "",
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    //登录
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          getMenu(this.form).then(({ data }) => {
            if (data.code === 20000) {
              Cookie.set("token", data.data.token);
              Cookie.set("privilege", data.data.privilege) //是否拥有特权
              this.$store.commit("Menu", data.data.menu);
              this.$router.push("/home");
            } else {
              this.$message.error(data.data.message);
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="less">
.login-container {
  width: 350px;
  border: 1px solid #eaeaea;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box;

  .login_title {
    text-align: center;
    margin-bottom: 40px;
    color: #505458;
  }

  .el-input {
    width: 198px;
  }
}
</style>