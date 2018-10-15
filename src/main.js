// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'ol/css'
import 'normalize.css/normalize.css'
import 'font-awesome/css/font-awesome.css'
import $ from 'jquery'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueI18n from 'vue-i18n'
import store from '@/vuex/store'
import vRegion from 'v-region';
Vue.use(vRegion);
Vue.use(VueAxios,axios)
Vue.use(VueI18n)
Vue.config.productionTip = false


const messages = {
    zh: {
      message: {
        hello: '地图管理系统'
      }
    },
    en: {
      message: {
        hello: 'GIS'
      }
    }
}
const i18n = new VueI18n({
    locale: 'zh', 
    messages
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
