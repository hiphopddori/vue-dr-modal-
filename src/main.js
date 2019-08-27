import Vue from "vue";
import App from "./App.vue";

import './assets/css/common.css'
import './assets/css/layout_top.css'
import './assets/css/style.css'

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
