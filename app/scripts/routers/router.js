import Vue from "vue";
import VueRouter from "vue-router";
import { token, sessionOut } from "./../util/core";
import mainRouter from "./mainRouter.js";
Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
Vue.config.productionTip = false;
//路由页面切换的时候，保持页面在滚动顶部显示
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  } else {
    const position = {};
    if (to.hash) {
      position.selector = to.hash;
    }
    if (to.matched.some((m) => m.meta.scrollToTop)) {
      position.x = 0;
      position.y = 0;
    }
    return position;
  }
};
// 定义路由
const loginRouter = [
  { path: "/", redirect: "/login" },
  {
    path: "/login",
    component: () => import("@/pages/login/login.vue"),
    meta: { scrollToTop: true },
  },
  {
    path: "/main",
    component: () => import("@/pages/main/main.vue"),
    meta: { scrollToTop: true },
  },
  ...mainRouter,
];
const routes = [...loginRouter];
// 创建router实例
const router = new VueRouter({
  mode: "history",
  base: __dirname,
  scrollBehavior,
  routes: routes,
});
//判断当前是否登录，则跳转相应的页面
router.beforeEach((to, form, next) => {
  // 判断是否需要登录权限
  next();
  // if (to.matched.some((res) => res.meta.requireAuth)) {
  //   // 判断是否登录
  //   if (token()) {
  //     next();
  //   } else {
  //     next({
  //       path: "/login",
  //     });
  //   }
  // } else {
  //   next();
  // }
});
export default router;
