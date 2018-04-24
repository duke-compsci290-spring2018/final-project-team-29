import Vue from 'vue'
import VueFire from 'vuefire'
import VueRouter from 'vue-router'
import App from './App.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Personal from './components/Personal_Calendar.vue'
import Schedule from './components/Schedule_Builder.vue'
import Team from './components/Team_Calendar.vue'

Vue.use(VueFire)
Vue.use(VueRouter)

const links = [
    { path: '/', component: App },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/personal', component: Personal },
    { path: '/schedule', component: Schedule },
    { path: '/team', component: Team }
]

const router = new VueRouter({
    links
})

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})