import Vue from "vue";
import App from "./pages/app.vue";
import router from "./routers/router";
import "./filter/filter";
import "./directive/index.js";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import BaiduMap from "vue-baidu-map";
Vue.use(BaiduMap, {
  // ak: "ne52jEbvgvLx7kdY0O1g6LXrVhNLEGhhg", //百度地图密钥
  ak: "nDeAA1zLmLCnjAGejr4717f2wbPgxH1Q", //百度地图密钥
});
Vue.use(ElementUI);
new Vue({
  router: router,
  render: (h) => h(App),
}).$mount("#app");
