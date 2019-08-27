// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import DateFilter from './filters/date'
import * as firebase from 'firebase'
import AlertCmp from './components/Shared/Alert.vue'

Vue.use(Vuetify, {

theme: {
  primary: "#F4511E",
  secondary: "#5E35B1",
  accent: "#1A237E",
  error: "#f44336",
  warning: "#ffeb3b",
  info: "#2196f3",
  success: "#1B5E20",
  green:"#00cc00"
}
})


Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',

  created (){ //the created life cycle hook - runs code when root view is instantiated 
      firebase.initializeApp({
        apiKey: 'AIzaSyDqIAbEejcGUU9sy6Sm7KhPVZc6F08g3Qg',
        authDomain: 'work-app-7e8c4.firebaseapp.com',
        databaseURL: 'https://work-app-7e8c4.firebaseio.com',
        projectId: 'work-app-7e8c4',
        storageBucket: 'gs://work-app-7e8c4.appspot.com',
      })
      firebase.auth().onAuthStateChanged((user) => { //Listener triggers when auth state changes
        if(user) {
          //If user login token exists, sign user in when they go to sign in page
          this.$store.dispatch('autoSignIn', user)
          this.$store.dispatch('fetchUserData') //get user profile data for loadedDays
        }
      })
  }
})
