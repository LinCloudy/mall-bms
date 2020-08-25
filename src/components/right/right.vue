<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-table :data="rightsList" style="width: 100%">
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
        <el-table-column prop="path" label="路径" width="180"></el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'" disable-transitions>一级</el-tag>
            <el-tag v-else-if="scope.row.level === '1'" type="success" disable-transitions>二级</el-tag>
            <el-tag v-else-if="scope.row.level === '2'" type="warning" disable-transitions>三级</el-tag>
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
      rightsList: []
    };
  },
  methods: {
    // 获取权限列表
    getRightList() {
      this.$http.get('rights/list').then((response) => {
        const { data: res } = response;
        if (res.meta.status === 200) {
          this.rightsList = res.data;
          console.log(
            'rightsList' + JSON.stringify(this.rightsList, null, 2)
          );
        } else {
          this.rightsList = [];
        }
      });
    }
  },
  created() {
    this.getRightList();
  }
};
</script>
<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 12px;
}
</style>
