import Vue from 'vue'
import VueFire from 'vuefire'
import VueRouter from 'vue-router'
import App from './App.vue'
import Register from './components/Register.vue'
import PersonalCal from './components/Personal_Calendar.vue'
import PersonalSched from './components/Personal_Schedule.vue'
import Schedule from './components/Schedule_Builder.vue'
import Team from './components/Team_Calendar.vue'

Vue.use(VueFire);
Vue.use(VueRouter);

const routes = [
    { path: '/register', component: Register },
    { path: '/personalcal', component: PersonalCal },
    { path: '/personalsched', component: PersonalSched },
    { path: '/schedule', component: Schedule },
    { path: '/team', component: Team }
];

const router = new VueRouter({
    routes
});

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});