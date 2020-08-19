<template>
  <el-container class="home_container">
    <el-header>
      <div>Mall Management System</div>
      <el-button type="info" plain @click="logout">logout</el-button>
    </el-header>
    <el-container>
      <el-aside style="width: 200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#e3f2fe"
          text-color="black"
          active-text-color="skyblue"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <i :class="iconObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              :index="subItem.id + ''"
              v-for="subItem in item.children"
              :key="subItem.id"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import { httpMixin } from '@/mixins/globalMixin';
export default {
  mixins: [httpMixin],
  data() {
    return {
      menuList: [],
      iconObj: {
        125: 'el-icon-s-custom',
        103: 'el-icon-s-management',
        101: 'el-icon-s-goods',
        102: 'el-icon-s-order',
        145: 'el-icon-s-platform'
      }
    };
  },
  created() {
    this.getMenuList();
  },
  methods: {
    getMenuList() {
      this.$http.get('menus').then((response) => {
        const { data: res } = response;
        if (res.meta.status === 200) {
          this.menuList = res.data;
          console.log(this.menuList);
        } else {
          return this.$message.error(res.meta.msg);
        }
      });
    },
    logout() {
      window.sessionStorage.clear();
      this.$router.push('/login');
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss" scoped>
.home_container {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e3f2fe;
}
.el-aside {
  background-color: #e3f2fe;
}
.el-main {
  background-color: whitesmoke;
}
</style>
