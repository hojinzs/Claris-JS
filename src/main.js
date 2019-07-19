import Vue from 'vue'
import App from './App.vue'
import GIANT from '../static/test.js'

let abc = new GIANT(['steve','lee']);
abc.name = ['michael','kim'];

new Vue({
  el: '#app',
  render: h => h(App)
})
