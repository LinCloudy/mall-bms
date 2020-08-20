<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>

        <el-col :span="4">
          <el-button type="primary">Add</el-button>
        </el-col>
      </el-row>

      <el-table>
        <el-table-column></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userList: []
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      this.$http
        .get('users', { params: this.queryInfo })
        .then((response) => {
          const { data: res } = response;
          if (res.meta.status === 200) {
            this.userList = res.data;
            console.log(this.userList);
          } else {
            return this.$message.error(res.meta.msg);
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 12px;
}
.el-table {
  margin-top: 15px;
}
</style>
