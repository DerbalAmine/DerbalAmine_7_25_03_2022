<template>
  <Login v-if="!connected"/>
  <Header v-if="connected"/>
  <NewPost v-if="connected"/>
</template>

<script>
import Login from '../components/login.vue'
import Header from '../components/header.vue'
import NewPost from '../components/new_post.vue'
export default {
  name: 'Post',
  components: {
    Login,
    Header,
    NewPost
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