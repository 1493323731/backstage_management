import http from "./request";
// 获取首页数据
export const getHomeData = () =>
  http({
    url: "/home/getHomeData",
    method: "get",
  });
//获取|修改用户数据
export const getUser = (params) =>
  http({
    url: "/user/getUser",
    params,
    method: "get",
  });
//新增用户数据
export const addUser = (data) =>
  http({
    url: "/user/add",
    data,
    method: "post",
  });
//编辑用户数据
export const editUser = (data) =>
  http({
    url: "/user/edit",
    data,
    method: "post",
  });
//删除用户数据
export const delUser = (data) =>
  http({
    url: "/user/del",
    data,
    method: "post",
  });
//获取登录后需要的菜单数据
export const getMenu = (data) => {
  return http.post("/permission/getMenu", data);
};
