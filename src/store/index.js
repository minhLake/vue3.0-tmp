import Vue from "vue";
import Vuex from "vuex";

import home from "./modules/home";
import login from "./modules/login";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    title: "渠易宝",
    selected: 0,
    tabBar: {
      color: "#212121",
      selectedColor: "#212121",
      backgroundColor: "#fff",
      list: [
        {
          text: "菜单1",
          pagePath: "",
          iconPath: "#",
          selectedIconPath: "#"
        },
        {
          text: "菜单2",
          pagePath: "",
          iconPath: "#",
          selectedIconPath: "#"
        },
        {
          text: "菜单3",
          pagePath: "",
          iconPath: "#",
          selectedIconPath: "#"
        },
        {
          text: "菜单4",
          pagePath: "",
          iconPath: "#",
          selectedIconPath: "#"
        }
      ]
    }
  },
  mutations: {
    selectedChangeHandle(state, payload) {
      state.selected = payload.selected;
    },
    titleChangeHandle(state, payload) {
      state.title = payload.title;
    }
  },
  actions: {},
  modules: {
    home,
    login
  }
});
