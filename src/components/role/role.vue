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
        <el-table-column type="expand" width="60">
          <template slot-scope="scope">
            <!-- <pre>{{scope.row}}</pre> -->
            <el-row
              :class="['border-bottom', i1 === 0 ? 'border-top' : '', 'vertical-center']"
              v-for="(item1, i1) in scope.row.children"
              :key="item1.id"
            >
              <!-- 一级权限 -->
              <el-col :span="5">
                <el-tag
                  closable
                  @close="handleDeleteRightById(scope.row, item1.id)"
                >{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>

              <!-- 二级权限 -->
              <el-col :span="19">
                <el-row
                  :class="[ i2 === 0 ? '' : 'border-top', 'vertical-center']"
                  v-for="(item2, i2) in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="handleDeleteRightById(scope.row, item2.id)"
                    >{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <!-- 三级权限 -->
                    <el-tag
                      :class="[ i3 === 0 ? '' : 'border-top']"
                      v-for="(item3, i3) in item2.children"
                      :key="item3.id"
                      type="warning"
                      closable
                      @close="handleDeleteRightById(scope.row, item3.id)"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="360"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="360"></el-table-column>
        <el-table-column label="操作" width="360">
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
              <el-button
                type="warning"
                size="mini"
                icon="el-icon-setting"
                @click="handleDistributeRight(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分配权限对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="isDistributeRightDialogVisible"
      width="50%"
      @close="handleDistributeRightDialogClose"
    >
      <!-- 权限树 -->
      <el-tree
        :data="rightsList"
        :props="rightsTreeProps"
        node-key="id"
        show-checkbox
        default-expand-all
        :default-checked-keys="defaultCheckedNodes"
      ></el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="isDistributeRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="isDistributeRightDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { httpMixin } from '@/mixins/globalMixin';
export default {
  mixins: [httpMixin],
  data() {
    return {
      rolesList: [], // 角色列表
      rightsList: [], // 权限列表
      rightsTreeProps: {
        // 权限树属性绑定对象
        label: 'authName',
        children: 'children'
      },
      defaultCheckedNodes: [], // 默认选中树节点
      isDistributeRightDialogVisible: false
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
    handleDeleteRole() {},
    // 删除权限
    handleDeleteRightById(row, targetId) {
      this.$msgbox
        .confirm('确定删除当前权限？', '提示', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.$http
            .delete(`roles/${row.id}/rights/${targetId}`)
            .then((response) => {
              const { data: res } = response;
              this.handleResponse(res, () => {
                // this.getRoleList();
                row.children = res.data;
              });
            });
        });
    },
    // 分配权限
    handleDistributeRight(row) {
      this.$http
        .get('rights/tree')
        .then((response) => {
          const { data: res } = response;
          if (res.meta.status === 200) {
            this.rightsList = res.data;
          } else {
            this.rightsList = [];
          }
          // console.log(JSON.stringify(res, null, 2));
        })
        .then(() => {
          this.getThirdLeafNodes(row, this.defaultCheckedNodes);
          this.isDistributeRightDialogVisible = true;
        });
    },
    // 获取三级权限节点
    getThirdLeafNodes(node, array) {
      if (!node.children) {
        return array.push(node.id);
      }

      node.children.forEach((item) => {
        this.getThirdLeafNodes(item, array);
      });
    },
    // 关闭对话框
    handleDistributeRightDialogClose() {
      this.defaultCheckedNodes = [];
    }
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

.el-tag {
  margin: 7px;
}

.border-top {
  border-top: 1px solid #eee;
}

.border-bottom {
  border-bottom: 1px solid #eee;
}

.vertical-center {
  display: flex;
  align-items: center;
}
</style>
