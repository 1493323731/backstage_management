import Vue from "vue";
import Vuex from "vuex";
import menu from "@/store/menu";
import breadcrumb from "@/store/breadcrumb";
Vue.use(Vuex);
//创建vuex的实例
export default new Vuex.Store({
  modules: {
    menu,
    breadcrumb,
  },
});
