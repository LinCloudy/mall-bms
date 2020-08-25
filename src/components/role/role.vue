<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row>
        <el-col :span="4">
          <el-button type="primary" @click="handleAddRoleDialog">Add</el-button>
        </el-col>
      </el-row>

      <el-table :data="rolesList" style="width: 100%">
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="180"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="handleEditRoleDialog(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="handleDeleteRole(scope.row)"
            ></el-button>
            <el-tooltip effect="light" content="分配权限" placement="top" :enterable="false">
              <el-button type="warning" size="mini" icon="el-icon-setting"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rolesList: []
    };
  },
  methods: {
    // 获取角色列表
    getRoleList() {
      this.$http.get('roles').then((response) => {
        const { data: res } = response;
        if (res.meta.status === 200) {
          this.rolesList = res.data;
        } else {
          this.rolesList = [];
        }
      });
    },
    handleAddRoleDialog() {},
    handleEditRoleDialog() {},
    handleDeleteRole() {}
  },
  created() {
    this.getRoleList();
  }
};
</script>
<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 12px;
}
</style>
