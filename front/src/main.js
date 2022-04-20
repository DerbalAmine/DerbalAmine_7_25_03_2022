import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')


//**Global Variables**
//ApiUrl
Vue.prototype.$apiUrl = 'http://localhost:3000/api';
//User / Token
if (localStorage.user != undefined) {
  Vue.prototype.$token = JSON.parse(localStorage.user).token;
  Vue.prototype.$userid = JSON.parse(localStorage.user);
}