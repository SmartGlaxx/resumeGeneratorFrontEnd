<template>
    <main >
      <h1>My Resume</h1>
      <div v-if="isLoggedIn">
        <div v-if="loading">
            LOADING
        </div>
        <div v-else>
      <div class="resume">
        <div class="resume-inner">
        <!-- <li v-for="resume in resumes" :key="resume.id" class="resume">  -->
          <h5 class="name">{{ resume.firstName }} {{ resume.lastName }}</h5>
          <div class="address"><span>{{ resume.email }} </span> | <span> {{resume.phone}}</span> | <span>{{resume.address}}</span></div>
          <div class="details-btn">
            <a :href="`/my-resumes/${resume.id}/edit`" class="edit">Edit</a>
            <!-- <button @click="deleteResume(resumeId)">Delete</button> -->
          </div>
          <section>
            <h5>Personal Summary</h5>
            <p>{{resume.intro}}</p>
          </section>
          <section>
          <h5>Experience</h5>
            <div v-for="experience in resume.experience">
                <div class="date"><em>{{experience.date}}</em></div>
                <div class="title"><strong>{{experience.title}}</strong></div>
                <div class="company"><em>{{experience.company}}</em></div>
                <div class="tasks">{{experience.tasks}}</div><br/>
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
            <div v-for="skill in resume.skills">
              <div>{{skill}}</div>
            </div>
          </section>
        <!-- </li> -->
        </div> 
      </div>
    </div>
    
        
    </div>
      <div v-else>
        <h5>Please  <router-link to="/sign-up">create an account</router-link> or <router-link to="/sign-in">sign in</router-link> to create a resume</h5>
      </div>
    </main>
  </template>
  
  <script>
  import axios from 'axios'
import UserResume from '../services/UserResume';
  
  export default {
    props: {
    resumeId: {
      type: String,
      required: true
    }
  },
    data() {
      return {
        resume: {},
        isLoggedIn: false,
        loading: false,
        userEmail: sessionStorage.getItem('userEmail'),
        deleteMessage: "",
        isDataDeleted: false
      }
    },
    methods:{
        // deleteResume(resumeId) {
        //     if (window.confirm("Are you sure you want to delete this resume?")) {
        //         UserResume.deleteUserResume(resumeId, this.$router)
        //     }
        //     this.isDataDeleted = true
        //     this.$router.push('/my-resumes')
        //     // location.reload()
        // },
    },
   
    mounted() {
        this.loading = true;
        const resume = UserResume.getResume(this.resumeId)
        .then(response =>{
            this.resume = response.data;
            this.loading = false;
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
    }
  }
  </script>
  
<style>
.resume {
    list-style-type: none;
    margin: 4rem;
    padding: 0;
    }
 a{
      text-decoration: none;
      color: #333
  }
 
  section{
    display: inline;
    width: calc(60rem - 8rem);
    margin-top: 0rem;
    padding-top:2rem;
    box-sizing: border-box;
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
    
    .resume-inner {
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
    
    .details-btn a{
      float:right;
      color: #ddd
    }
    .edit{
        border: none;
        padding: 0.4rem;
        border-radius: 0.5rem;
        color: #ddd;
        background: linear-gradient(123deg, rgb(216, 156, 107),rgb(183, 121, 13));
    }
    
   
</style>