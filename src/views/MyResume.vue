<template>
    <main >
      <h1>My Resume</h1>
      <div v-if="isLoggedIn">
      <div class="resume">
        <div class="resume-inner">
        <!-- <li v-for="resume in resumes" :key="resume.id" class="resume">  -->
          <h4 class="name">{{ resume.firstName }} {{ resume.lastName }}</h4>
          <div class="address"><span>{{ resume.email }} </span> | <span> {{resume.phone}}</span> | <span>{{resume.address}}</span></div>
          <div class="details-btn">
            <a :href="`/my-resumes/${resume.id}/edit`">Edit</a>
            <button @click="deleteResume">Delete</button>
          </div>
          <section>
            <h6>Personal Summary {{ resumeId }}</h6>
            <p>{{resume.intro}}</p>
          </section>
          <section>
          <h6>Experience</h6>
            <div v-for="experience in resume.experience">
                <div class="date">{{experience.date}}</div>
                <div class="title">{{experience.title}}</div>
                <div class="company">{{experience.company}}</div>
                <div class="tasks">{{experience.tasks}}</div>
            </div>
          </section>
        <section>
          <div>Education</div>
            <div v-for="education in resume.education">
                <div>{{education.school}}</div>
                <div>{{education.date}}</div>
                <div>{{education.course}}</div>
            </div>
          </section>
          <div v-for="skill in resume.skills">
            <div>{{skill}}</div>
          </div>
        <!-- </li> -->
        </div> 
      </div>
    </div>
      <div v-else>
        <h4>Please  <router-link to="/sign-up">create an account</router-link> or <router-link to="/sign-in">sign in</router-link> to create a resume</h4>
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
        userEmail: sessionStorage.getItem('userEmail'),
        deleteMessage: ""
      }
    },
    methods:{
        deleteResume(resumeId) {
        if (window.confirm("Are you sure you want to delete this resume?")) {
            UserResume.deleteUserResume(this.resumeId)
            .then(response =>{
                this.deleteMessage = response.data
            })
            .catch(error =>{
                console.log("Error")
            })
        }
        },
    },
    mounted() {
        const resume = UserResume.getResume(this.resumeId)
        .then(response =>{
            this.resume = response.data
            console.error("resume" + resume)
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
    margin: 2rem;
    width: calc(60rem - 8rem);
   
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
    }
    .date{
      float: right;
    }
    .details-btn a{
      float:right;
      color: red
    }
   
</style>