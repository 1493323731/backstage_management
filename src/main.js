import Vue from "vue";
// 引入element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
// 引入路由
import router from "@/router";
//引入仓库
import store from "@/store";
//引入mock数据
import "@/mock/mockServe";
//引入Cookie
import Cookie from "js-cookie";
Vue.use(ElementUI);
Vue.config.productionTip = false;
//设置全局前置守卫
router.beforeEach((to, from, next) => {
  const token = Cookie.get("token");
  if (!token && to.name !== "login") {
    //用户未登录且当前非登录页，跳转到登录页
    next({ name: "login" });
  } else if (token && to.name == "login") {
    //用户已登录且要去往登录页，中断当前导航
    next(false);
  } else {
    next();
  }
});
new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
