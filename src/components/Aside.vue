<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3>{{ isCollapse ? "-->" : "后台管理" }}</h3>
    <el-menu-item
      v-for="item in noChidren"
      @click="clickMenu(item)"
      :key="item.name"
      :index="item.path"
    >
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      v-for="item in hasChidren"
      :key="item.label"
      :index="item.label"
    >
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
        <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{
          subItem.label
        }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import Cookie from "js-cookie";
export default {
  data() {
    return {};
  },
  methods: {
    //点击菜单的回调
    clickMenu(item) {
      if (this.$route.path !== item.path) {
        this.$router.push(item.path);
      }
      //更新面包屑数据
      this.$store.commit("updateBreadcrumbList", item);
    },
  },
  computed: {
    //没有子菜单
    noChidren() {
      return this.menuData.filter((item) => !item.children);
    },
    //有子菜单
    hasChidren() {
      return this.menuData.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.menu.isCollapse;
    },
    //菜单数据
    menuData() {
      return JSON.parse(Cookie.get("menu"));
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100%;
  border-right: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400;
  }
}
</style>
