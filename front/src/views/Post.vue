<template>
  <Login v-if="!connected"/>

  <Header v-if="connected "/>
  <Posts v-if="connected" />
</template>

<script>
import Login from '../components/login.vue'
import Posts from '../components/posts.vue'
import Header from '../components/header.vue'
export default {
  name: 'Post',
  components: {
    Login,
    Header,
    Posts,
  },
  data () {
    return {
      connected: true
    };
  },
  created() {
    this.checkIfConnected();
  },
  methods: {
    checkIfConnected () {
      if (localStorage.user !== undefined){
        this.connected = true;
      }
      else if(localStorage.user == undefined) {
        this.connected = false;
      }
    }
  }
}
</script>