import Vue from 'vue'
import Router from 'vue-router'
const Index_D3_Vuex =()=> ({component: import('@/components/Index_D3_Vuex.vue')})
const Search_GeoJSON =()=> ({component: import('@/components/Search_GeoJSON.vue')})
const XYZ_Title =()=> ({component: import('@/components/XYZ_Title.vue')})
const Map_Interactions =()=>({component:import('@/components/Map_Interactions.vue')})
Vue.use(Router)

export default new Router({
  linkActiveClass:'active',
  routes: [
    {
      path: '/index',
      component: Index_D3_Vuex
    },
    {
      path: '/serch',
      component: Search_GeoJSON
    },
    {
      path: '/map',
      component: Map_Interactions
    },
    {
      path: '/xyz',
      component: XYZ_Title
    },
    {
      path: '',
      redirect:'/index'
    },
  ]
})
