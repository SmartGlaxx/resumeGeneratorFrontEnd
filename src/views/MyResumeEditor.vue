<template>
    <main>
      <h2>Update Resume</h2>
      <div v-if="isLoggedIn">
        <div v-if="resumeIsLoaded">
      <form >
        <table>
            <tr>
                <td><h5>Personal Information</h5></td>
            </tr>
            <tr>
                <td>
                    <input type="text" v-model="this.firstName" required placeholder="FirstName"><br><br>
                </td>
                <td>
                    <input type="text" v-model="this.lastName" required placeholder="Lastname"><br><br>
                </td>
            </tr>
            <tr>
                <td>
                    <input type="email" v-model="userEmail" required placeholder=userEmail disabled><br><br>
                </td>
                <td>
                    <input type="tel" v-model="this.phone" required placeholder="778 1234 567"><br><br>
                </td>
            </tr>
            <tr>
              <td>
                  <input type="text" v-model="this.address" required placeholder="Address"><br><br>
              </td>
              <td>
                  <textarea v-model="this.intro" placeholder="Personal Summary" rows="4" cols="35"></textarea>
               </td>
            </tr>
            <tr>
                <td><h5>Work Experience</h5></td>
            </tr>
            <div  v-for="(experience, index) in this.experiences" :key="index">
              <td><input type="text" v-model="experience.title" placeholder="Title" /></td><br/>
              <td><input type="text" v-model="experience.company" placeholder="Company" /></td><br/>
              <td><input type="text" v-model="experience.date" placeholder="Date" /></td><br/>
              <td><textarea v-model="experience.tasks" placeholder="Task description" rows="4" cols="35"></textarea></td><br/>
              <td><button @click.prevent="removeExperience(index)">Remove Experience</button></td>
              <td><button @click.prevent="addExperience">Add Experience</button></td>  
          </div> 

            <!-- <tr> -->
              <!-- <div v-for="(experience, index) in this.experiences" :key="index">
                <tr><td><input type="text" v-model="experience.title" placeholder="Title" /></td></tr>
                <tr><td><input type="text" v-model="experience.company" placeholder="Company" /></td></tr>
                <tr><td><input type="text" v-model="experience.date" placeholder="Date" /></td></tr>
                <tr><td><textarea v-model="experience.tasks" placeholder="Task description" rows="4" cols="50"></textarea></td></tr>
                <tr><td><button @click.prevent="removeExperience(index)">Remove</button></td></tr>
              </div>
              <tr><td><button @click.prevent="addExperience">Add Experience</button></td></tr> -->
              <!-- </tr>    -->
              <!-- <tr> -->
                <!-- <div v-for="(education, index) in this.educations" :key="index">
                <tr><td><input type="text" v-model="education.school" placeholder="School" /></td></tr>
                <tr><td><input type="text" v-model="education.date" placeholder="Date" /></td></tr>
                <tr><td><input type="text" v-model="education.course" placeholder="Field of Study" /></td></tr>
                <tr><td><button @click.prevent="removeEducation(index)">Remove</button></td></tr>
              </div>
              <tr><td><button @click.prevent="addEducation">Add Education</button></td></tr> -->
              <tr>
                <td><h5>Education</h5></td>
            </tr>
              <div  v-for="(education, index) in this.educations" :key="index">
                <td><input type="text" v-model="education.school" placeholder="School" /></td><br/>
                <td><input type="text" v-model="education.date" placeholder="Date" /></td><br/>
                <td><input type="text" v-model="education.course" placeholder="Course" /></td><br/>
                <td><button @click.prevent="removeEducation(index)">Remove Education</button></td>
                <td><button @click.prevent="addEducation">Add Education</button></td>  
            </div> 
              <!-- </tr> -->
              <!-- <button type="submit" @click.prevent="submitResume">Create Resume</button> -->
            
            
            <tr>
                <td><h5>Skills</h5></td>
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
    margin-top: 4rem;
    padding: 2rem 4rem;
    height: auto;
    padding-bottom: 5rem;
  }
  input{
    width: 20rem;
    background: none;
    color: #ddd;
    margin: 0.5rem 0;
    padding: 0.5rem 1rem;
    box-sizing: content-box;
    border-radius: 0.6rem;
    font-size: 1.2rem
  }
  button[type="submit"]{
    margin-top: 2rem;
    background: linear-gradient(123deg, rgb(189, 115, 42),rgb(219, 70, 40));
  }
  textarea{
    background: none;
    color: #ddd;
    margin: 0.5rem 0;
    padding: 0.5rem 1rem;
    box-sizing: content-box;
    border-radius: 0.6rem;
    font-size: 1.2rem
  }
  h5{
    margin-top: 2rem
  }
  button{
    padding: 0.4rem;
    border-radius: 0.5rem;
    color: #ddd;
    background: linear-gradient(123deg, rgb(64, 93, 101),rgb(45, 84, 96));
  }
  </style>
  

 