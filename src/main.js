import Vue from 'vue'
import VueFire from 'vuefire'
import VueRouter from 'vue-router'
import App from './App.vue'
import User from './components/User.vue'
<<<<<<< HEAD
import Authentication from './components/Authentication.vue'

import PersonalCal from './components/Personal_Calendar.vue'
import PersonalSched from './components/Personal_Schedule.vue'
import Schedule from './components/Schedule_Builder.vue'
import Team from './components/Team_Calendar.vue'

=======
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import PersonalCal from './components/Personal_Calendar.vue'
import PersonalSched from './components/Personal_Schedule.vue'
import Schedule from './components/Schedule_Builder.vue'
import Team from './components/Team_Calendar.vue'

>>>>>>> 68eef6ddc28b4ec10a645cca45ad0790693b0cdb
Vue.use(VueFire);
Vue.use(VueRouter);

const routes = [
<<<<<<< HEAD
    { path: '/authentication', component: Authentication },

=======
    { path: '/login', component: Login },
    { path: '/register', component: Register },
>>>>>>> 68eef6ddc28b4ec10a645cca45ad0790693b0cdb
    { path: '/user', component: User },
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