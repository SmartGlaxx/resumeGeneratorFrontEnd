<template>
<main>
    <div v-if="isRecruiterLoggedIn">
    <input v-model="searchTerm" placeholder="Enter search term">
    <button @click="searchResumes">Search Resumes</button>
    <ul class="resumes">
    <li v-for="resume in resumes" :key="resume.id" class="resume">
        <h5 class="name">{{ resume.firstName }} {{ resume.lastName }}</h5>
        <div class="address"><span>{{ resume.email }} </span> | <span> {{resume.phone}}</span> | <span>{{resume.address}}</span></div>
        <div class="details-btn">
            <a :href="`/my-resumes/${resume.id}`"><button class="view">View Resume</button></a>
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
        </li>
    </ul>
    </div>
    <div v-else>
        <h4>Please  create an account or sign in to search for talents</h4>
      </div>
  </main>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      searchTerm: '',
      resumes: [],
      isRecruiterLoggedIn: false,
      recruiterEmail: sessionStorage.getItem('recruiterEmail'),
    }
  },
  methods: {
    searchResumes() {
      axios.get(`http://localhost:8080/resumes/list?task=${this.searchTerm}`)
      .then(response => {
        this.resumes = response.data
      })
      .catch(error => {
        console.error(error)
      })
    }
  },
  created(){
        if (sessionStorage.getItem('recruiterEmail')) {
            this.isRecruiterLoggedIn = true;
            this.recruiterEmail = sessionStorage.getItem('recruiterEmail')
        }
    },
}
</script>

<style scoped>
main{
    min-height: calc(100vh - 5rem);
    margin-top: 4rem;
    padding-top: 1rem;
}
.resumes {
    list-style-type: none;
    margin: 4rem;
    padding: 0;
    }
  h1{
    margin: 1rem 4rem;
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
  input{
    width: calc(100vw - 30rem);
    background: none;
    color: #ddd;
    margin: 0.5rem 4rem;
    padding: 0.5rem 1rem;
    box-sizing: content-box;
    border-radius: 0.6rem;
    font-size: 1.2rem
  }
  button[type="submit"]{
   margin-top: 2rem;
  }
  button{
    padding: 0.4rem;
    border-radius: 0.5rem;
    color: #ddd;
    background: linear-gradient(123deg, rgb(64, 93, 101),rgb(45, 84, 96));
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
    
</style>