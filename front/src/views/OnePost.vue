<template>
  <Login v-if="!connected"/>

  <Header v-if="connected"/>
  <OnePost v-if="connected"/>
  <Comments v-if="connected"/>
</template>

<script>
import Login from '../components/login.vue'
import Header from '../components/header.vue'
import OnePost from '../components/one_post.vue'
import Comments from '../components/comments.vue'
export default {
  name: 'Post',
  components: {
    Login,
    Header,
    OnePost,
    Comments
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