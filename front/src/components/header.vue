<template>
<!DOCTYPE>
<!-- header -->
    <div id="container_header">
        <header>
            <div id="header_logo">
                <a href="#"><img src="../assets/icon-left-font.png" id="main_logo" alt="Logo groupomania" /></a>
            </div>
            <nav id="nav_header">
                <img  v-if="admin" src="../assets/icon-left-font-monochrome-white.png" id="logo_admin" class="header_navbar_menu" alt="Logo administrateur" />
                <!-- v-if="$user.is_admin == 'Y'" -->
                <router-link to='/'>
                    <a class="header_navbar_menu">Accueil</a>
                </router-link>
                <router-link to='/newpost'>
                    <a class="header_navbar_menu">Post</a>
                </router-link>
                <router-link to='/profile'>
                    <a class="header_navbar_menu">Profil</a>
                </router-link>
                <router-link to='/login'>
                    <a class="header_navbar_menu" @click = disconnect()>Déconnexion</a>   
                </router-link>
                
            </nav>
        </header>
    </div>
</template>

<script>

export default {
    name: 'Header',
    created () {
        this.checkIfadmin();
    },
    methods: {
        disconnect () {
            localStorage.removeItem('user');
            location.href = "/login";
        },
        checkIfadmin () {
            let user = JSON.parse(localStorage.getItem('user'));
            if (user.isAdmin !== '') {
                this.admin = true;
                console.log("administrateur");
            }
        }
    }
}
</script>

<style scoped>
header {
    max-width: 650px;
    margin: 0 auto;
    padding: 0 10rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 0.01px solid rgb(126, 125, 125);
}
.header_navbar_menu {
    padding: 5px;
    vertical-align: middle;
}
#nav_header {
    margin-top: auto;
    margin-bottom: auto;
   
}
#main_logo {
    width: 200px;
    height:50px;
    object-fit: cover;
}
#logo_admin {
    width: 40px;
}
</style>