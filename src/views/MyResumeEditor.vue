<template>
    <main>
      <h2>Update Resume</h2>
      <div v-if="isLoggedIn">
        <div v-if="resumeIsLoaded">
      <form >
        <table>
            <tr>
                <td><h4>Personal Information</h4></td>
            </tr>
            <tr>
                <!-- <td>
                    <label for="full-name">First Name:</label>
                </td> -->
                <td>
                    <input type="text" id="full-name" 
                    v-model="resume.firstName" required placeholder="firstName"><br><br>
                </td>
            </tr>
            <tr>
                <!-- <td>
                    <label for="full-name">Last Name:</label>
                </td> -->
                <td>
                    <input type="text" id="full-name" 
                    v-model="resume.lastName" required placeholder="Lastname"><br><br>
                </td>
            </tr>
            <tr>
                <!-- <td>
                    <label for="email">Email:</label>
                </td> -->
                <td>
                    <input type="email" id="email" name="email" 
                    v-model="userEmail" required placeholder=userEmail disabled><br><br>
                </td>
            </tr>
            <tr>
                <!-- <td>
                    <label for="phone">Phone:</label>
                </td> -->
                <td>
                    <input type="tel" id="phone" name="phone"
                    v-model="resume.phone" required placeholder="778 1234 567"><br><br>
                </td>
            </tr>
            <tr>
                <td><h4>Education</h4></td>
            </tr>
            <tr><div v-for="(experience, index) in this.experiences" :key="index">
                <tr><td><input type="text" v-model="experience.title" placeholder="Title" /></td></tr>
                <tr><td><input type="text" v-model="experience.company" placeholder="Company" /></td></tr>
                <tr><td><input type="text" v-model="experience.date" placeholder="Date" /></td></tr>
                <tr><td><textarea v-model="experience.tasks" placeholder="Task description" rows="4" cols="50"></textarea></td></tr>
                <tr><td><button @click.prevent="removeExperience(index)">Remove</button></td></tr>
              </div>
              <tr><td><button @click.prevent="addExperience">Add Experience</button></td></tr>
              </tr>   
              <tr><div v-for="(education, index) in this.educations" :key="index">
                <tr><td><input type="text" v-model="education.school" placeholder="School" /></td></tr>
                <tr><td><input type="text" v-model="education.date" placeholder="Date" /></td></tr>
                <tr><td><input type="text" v-model="education.course" placeholder="Field of Study" /></td></tr>
                <tr><td><button @click.prevent="removeEducation(index)">Remove</button></td></tr>
              </div>
              <tr><td><button @click.prevent="addEducation">Add Education</button></td></tr>
              </tr>
              <!-- <button type="submit" @click.prevent="submitResume">Create Resume</button> -->
            
            
            <tr>
                <td><h4>Skills</h4></td>
            </tr>
            <tr>
                <label for="skill">Add skill:</label>
                <input type="text" id="skill" v-model="newSkill">
                <button @click.prevent="addSkill">Add</button>
                <ul>
                    <li v-for="skill in this.skills" :key="skill">
                      {{ skill }}
                      <button @click="removeSkill(skill)">X</button>
                    </li>
                  </ul>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <button type="submit" @click.prevent="updateResume">UPDATE RESUME</button>
                    </td>
                </tr>
        </table>
      </form>
      </div>
    </div>
      <div v-else>
        <h4>Please  <router-link to="/sign-up">create an account</router-link> or <router-link to="/sign-in">sign in</router-link> to create a resume</h4>
      </div>
    </main>
  </template>
  

  
  <script>
  import UserResume from "../services/UserResume"
  
  export default {
    props: {
    resumeId: {
      type: String,
      required: true
    }
  },
    data() {
      return {
        resume: null,
        experiences: [{ title: '', company: '', date: '', description: '' }],
        educations: [{ school: '', date: '', field: '' }],
        skills : [],
        userId : "1",
        firstName : "",
        lastName : "",
        email : "",
        address : " ",
        phone : " ",
        intro : "",
        experience : "",
        education : "",
        newSkill: "",
        isLoggedIn: false,
        userEmail: sessionStorage.getItem('userEmail')
      }
    },
    computed: {
      resumeIsLoaded() {
        return this.resume !== null;
      },
    },
    methods:{
        addExperience() {
        this.experiences.push({ title: '', company: '', date: '', description: '' })
        },
        removeExperience(index) {
        this.experiences.splice(index, 1)
        },
        addEducation() {
        this.educations.push({ school: '', date: '', field: '' })
        },
        removeEducation(index) {
        this.educations.splice(index, 1)
        },
        addSkill() {
            this.skills.push(this.newSkill);
            this.newSkill = "";
        },
        removeSkill(skill) {
        const index = this.skills.indexOf(skill);
        if (index !== -1) {
            this.skills.splice(index, 1);
        }
        },

        updateResume(){        
            UserResume.updateUserResume(this.resumeId, this.userId, this.firstName, this.lastName, this.userEmail, 
            this.address, this.phone, this.intro, this.experiences, this.educations, this.skills)
        }
    },
    mounted() {
        UserResume.getResume(this.resumeId)
        .then(response =>{
            this.resume = response.data
            this.firstName = response.data.firstName
            this.lastName = response.data.lastName
            this.address = response.data.address
            this.phone = response.data.phone
            this.intro = response.data.intro
            this.educations = response.data.education
            this.experiences = response.data.experience
            this.skills = response.data.skills
          })
        .catch(error => {
          console.error(error)
        })
      
    },
    created(){
        if (sessionStorage.getItem('userEmail')) {
        this.isLoggedIn = true;
        this.userEmail = sessionStorage.getItem('userEmail');
        
    
      }
    }
  };
  </script>
  

  <style scoped>
  main{
    padding: 2rem 4rem;
    height: auto;
    padding-bottom: 5rem;
  }
  input{
    background: none;
    color: #ddd;
    padding: 0.5rem 1rem;
    box-sizing: content-box;
    border-radius: 0.6rem;
    font-size: 1.2rem
  }
  input[type="submit"]{
   float: right;
   font-size: 1rem;
  }
  h4{
    margin-top: 2rem
  }
  </style>
  

 