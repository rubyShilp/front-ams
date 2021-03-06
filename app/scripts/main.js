import Vue from "vue";
import App from "./pages/app.vue";
import router from "./routers/router";
import "./filter/filter";
import "./directive/index.js";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import vRegion from 'v-region';
import "./../lib/DrawingManager.css";
import "./../lib/DrawingManager.js";

Vue.use(ElementUI);
Vue.use(vRegion);
new Vue({
  router: router,
  render: (h) => h(App),
}).$mount("#app");
