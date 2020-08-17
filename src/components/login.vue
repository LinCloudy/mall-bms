<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="./../assets/logo.png" alt="" />
      </div>
      <el-form label-width="0px" class="form">
        <el-form-item>
          <el-input
            placeholder=""
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder=""
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" plain>submit</el-button>
          <el-button type="info" plain>reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {};
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
