<template >
  <div>
    <el-container style="height: 100%">
      <el-aside width="auto"><Aside></Aside></el-aside>
      <el-container>
        <el-header><Header></Header></el-header>
        <Tag></Tag>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "@/components/Aside";
import Header from "@/components/Header";
import Tag from "@/components/Tag";
export default {
  data() {
    return {};
  },
  components: { Aside, Header, Tag },
};
</script>

<style>
.el-header {
  padding: 0;
}
</style>