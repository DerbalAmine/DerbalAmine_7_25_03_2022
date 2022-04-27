<template>
    <section id="section_new_post">
        <h1>Commentaires</h1>
        <form id="container_new_comment" @submit="sendComment()">     
            <textarea id="container_new_comment_textarea" v-model="formData.texte" type="text" placeholder="Laisser un commentaire..." required></textarea>
            <button type="submit" id="container_new_comment_btn" >valider mon commentaire </button>
        </form>
        <div id="container_comments" v-for="comment in comments.slice().reverse()" :key="comment.id">
            <p id="container_comments_username"> {{comment.username}}</p>
            <div id="container_comments_text_btn">
              <p id="container_comments_text"> {{comment.texte}} </p>
              <button  v-if="admin || comment.id_user == user.id" id="container_comments_btn" @click="deleteComment(comment.id)">Supprimer</button>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
let user = JSON.parse(localStorage.getItem('user'));
export default {
  name: 'Comment',
  data() {
      return {
          comments: [],
          formData :{
              id:'',
              id_user: user.id,
              texte:''
          },
          user : user
      }
  },
  created() {
    this.getAllComments();
    this.checkIfadmin ();
  }, 
  methods: {
      sendComment(e) {
        this.post = this.$route.params.id
        axios.post(`http://localhost:3000/api/posts/`,this.formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then ((res) => {
        console.log(res);
        alert("votre commentaire a bien été publié");
        location.reload();
        })
        console.warn(this.formData);
        e.preventDefault();  
      },
      getAllComments() {
        this.post = this.$route.params.id 
        fetch(`http://localhost:3000/api/posts/${this.post}/comments`)
        .then(res => res.json())
        .then(data => this.comments = data)
        .catch(err => console.log(err.message))
      },
      onFileSelected(event) {
        this.selectedFile = event.target.files[0]
      },
      deleteComment (commentId) {
        console.log(user.token)
        axios.delete(`http://localhost:3000/api/posts/comment/${commentId}`,this.formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            }
        })
        .then (() => {
        alert("votre commentaire a bien été supprimé");
        location.reload();
        })
        commentId.preventDefault(); 
      },
      checkIfadmin () {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user.is_admin !== '') {
            this.admin = true;
        }
      }
  }
}
</script>

<style scoped>


</style>