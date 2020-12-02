import Vue from "vue";
import App from "./pages/app.vue";
import router from "./routers/router";
import "./filter/filter";
import "./directive/index.js";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
new Vue({
  router: router,
  render: (h) => h(App),
}).$mount("#app");
