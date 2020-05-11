import Vue from "vue";
import VueRouter from "vue-router";
import Main from "@/views/Main";
import Other from "@/views/Other.vue";

Vue.use(VueRouter);

const routes = [
  // 主视图布局（带有底部导航）
  {
    path: "/",
    name: "Main",
    component: Main,
    redirect: { name: "home" },
    children: [
      {
        path: "home",
        name: "home",
        meta: { title: '首页' },
        component: () => import("@/views/home")
      }
    ]
  },
  // 副视图布局（不带底部导航）
  {
    path: "/other",
    name: "Other",
    component: Other,
    children: [
      {
        path: "login",
        name: "login",
        meta: { title: '登录' },
        component: () => import("@/views/login")
      }
    ]
  },
  // 404
  {
    path: "/404",
    name: "404",
    meta: { title: '404' },
    component: () => import("@/views/404")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title || '渠易宝'
  }
  if (to.matched.length !== 0) {
    next();
  }
  else {
    next({ name: '404' })
  }
});

export default router;
