<template>
<!DOCTYPE>
<section id="section_new_post">
    <form >
        <h1 id="h1_new_post">Partager un contenu</h1>
            <label>Titre</label>
            <input id="post_titre" v-model="formData.titre" required="required"/>

            <label>Commentaire</label>
            <textarea id="post_texte" v-model="formData.texte" required="required"></textarea>
            <input type="file" @change="onFileSelected" >
            <button id="newPost-btn" type="submit" @click="createPost">Partager</button>
    </form>
</section>
</template>

<script>
import axios from 'axios';
let user = JSON.parse(localStorage.getItem('user'));
export default {
  name: 'NewPost',
  data() {
      return {
          formData :{
              id_post:'',
              id_user: user.id,
              titre:'',
              texte:'',
              media:''
          }
      }
  },
  methods: {
      onFileSelected(event) {
        this.file = event.target.files[0];
        var reader = new FileReader();
        reader.onloadend = () => {
            // console.log('RESULT', reader.result)
            this.formData.media = reader.result;
        }
        reader.readAsDataURL(this.file);
      },
      createPost(e) {
        console.log()
        axios.post("http://localhost:3000/api/posts/", this.formData,  {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            }
        })
        .then (() => {
        alert("votre post a bien été publié");
        // window.location.href="/";
        })
        e.preventDefault();  
    }
  }
}
</script>

<style scoped>
#section_new_post {
    max-width: 650px;
    background-color: rgb(23, 8, 139);
    margin: 1rem auto;
    height: 100%;
    color: white;
    padding: 1.5rem;
    border-radius: 15px;
}
#h1_new_post {
    color: white;
}
form {
    display: flex;
    flex-direction: column;
}
#newPost-btn{
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    background-color: #0065FC;
    border: none;
    padding: 10px;
    border-radius: 15px 15px 15px 15px;
    color: #fff;
    font-weight: 500;
    font-size: 1.1rem;
    cursor: pointer
}
</style>