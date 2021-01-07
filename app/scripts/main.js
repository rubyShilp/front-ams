import Vue from "vue";
import App from "./pages/app.vue";
import router from "./routers/router";
import BaiduMap from "vue-baidu-map";
import "./filter/filter";
import "./directive/index.js";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
Vue.use(BaiduMap, {
  ak: "nDeAA1zLmLCnjAGejr4717f2wbPgxH1Q", //百度地图密钥
});
new Vue({
  router: router,
  render: (h) => h(App),
}).$mount("#app");
