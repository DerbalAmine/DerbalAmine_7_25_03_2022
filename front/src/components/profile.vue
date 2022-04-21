<template>
<!DOCTYPE>
<section id="section_new_post">
        <h1>Mon profil</h1>
            <label>Username</label>
            <p id="post_id_user" > {{user.username}} </p>

            <label>Email</label>
            <p id="post_id_user" > {{user.email}} </p>

            <label v-if="admin">administrateur</label>
            <p id="post_id_user" > {{user.is_admin}} </p>

            <button @click="deleteUser()" id="delete-btn" type="submit" >Supprimer mon compte</button>
</section>
</template>

<script>
import axios from 'axios';
let user = JSON.parse(localStorage.getItem('user'));
export default {
  name: 'Posts',
  data() {
    return {
      posts: [],
      user : user
    }
  },
  methods : {
      deleteUser() {
          const userId = user.id;
          console.log(user);
          console.log(userId);
          console.log(user.id);
          console.log(`http://localhost:3000/api/auth/${user.id}`)
          axios.delete(`http://localhost:3000/api/auth/${user.id}`,
          {
              headers: {
              'Content-Type': 'application/json',
            }
          })
        .then(localStorage.removeItem('user'))
        .then(location.href = "/login")
        .catch(err => console.log(err.message))   
      },
      checkIfadmin () {
            let user = JSON.parse(localStorage.getItem('user'));
            if (user.is_admin !== '') {
                this.admin = true;
                console.log("administrateur");
            }
        }
  }
}
</script>

<style scoped>

form {
    display: flex;
    flex-direction: column;
}
#post_id_user {
  padding: 0.5rem;
}

</style>