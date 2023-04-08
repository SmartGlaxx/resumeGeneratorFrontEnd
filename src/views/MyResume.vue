<template>
  <main >
    <h2>My Resume</h2>
    <div v-if="isLoggedIn">
      <div v-if="loading">
      </div>
      <div v-else>
    <div class="resume">
      <div class="resume-inner" ref="sectionToDownload" >
        <h5 class="name">{{ resume.firstName }} {{ resume.lastName }}</h5>
        <div class="address"><span>{{ resume.email }} </span> | <span> {{resume.phone}}</span> | <span>{{resume.address}}</span></div>
        <div class="details-btn">
          <a :href="`/my-resumes/${resume.id}/edit`" class="edit">Edit</a>
          <button @click="downloadPDF($refs.sectionToDownload)" class="download">Download as PDF</button>
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
              <div class="company">Compnay: <em>{{experience.company}}</em></div>
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
import html2pdf from 'html2pdf.js'

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
    downloadPDF(sectionElement) {
        const options = {
        margin: [0, 0, 0, 0],
        filename: 'MyResume.pdf',
        image: { type: 'pdf', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: {
        unit: 'px',
        format: [1350, 960],
        orientation: 'portrait'
        }
    }
      
      html2pdf()
        .from(sectionElement)
        .set(options)
        .save()
    }
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

<style scoped>
main{
  margin-top: 4rem;
  padding-top: 1rem;
  min-height: calc(100vh - 5rem);
}

.resume {
  list-style-type: none;
  margin: 0 4rem;
  padding: 0;
  }
h2{
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
ul {
  margin: 0;
}
li{
  margin: 0;
  padding: 0;
  margin-bottom: 0;
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
      background: linear-gradient(123deg, rgb(183, 101, 29),rgb(152, 49, 49));
  }
  .download{
    float: left;
    border: none;
    padding: 0.4rem;
    border-radius: 0.5rem;
    color: #ddd;
    background: linear-gradient(123deg, rgb(64, 93, 101),rgb(45, 84, 96));
  }
 
</style>