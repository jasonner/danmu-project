import Vue from 'vue'
import Router from 'vue-router'
import index from "@/view/index.vue";
import sedMsg from "@/view/sedMsg.vue";
Vue.use(Router)
export const constantRouterMap =[
    {
        path:'/',
        name:'首页',
        redirect:'/index',
        menuShow:false
    },
    {
        path:'/index',
        name:'首页',
        component: index,
        menuShow:false
    },
    {
        path:'/sedMsg',
        name:'发送弹幕',
        component: sedMsg,
        menuShow:false
    },
    {
        path: "*",
        redirect: "/index"
    }
]

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
 
export default new Router({
    routes: constantRouterMap
})