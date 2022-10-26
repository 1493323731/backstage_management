<template>
  <div class="tags">
    <el-tag v-for="item in breadcrumbList " :key="item.path" :closable="item.name !== 'home'"
      :effect="$route.path === item.path ? 'dark' : 'plain'" @click="Tag_skip(item)" @close="handleClose(item)"
      size="small">
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      breadcrumbList: (state) => state.breadcrumb.breadcrumbList,
    }),
  },
  methods: {
    ...mapMutations(["deleteTagData"]),
    // 点击tag跳转的功能
    Tag_skip(item) {
      //防止跳转到当前路由报错
      if (this.$route.path !== item.path) {
        this.$router.push({ name: item.name });
      }
    },
    //点击tag删除的功能
    handleClose(item) {
      this.deleteTagData(item);
      // this.$store.commit("deleteTagData",item);
      //如果删除的并非当前所在路由，则不做处理
      if (item.name !== this.$route.name) {
        console.log(item.name, this.$route.name);
        return;
      } else {
        this.$router.push("/home");
      }
    },
  },
};
</script>

<style lang="less">
.tags {
  padding: 20px;

  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>