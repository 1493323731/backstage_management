import Mock from "mockjs";
// 首页的数据
import home from "@/mock/home";
Mock.mock("/api/home/getHomeData", home.getStatisticalData);
// 用户列表的数据
import user from "@/mock/user";
Mock.mock("/api/user/add", "post", user.createUser);
Mock.mock("/api/user/edit", "post", user.updateUser);
Mock.mock("/api/user/del", "post", user.deleteUser);
Mock.mock(/api\/user\/getUser/, user.getUserList);
//使用正则，请求携带参数，参数会跟在路径后面，如果写成绝对路径报错404
//登录页的数据
import permission from "@/mock/permission";
Mock.mock(/api\/permission\/getMenu/, "post", permission.getMenu);
