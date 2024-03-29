import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/reset.scss'
import './style/style.scss'

import i18n from './i18n/index'

import 'swiper/dist/css/swiper.min.css'
import 'swiper/dist/js/swiper.min'

import api from "./api/api";
Vue.prototype.$api = api;

import common from "./utils/common";
Vue.prototype.$common = common;

import Proup from '@/components/proup.vue'
Vue.component('Proup', Proup);

import NoData from '@/components/nodata.vue'
Vue.component('NoData', NoData);

import CardInfo from '@/components/cardinfo.vue'
Vue.component('CardInfo', CardInfo);

import BtnLoading from './components/btnloading.vue'
Vue.component('BtnLoading', BtnLoading)
// @ts-ignore
import countTo from 'vue-count-to';
Vue.component('countTo', countTo);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
