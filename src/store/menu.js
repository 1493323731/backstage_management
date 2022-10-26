import Cookie from "js-cookie";

export default {
  state: {
    isCollapse: false, //控制菜单展开|折叠
    menu: [], //菜单的数据
  },
  mutations: {
    changeCollapse(state) {
      state.isCollapse = !state.isCollapse;
    },
    //更新menu数据
    Menu(state, val) {
      state.menu = val;
      // 为了防止一刷新menu数据就丢失导致菜单空白，将menu数据存储在Cookie中
      Cookie.set("menu", JSON.stringify(val));
    },
  },
  actions: {},
  getters: {},
};
