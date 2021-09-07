import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/user/login'
import Home from '@/components/Home'
import register from '@/components/user/register'
import input from '@/components/input'
import provincelist from '@/components/province/provincelist'
import addprovince from '@/components/province/addprovince'
import viewspotlist from '@/components/viewspot/viewspotlist'
import addviewspot from '@/components/viewspot/addviewspot'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/input/login' },
    {path: '/input', name:'input', component: input,
      children: [
      { path: 'login',name:'login',  component: login },
      { path: 'register',name:'register',  component: register }
    ]},
    { path: '/home', redirect:'/home/provincelist'},
    { path: '/home',name:'home',  component: Home,
      children: [
      { path: 'provincelist',name:'provincelist',  component: provincelist },
      { path: 'addprovince',name:'addprovince',  component: addprovince },
      { path: 'viewspotlist',name:'viewspotlist',  component: viewspotlist },
      { path: 'addviewspot',name:'addviewspot',  component: addviewspot }
    ]},
  ]
})
