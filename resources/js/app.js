
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import moment from 'moment'
import { Form, HasError, AlertError } from 'vform'
import VueProgressBar from 'vue-progressbar'
import swal from 'sweetalert2'

window.Form = Form

window.swal = swal

let toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  })

window.toast = toast


Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

import VueRouter from 'vue-router'

Vue.use(VueRouter)



let routes = [
    { path: '/dashboard', component: require('./components/Dashboard.vue') },
    { path: '/users', component: require('./components/Users.vue') },
    { path: '/profile', component: require('./components/Profile.vue') }
  ]


let router = new VueRouter({
    mode: 'history',
    routes

})



Vue.filter('capText', (text)=> {
   return text.charAt(0).toUpperCase() + text.slice(1); 
})

Vue.filter('prettyDate', (prettyDate)=> {
    return moment(prettyDate).format('MMMM Do YYYY, h:mm:ss a');
})

Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '4px'
  })


//   sending request to refresh user list after created


window.Shoot = new Vue()

Vue.component('example-component', require('./components/ExampleComponent.vue'));

const app = new Vue({
    el: '#app',
    router
});
