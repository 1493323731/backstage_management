import Mock from "mockjs";
export default {
  getMenu: (config) => {
    const { account, password } = JSON.parse(config.body);
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (account === "123" && password === "123") {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: "/home",
              name: "home",
              label: "首页",
              icon: "s-home",
              url: "Home.vue",
            },
            {
              path: "/user",
              name: "user",
              label: "用户管理",
              icon: "user",
              url: "User.vue",
            },
            {
              label: "其他",
              icon: "location",
              children: [
                {
                  path: "/myprofile",
                  name: "myprofile",
                  label: "我的资料",
                  icon: "setting",
                  url: "MyProfile.vue",
                },
                {
                  path: "/welcome",
                  name: "welcome",
                  label: "超级用户",
                  icon: "setting",
                  url: "Welcome.vue",
                },
              ],
            },
          ],
          privilege: "1", //是否拥有特权
          token: Mock.Random.guid(),
          message: "获取成功",
        },
      };
    } else if (account === "666" && password === "666") {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: "/home",
              name: "home",
              label: "首页",
              icon: "s-home",
              url: "Home.vue",
            },
            {
              label: "其他",
              icon: "location",
              children: [
                {
                  path: "/myprofile",
                  name: "myprofile",
                  label: "我的资料",
                  icon: "setting",
                  url: "MyProfile.vue",
                },
                {
                  path: "/welcome",
                  name: "welcome",
                  label: "普通用户",
                  icon: "setting",
                  url: "Welcome.vue",
                },
              ],
            },
          ],
          privilege: "0",
          token: Mock.Random.guid(),
          message: "获取成功",
        },
      };
    } else {
      return {
        code: -999,
        data: {
          message:
            "账号或密码错误，当前未开发注册功能，可以使用账号123或666进行登录，密码和账号一致",
        },
      };
    }
  },
};
