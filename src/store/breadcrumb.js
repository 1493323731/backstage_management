export default {
  state: {
    //面包屑的数据
    breadcrumbList: [
      {
        path: "/home",
        name: "home",
        label: "首页",
        icon: "s-home",
        url: "Home/Home",
      },
    ],
  },
  mutations: {
    //更新面包屑数据
    updateBreadcrumbList(state, val) {
      //如果点击的是首页不做任何处理
      //点击的不是首页，则判断是不是已经存在的面包屑数据
      if (val.name !== "home") {
        const isExist = state.breadcrumbList.findIndex(
          (item) => item.name === val.name
        );
        if (isExist === -1) {
          state.breadcrumbList.push(val);
        }
      }
    },
    //删除对应tag标签
    deleteTagData(state, val) {
      //如果能找到对应元素，则记录对应索引
      const index = state.breadcrumbList.findIndex(
        (item) => item.name === val.name
      );
      //删除数据，splice方法，从index索引开始删，删1个
      state.breadcrumbList.splice(index, 1);
    },
    //清空breadcrumbList中除首页外的其他数据
    clearBreadcrumbList(state) {
      state.breadcrumbList = [
        {
          path: "/home",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/Home",
        },
      ];
    },
  },
};
