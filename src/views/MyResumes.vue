<template>
  <header>
    <div class="desktop-nav" >
    <ul >
      <li class="title1" style="font-size:2rem"><RouterLink to="/" class="link">Quick Resume</RouterLink></li>
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
</header>
    <main >
      <h2>My Resumes</h2>
      <div v-if="isLoggedIn">
        
        <div v-if="resumes.length">
      <ul class="resumes">
        <li v-for="resume in resumes" :key="resume.id" class="resume">
          <h5 class="name">{{ resume.firstName }} {{ resume.lastName }}</h5>
          <div class="address"><span>{{ resume.email }} </span> | <span> {{resume.phone}}</span> | <span>{{resume.address}}</span></div>
          <div class="details-btn">
            <a :href="`/my-resumes/${resume.id}`"><button class="view">View</button></a>
            <button @click="deleteResume(resume.id)" class="delete">Delete</button>
          </div>
          <section>
            <h5>Personal Summary</h5>
            <p>{{resume.intro}}</p>
          </section>
          <section>
          <h5>Experience</h5>
            <div v-for="experience in resume.experience">
                <div class="date"><em>{{experience.date}}</em></div>
                <div class="title">Position: <strong>{{experience.title}}</strong></div>
                <div class="company">Company: <em>{{experience.company}}</em></div>
                Duties: <br/>
                <ul v-for="task in experience.tasks" class="tasks">
                  <li>{{ task }}</li>
                </ul>
            </div>
          </section>
        <section>
          <h5>Education</h5>
            <div v-for="education in resume.education">
                <div><em>{{education.school}}</em></div>
                <div class="date"><em>{{education.date}}</em></div>
                <div><strong>{{education.course}}</strong></div><br/>
            </div>
          </section>
          <section>
            <h5>Skills</h5>
          <ul v-for="skill in resume.skills">
            <li>{{skill}}</li>
            </ul>
          </section>
        </li>
      </ul>

      </div>
      <div v-else class="no-resumes">
        <h3 >No resumes found</h3>
        <div>If you created resume(s), refresh this page to fetch your resume(s).</div>
      </div>

      </div>
      <div v-else>
        <h5>Please  <router-link to="/sign-up">create an account</router-link> or <router-link to="/sign-in">sign in</router-link> to create a resume</h5>
      </div>
    </main>
  </template>
  
  <script>
import UserResume from '../services/UserResume';
  
  export default {
    data() {
      return {
        resumes: [],
        isLoggedIn: false,
        userEmail: sessionStorage.getItem('userEmail')
      }
    },
    methods:{
      signout(){
            sessionStorage.removeItem('userEmail');
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('recruiterEmail');
            sessionStorage.removeItem('isRecruiterLoggedIn');
            this.isLoggedIn = false
            this.isRecruiterLoggedIn = false
        },
      deleteResume(resumeId) {
            if (window.confirm("Are you sure you want to delete this resume?")) {
                UserResume.deleteUserResume(resumeId, this.$router)
            }
            window.location.reload()
        },
    },
    mounted() {
        UserResume.getResumes()
        .then(response =>{
            this.resumes = response.data
            
        })
        .catch(error => {
          console.error(error)
        })
    },
    created(){
        if (sessionStorage.getItem('userEmail')) {
        this.isLoggedIn = true;
        this.userEmail = sessionStorage.getItem('userEmail')
        }
        
        console.log("Resumes" , this.resumes)
    }
  }
  </script>
  
<style scoped>

main{
  margin-top: 4rem;
  padding-top: 1rem;
  min-height: 100vh;
}
.resumes {
    list-style-type: none;
    padding: 0;
    }
  h2{
    margin: 1rem 0rem;
  }
 a{
      text-decoration: none;
  }
  section{
    display: inline;
    width: calc(60rem - 8rem);
    margin-top: 0rem;
    padding-top:2rem;
    box-sizing: border-box;
  }
  ul {
    margin: 0;
  }
  li{
    margin: 0;
    padding: 0;
    margin-bottom: 0;
  }
    
    .resume {
    width: 60rem;
    height: 84.2rem;
    display: grid;
    flex-wrap: wrap;
    justify-content: space-between;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 2rem;
    font-size: 1rem;
    padding: 2rem;
    color: black;
    background-color: whitesmoke;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    .name{
      width: calc(60rem - 4rem);
      padding: 0.6rem;
      background: #333;
      color: #ccc;
      font-size: 3rem;
      text-align: center;
    }
    .address{
      width: calc(60rem - 4rem);
      text-align: center;
      height: 2rem;
    }
    .date{
      float: right;
      font-style: bold;
    }
    .details-btn{
      height: 1rem;
      
    }
    
    .delete{
      float: right;
      border: none;
      padding: 0.4rem;
      border-radius: 0.5rem;
      color: #ddd;
      background: linear-gradient(123deg, rgb(183, 101, 29),rgb(152, 49, 49));
    }
    .view{
      border: none;
      padding: 0.4rem;
      border-radius: 0.5rem;
      color: #ddd;
      background: linear-gradient(123deg, rgb(64, 93, 101),rgb(45, 84, 96));
    }

.no-resumes{
  text-align: center;
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
    
</style>