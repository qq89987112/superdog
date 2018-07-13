// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import "./js"
import "./assets"
import router from "./views"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

window.fixOrgNames = [
  '重庆好尚嘉贸易有限公司',
  '开州区洲发建材经营部',
  '铜梁区冉宏电器门市部',
  '永川区家电市场劲风电器经营部',
  '佛山慧聪家电测试20170324'
];

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
