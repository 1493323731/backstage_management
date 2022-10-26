<template>
  <div class="header-container">
    <div class="l-content">
      <el-button style="margin-right: 20px" icon="el-icon-menu" @click="changeCollapse" size="mini"></el-button>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.name" :to="{ path: item.path }">{{ item.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown @command="logout">
        <span class="el-dropdown-link">
          <img src="../assets/images/user.png" alt="" class="user" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="logoff">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Cookie from "js-cookie";
export default {
  methods: {
    changeCollapse() {
      this.$store.commit("changeCollapse");
    },
    //退出登录
    logout(command) {
      if (command === "logoff") {
        Cookie.remove("token");
        Cookie.remove("menu");
        Cookie.remove("canToUser");
        this.$store.commit("clearBreadcrumbList")
        this.$router.push("/login");
      }
    },
  },
  computed: {
    ...mapState({
      breadcrumbList: (state) => state.breadcrumb.breadcrumbList,
    }),
  },
};
</script>

<style lang="less" scoped>
.header-container {
  padding: 0 20px;
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .r-content {
    .user {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }

  .l-content {
    display: flex;
    align-items: center;

    /deep/.el-breadcrumb__item {
      // 样式穿刺
      .el-breadcrumb__inner {
        font-weight: normal;

        &.is-link {
          color: #666;
        }
      }

      &:last-child {
        .el-breadcrumb__inner {
          cursor: pointer;
        }
      }
    }
  }
}
</style>