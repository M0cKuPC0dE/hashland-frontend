import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location: any) {
  return (originalPush.call(this, location) as any).catch((err: any) => err);
};
const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home/index.vue')
  },
  {
    path: '/buy',
    name: 'Buy',
    component: () => import('../views/Buy/index.vue')
  },
  {
    path: '/nftmining',
    name: 'NFTmining',
    component: () => import('../views/NFTmining/index.vue')
  },
  {
    path: '/carddetails',
    name: 'CardDetails',
    component: () => import('../views/NFTmining/carddetails.vue')
  },
  {
    path: '/insertcard',
    name: 'InsertCard',
    component: () => import('../views/NFTmining/insertcard.vue')
  },
  {
    path: '/synthesis',
    name: 'Synthesis',
    component: () => import('../views/NFTmining/synthesis.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
