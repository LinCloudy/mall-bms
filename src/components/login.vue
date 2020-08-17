<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="./../assets/logo.png" alt="" />
      </div>
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-width="0px"
        class="form"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder=""
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder=""
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" plain @click="submit('loginForm')"
            >submit</el-button
          >
          <el-button type="info" plain @click="reset('loginForm')"
            >reset</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    const checkPWD = (rule, value, callback) => {
      const inputVal = value.trim();

      if (inputVal === '' || inputVal === null) {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: '',
        password: '',
      },
      loginRules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: ['change', 'blur'],
          },
        ],
        password: [
          {
            required: true,
            validator: checkPWD,
            trigger: ['change', 'blur'],
          },
        ],
      },
    };
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    reset(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 4px;
  position: relative;

  .avatar_box {
    width: 120px;
    height: 120px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);

    img {
      width: 100%;
      height: 100%;
    }
  }

  .form {
    position: absolute;
    width: 100%;
    padding: 2px 18px;
    bottom: 20px;
    box-sizing: border-box;

    .btns {
      float: right;
    }
  }
}
</style>
