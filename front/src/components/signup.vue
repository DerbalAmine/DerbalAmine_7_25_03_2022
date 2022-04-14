<template>
<!DOCTYPE>
<section id="section_new_post">
    <form @submit="createUser">
        <h1>Inscription</h1>
            <label>Username</label>
            <input id="post_id_user" v-model="formData.username"/>

            <label>Email</label>
            <input id="post_id" v-model="formData.email"/>

            <label>Mot de passe</label>
            <input id="post_texte" v-model="formData.password" type="password">
            
            <button id="newPost-btn" type="submit">M'inscrire</button>
            
    </form>
</section>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Signup',
  data() {
      return {
          formData :{
              id:'',
              username:'',
              email:'',
              password:''
          }
      }
  },
  methods: {
      createUser(e) {
        axios.post("http://localhost:3001/api/auth/signup/",this.formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then ((res) => {
        window.location.href = '/login';
        console.log(res);
        })
        .catch((error) => {
                    if (error.response.status === 401) {
                        this.message = "Email non disponible.";
                        console.log("email non dispo");
                        alert("email non disponible. Veuillez choisir une autre adresse.")
                    }  
                    else if (error.response.status === 400) {
                        this.message = "Le mot de passe n'est pas assez fort: maj, min, chiffres.";
                        console.log("Le mot de passe n'est pas assez fort: maj, min, chiffres.");
                        alert("Le mot de passe n'est pas assez fort: maj, min, chiffres.")
                    }  
                });
        console.warn(this.formData)
        e.preventDefault();
      }
  }
}
</script>

<style scoped>


section {
    background-color:white;
    max-width: 650px;
    margin: 0 auto;
    height: 100%;
    color: white;
    padding: 1.5rem;
    border-radius: 15px;
}
form {
    display: flex;
    flex-direction: column;
}
</style>