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




#main_logo_login {
    max-width: 40%;
    max-height: 400px;
}
#newPost-btn{
    width: 100px;
    background-color: #0065FC;
    border: none;
    padding: 10px;
    border-radius: 15px 15px 15px 15px;
    color: #fff;
    font-weight: 100;
    font-size: 1.1rem;
    cursor: pointer;
    margin-top: 15px;
}

</style>