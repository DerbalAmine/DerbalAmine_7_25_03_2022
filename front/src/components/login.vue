<template>
<img src="../assets/logo.png" id="main_logo_login" alt="Logo groupomania"/>
<section id="section_new_post">
    <form @submit="login">
            <label>Email</label>
            <input v-model="formData.email"/>

            <label>password</label>
            <input v-model="formData.password" type="password"/>

            <!-- <router-link to='/' > -->
                <button id="newPost-btn" type="submit">Connexion</button>
            <!-- </router-link> -->
            <div class="error-message">{{message}}</div>
            <router-link to='/signup' id="newPost_container">
                <a  id="header_link">Pas encore inscrit</a>
            </router-link> 
    </form>
</section>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Login',
  data() {
      return {
          formData :{       
              email:'',
              password:'',
          },
      };
  },
  methods: {
      login(e) {
        axios.post("http://localhost:3000/api/login/",this.formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then ((response) => {
        localStorage.setItem('user', JSON.stringify(response.data));
        window.location.href = '/';
        console.log(response);
        })
        .catch((error) => {
                if (error.response.status === 404) {
                    this.message = "Utilisateur inconnu.";
                }
                if (error.response.status === 401) {
                    this.message = "Email ou mot de passe invalide.";
                }
                if (error.response.status === 500) {
                    this.message = "Erreur serveur.";
                }
            });
        console.table(this.formData)
        e.preventDefault();
      }
  }
}
</script>

<style scoped>
#newPost_container {
    text-align: left;
}
#newPost-btn {
    width: 100px;
    background-color: #0065FC;
    border: none;
    padding: 5px;
    border-radius: 15px 15px 15px 15px;
    color: #fff;
    font-weight: 300;
    font-size: 1.1rem;
    cursor: pointer;
    margin-left: 15px;
}
#header_link {
    text-align: left;
    color: white;
}
#main_logo_login {
    max-width: 40%;
    max-height: 400px;
}
</style>