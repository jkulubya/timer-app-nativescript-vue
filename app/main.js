import Vue from 'nativescript-vue'
import VueRouter from 'vue-router'
import App from './components/App.vue'
import Timer from './components/ViewTimer.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/home', component: App },
    { name: 'Timer', path: '/timer', component: Timer }
  ]

const router = new VueRouter({
    pageRouting: true,
    routes
})

router.replace('/home');

new Vue({
    router
}).$start();
