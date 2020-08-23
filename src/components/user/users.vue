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
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            class="input-with-select"
            clearable
            @clear="handleClear"
          >
            <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
          </el-input>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" @click="handleAddUserDialog">Add</el-button>
        </el-col>
      </el-row>

      <el-table :data="userList" border style="width: 100%">
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
        <el-table-column prop="role_name" label="角色" width="180"></el-table-column>
        <el-table-column prop="mg_state" label="状态" width="180">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="handleStateChanged(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="handleEditUserDialog(scope.row)"
            ></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
            <el-tooltip effect="light" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" size="mini" icon="el-icon-setting"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </el-card>

    <el-dialog
      :title="dialogTitle"
      :editType="editType"
      :visible.sync="isUserDialogVisible"
      width="50%"
    >
      <el-form :model="userForm" :rules="userRules" ref="userForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="userForm.mobile" v-filterDigital></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="isUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleOperateUser('userForm')">确 定</el-button>
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
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      userList: [],
      totalCount: 0,
      isUserDialogVisible: false, // 控制用户对话框
      userForm: {
        id: '',
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      userRules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: ['blur']
          },
          {
            min: 3,
            max: 8,
            message: '长度在 3 到 8 个字符',
            trigger: ['change']
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: ['blur']
          },
          {
            min: 3,
            max: 8,
            message: '长度在 3 到 8 个字符',
            trigger: ['change']
          }
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: ['change', 'blur']
          }
        ],
        mobile: [
          {
            required: true,
            message: '请输入手机号',
            trigger: ['change', 'blur']
          }
        ]
      },
      dialogTitle: '', // 用户对话框标题
      editType: '' // 编辑类型 add-新增 modify-修改
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    // 获取用户列表
    getUserList() {
      this.$http
        .get('users', { params: this.queryInfo })
        .then((response) => {
          const { data: res } = response;
          if (res.meta.status === 200) {
            this.userList = res.data.users;
            this.totalCount = res.data.total;
            console.log(
              'userList:' + JSON.stringify(this.userList, null, 2)
            );
          } else {
            return this.$message.error(res.meta.msg);
          }
        });
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    handleCurrentChange(nowPage) {
      this.queryInfo.pagenum = nowPage;
      this.getUserList();
    },
    // 修改用户状态
    handleStateChanged(row) {
      this.$http
        .put(`users/${row.id}/state/${row.mg_state}`)
        .then((response) => {
          const { data: res } = response;
          this.handleResponse(res, () => {
            this.getUserList();
          });
        })
        .catch((error) => {
          row.mg_state = !row.mg_state;
          this.showErrorMessage(error);
        });
    },
    handleSearch() {
      this.getUserList();
    },
    handleClear() {
      this.getUserList();
    },
    handleAddUserDialog() {
      this.isUserDialogVisible = true;
      this.dialogTitle = '添加用户';
      this.editType = 'add';
    },
    // 处理用户
    handleOperateUser(formName) {
      if (this.editType === 'add') {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('users', this.userForm).then((response) => {
              const { data: res } = response;
              this.handleResponse(res, () => {
                this.isUserDialogVisible = false;
                this.$refs[formName].resetFields();
                this.getUserList();
              });
            });
          } else {
            return false;
          }
        });
      } else if (this.editType === 'modify') {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http
              .put(`users/${this.userForm.id}`, this.userForm)
              .then((response) => {
                const { data: res } = response;
                this.handleResponse(res, () => {
                  this.isUserDialogVisible = false;
                  this.$refs[formName].resetFields();
                  this.getUserList();
                });
              });
          } else {
            return false;
          }
        });
      }
    },
    // 编辑用户users/:id
    handleEditUserDialog(row) {
      this.userForm.id = row.id;
      this.userForm.username = row.username;
      this.userForm.password = row.password;
      this.userForm.email = row.email;
      this.userForm.mobile = row.mobile;

      this.isUserDialogVisible = true;
      this.dialogTitle = '编辑用户';
      this.editType = 'modify';
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
  margin: 15px 0px;
}
</style>
