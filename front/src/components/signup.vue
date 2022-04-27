<template>
<!DOCTYPE>
<section id="section_new_post">
    <img src="../assets/icon-left-font.png" id="main_logo_login" alt="Logo groupomania"/>
    <form @submit="createUser">
        <h1>Inscription</h1>
            <label>Username</label>
            <input id="post_id_user" v-model="formData.username"/>

            <label>Email</label>
            <input id="post_id" v-model="formData.email"/>

            <label>Mot de passe</label>
            <input id="post_texte" v-model="formData.password" type="password"><br>
            
            <button id="newPost-btn" type="submit">M'inscrire</button>
            
    </form>
</section>
</template>

<script>
const axios = require ('axios');
export default {
  name: 'Signup',
  data() {
      return {
          formData :{
              id:'',
              username:'',
              email:'',
              password:'',
              isAdmin:'',
              isActif:''
          }
      }
  },
  methods: {
      createUser(e) {
        axios.post("http://localhost:3000/api/signup/",this.formData, {
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
                        console.log("erreur de l'email");
                        alert("email non disponible.")
                    }  
                    else if (error.response.status === 400) {
                        this.message = "vous devez utiliser  maj, min, chiffres.";
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
#main_logo_login {
    max-width: 40%;
    max-height: 400px;
}
label {
    display: flex;
    color: black;
}
</style>