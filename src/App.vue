<script setup>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import { RouterLink, RouterView } from 'vue-router'
import { useAppStore } from "./stores/appStore.js"

const handleStore = useAppStore()

</script>

<template>
  <main>
  <header>
    <div class="desktop-nav" v-if="showHeader">
      <ul >
        <li class="title1" style="font-size:2rem"><RouterLink to="/" class="link">Resume Generator</RouterLink></li>
        <div class="auth-btn" v-if="isLoggedIn">
          <li><RouterLink to="/create-resume" class="link">Create Resume</RouterLink></li>
          <li><RouterLink to="/my-resumes" class="link">My Resumes</RouterLink></li>
        </div>
        <li><RouterLink to="/faq" class="link">FAQ</RouterLink></li>
        <li><RouterLink to="/contact" class="link">Contact Us</RouterLink></li>
      </ul>
      <div class="auth-btn" v-if="isRecruiterLoggedIn">
        <li><RouterLink to="/search-resumes" class="link">Search Resumes</RouterLink></li>
      </div>
      <div class="auth-btn" v-if="isLoggedIn || isRecruiterLoggedIn">
          <li class="link" @click="signout">Sign out</li>
      </div>
      <div class="auth-btn" v-else>
        <li><RouterLink to="/sign-up" class="link">Sign up</RouterLink></li>
        <li><RouterLink to="/sign-in" class="link">Sign in</RouterLink></li>
    </div>
    </div>
    <div v-else>
      
    </div>
    <div class="mobile-nav">
      <div class="title2">Resume Generator</div>
      <button v-if="!handleStore.menubar" class="menu-btn" @click="handleStore.setMenubar">
        <font-awesome-icon icon="fa-solid fa-bars" style="font-size:2rem" />
      </button>
      <ul v-if="handleStore.menubar">
        <button class="menu-btn" @click="handleStore.setMenubar">
          <font-awesome-icon icon="fa-solid fa-xmark" style="font-size:2rem" />
        </button>
        <li><RouterLink to="/" class="link">Home</RouterLink></li>
        <li><RouterLink to="/create-resume" class="link">Create Resume</RouterLink></li>
        <li><RouterLink to="/samples" class="link">Resume Samples</RouterLink></li>
        <li><RouterLink to="/faq" class="link">FAQ</RouterLink></li>
        <li><RouterLink to="/contact" class="link">Contact Us</RouterLink></li>
      </ul>
    </div>
  </header>
  <RouterView />
</main>
</template>

<script>
import axios from 'axios'
export default{
  data(){
    return{
      isLoggedIn: sessionStorage.getItem("isLoggedIn"),
      isRecruiterLoggedIn :  sessionStorage.getItem("isRecruiterLoggedIn"),
    } 
  },
  methods: {
    signout(){
      // axios.post("http://localhost:8080/api/users/logoutuser")
      // .then(response => {
      //   if (response.status == 200) {
          sessionStorage.removeItem('userEmail');
          sessionStorage.removeItem('isLoggedIn');
          sessionStorage.removeItem('recruiterEmail');
          sessionStorage.removeItem('isRecruiterLoggedIn');
          this.isLoggedIn = false
          this.isRecruiterLoggedIn = false
          window.location.reload()
      //   }
      // })
    },  
    reloadPage(){
        this.isLoggedIn = sessionStorage.getItem("isLoggedIn")
        this.isRecruiterLoggedIn = sessionStorage.getItem("isRecruiterLoggedIn")
      }
  },
  mounted(){
      // this.reloadPage()
      
    if (sessionStorage.getItem('hasReloaded') === null) {
      sessionStorage.setItem('hasReloaded', 'true');
      location.reload();
    } else {
      sessionStorage.removeItem('hasReloaded');
    }
  
  },
  computed: {
    showHeader() {
      const currentRoute = this.$route
      return currentRoute.meta.showHeader
    }
  }
}
</script>

<style scoped>
main{
  width: 100%;
  padding: 0;
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  color: #ddd;
}

.desktop-nav{
  display: none;
}
.mobile-nav{
  display: flex;
  height: 6rem;
  background: black;
  height: auto;
  align-items: center;
  justify-content: space-between;
}
.desktop-nav ul{
  text-decoration: none;
  display: flex;
  align-items: center;
  margin: auto 0;
  
}
.mobile-nav li{
  list-style-type: none;
  margin: 0 1rem;
  padding: 1rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  
}
.mobile-nav li:hover{
  color: #203a43;
}
.menu-btn{
  position: absolute;
  right: 1rem;
  top: 1.5rem;
  z-index: 2;
  padding: 0.2rem;
  width: 3rem;
  border-radius: 0.4rem;
  box-sizing: border-box;
  color: #444
}
.title2{
  list-style-type: none;
  margin: 0 1rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  color: #ddd;
  font-size: 2rem;
  cursor: pointer;
}

@media screen and (min-width: 1000px){
main{
  width: 100%;
  padding:0;
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364); 
  color: #fafae4;
}
.desktop-nav{
  top:0;
  position: fixed;
  z-index: 10;
  width: 100vw;
  height: auto;
  background: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.desktop-nav ul{
  text-decoration: none;
  display: flex;
  align-items: center;
  margin: auto 0;
  justify-content: flex-start;
}
.desktop-nav li{
  list-style-type: none;
  margin: 0 1rem;
  padding: 1rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.desktop-nav li:hover{
  color: #203a43;
}
.link{
  color: #ddd;
  text-decoration: none;

}
.link:hover{
  color: #203a43;
}
.auth-btn {
  margin-right: 4rem;
  display: flex;
}
.auth-btn button{
  background: #203a43;
  color:#ddd;
  padding: 0.5rem 1.5rem
}
.title1{
  list-style-type: none;
  margin: 0 1rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  color: #ddd;
  font-size: 2rem;
  cursor: pointer;
 
}

.mobile-nav{
  display: none;
}
}
</style>
