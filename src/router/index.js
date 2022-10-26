import Vue from "vue";
import VueRouter from "vue-router";
//引入路由组件
import Main from "@/views/Main";
import Home from "@/views/Home";
import User from "@/views/User";
import Welcome from "@/views/Welcome";
import MyProfile from "@/views/MyProfile";
import Login from "@/views/Login";
import Cookie from "js-cookie";
Vue.use(VueRouter);
//将路由与组件进行映射
const routes = [
  {
    path: "/",
    component: Main,
    //重定向
    redirect: "/home",
    children: [
      { path: "/home", name: "home", component: Home }, //首页
      {
        path: "/user",
        name: "user",
        component: User,
        //如果是普通用户，则不能进入用户管理界面
        beforeEnter: (to, from, next) => {
          const privilege = Cookie.get("privilege");
          if (privilege === "1") {
            next();
          } else {
            next(false);
          }
        },
      }, //用户管理
      { path: "welcome", name: "welcome", component: Welcome }, //页面1
      { path: "myprofile", name: "myprofile", component: MyProfile }, //页面2
    ],
  }, //内容区域
  {
    path: "/login",
    name: "login",
    component: Login,
  }, //登录页
];
// 创建 router 实例
const router = new VueRouter({
  routes,
});
//暴露router实例
export default router;
