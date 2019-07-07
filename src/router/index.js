import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:'history',
  linkActiveClass:'is-active',
  routes: [
    {
      path: '/instalmentPurchase/',
      component: ()=>import('@/page/index')
    },
    {
      path: '/',
      component: ()=>import('@/page/demo')
    },
    // {
    //   path:'/home',
    //   component:()=>import('@/page/home'),
    //   children:[
    //     {
    //       path:'/sysMgr/weappAdPageMgr',
    //       component:()=>import('@/page/sysMgr/weappAdPageMgr')
    //     },
    //   ]
    // }
  ]
})
