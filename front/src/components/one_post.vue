<template>
<!DOCTYPE>
  <section id="section_new_post">
    <h1></h1>
    <div id="one-post-global" >
          <h2 id="one-post-global-title" >{{ this.post.titre }}</h2>
          <div id="one-post-global-text" >{{ this.post.texte}}</div> 
          <img v-if="post.media != null" :src="post.media" alt="image" id="post-global-img"/>
          <p id="one-post-global-text-username"> {{ this.post.username }} </p>
          <button v-if="admin || this.post.id_user == user.id" @click="deleteOnePost()" id="btn_new_post" class="btn_delete" type="submit"> Supprimer </button> 
    </div>
  </section>
</template>

<script>
import axios from 'axios';
let user = JSON.parse(localStorage.getItem('user'));
export default {
  name: 'Posts',
  props: ['id'],
  data() {
    return {
      post: [],
      user: user
    }
  },
  created() {
    this.checkIfadmin ();
    this.getOnePost();
  }, 
  methods: {
      getOnePost (){  
        this.post = this.$route.params.id
        axios.get(`http://localhost:3000/api/posts/${this.post}`,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(res=> {
          this.post = res.data[0];
          }
        )
      },
      deleteOnePost(){ 
        this.post = this.$route.params.id
        axios.delete(`http://localhost:3000/api/posts/${this.post}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user.token
          }
        })
        .then(location.href = "/")
        .then(console.log("test"))
        .catch(error => console.log(error.message))
      },
      checkIfadmin () {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user.isAdmin !== '') {
            this.admin = true;
        }
      }
    }
}
</script>

<style scoped>



#one-post-global-text-username {
  text-align: right;
}
.btn_delete { 
  justify-content: end;
}
</style>