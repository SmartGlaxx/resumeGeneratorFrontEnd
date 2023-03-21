<template>
    <main>
      <h2>Create Resume</h2>
      <div v-if="isLoggedIn">
      <form>
        <table>
            <tr>
                <td><h5>Personal Information</h5></td>
            </tr>
            <td></td>
            <tr>
                <td>
                    <input type="text" v-model="firstName" required placeholder="Firstname">
                </td>
                <td>
                    <input type="text" v-model="lastName" required placeholder="Lastname">
                </td>
            </tr>
            <tr>
                <td>
                    <input type="email" v-model="userEmail" required placeholder=userEmail disabled>
                </td>
                <td>
                    <input type="tel" v-model="phone" required placeholder="Phone">
                </td>
            </tr>
            <tr>
                <td>
                    <input type="text" id="address" name="address"
                    v-model="address" required placeholder="Address"><br><br>
                </td>
                <td>
                    <textarea v-model="intro" placeholder="Personal Summary" rows="4" cols="35"></textarea>
                 </td>
            </tr>
            <tr>
                <td><h5>Work Experince</h5></td><td></td>
            </tr>
            <div  v-for="(experience, index) in experiences" :key="index">
                    <td><input type="text" v-model="experience.title" placeholder="Title" /></td><br/>
                    <td><input type="text" v-model="experience.company" placeholder="Company" /></td><br/>
                    <td><input type="text" v-model="experience.date" placeholder="Date" /></td><br/>
                    <td><textarea v-model="experience.tasks" placeholder="Task description" rows="4" cols="35"></textarea></td><br/>
                    <td><button @click.prevent="removeExperience(index)">Remove Experience</button></td>
                    <td><button @click.prevent="addExperience">Add Experience</button></td>  
            </div> 
              <tr>
                <td><h5>Education</h5></td><td></td>
                </tr>
              <!-- <tr><div v-for="(education, index) in educations" :key="index">
                <tr><td><input type="text" v-model="education.school" placeholder="School" /></td></tr>
                <tr><td><input type="text" v-model="education.date" placeholder="Date" /></td></tr>
                <tr><td><input type="text" v-model="education.course" placeholder="Field of Study" /></td></tr>
                <tr><td><button @click.prevent="removeEducation(index)">Remove</button></td></tr>
              </div>
              <tr><td><button @click.prevent="addEducation">Add Education</button></td></tr>
              </tr> -->
              
              <div  v-for="(education, index) in educations" :key="index">
                <td><input type="text" v-model="education.school" placeholder="School" /></td><br/>
                <td><input type="text" v-model="education.date" placeholder="Date" /></td><br/>
                <td><input type="text" v-model="education.course" placeholder="Course" /></td><br/>
                <td><button @click.prevent="removeEducation(index)">Remove Education</button></td>
                <td><button @click.prevent="addEducation">Add Education</button></td>  
            </div> 
            
            <tr>
                <td><h5>Skills</h5></td>
            </tr>
            <tr>
                <label for="skill">Add skill:</label>
                <input type="text" id="skill" v-model="newSkill" placeholder="Skill">
                <button @click.prevent="addSkill">Add</button>
                <ul>
                    <li v-for="skill in skills" :key="skill">
                      {{ skill }}
                      <button @click="removeSkill(skill)">X</button>
                    </li>
                  </ul>
                </tr>
                <tr>
                <td>
                    <button type="submit" @click.prevent="createResume">CREATE RESUME</button>
                </td>
                </tr>
        </table>
      </form>
      </div>
      <div v-else>
        <h4>Please  <router-link to="/sign-up">create an account</router-link> or <router-link to="/sign-in">sign in</router-link> to create a resume</h4>
      </div>
    </main>
  </template>
  

  
  <script>
  import UserResume from "../services/UserResume"
//   import Vue from 'vue';

  export default {
    data() {
      return {
        experiences: [{ title: '', company: '', date: '', description: '' }],
        educations: [{ school: '', date: '', field: '' }],
        skills : [],
        firstName : "",
        lastName : "",
        email : "",
        address : "",
        phone : "",
        intro : "",
        experience : "",
        education : "",
        newSkill: "",
        isLoggedIn: false,
        userEmail: sessionStorage.getItem('userEmail'),
        pageReloaded: false
      }
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

        createResume(){
            
            // const resume ={
            //     userId : "1",
            //     firstName : "Smart",
            //     lastName : "Egbuchulem",
            //     email : "smart@gmail.com",
            //     address : "123 street",
            //     phone : "778 751",
            //     intro : "my intro",
            //     experience : "Staff at white spot",
            //     education : "douglas",
            //     skills : "working skils"
            // }
            
                UserResume.createNewResume(this.userId, this.firstName, this.lastName, this.userEmail, 
                this.address, this.phone, this.intro, this.experiences, this.educations, this.skills)
        }
    },
    created(){
        if (sessionStorage.getItem('userEmail')) {
            this.isLoggedIn = true;
            this.userEmail = sessionStorage.getItem('userEmail')
        }
    },
   
//     mounted() {
//         if (!this.$root.pageReloaded) {
//         setTimeout(() => {
//         window.location.reload();
//         }, 1000);
//         this.pageReloaded = true;
//   }
//     }
  };
  </script>
  

  <style scoped>
  main{
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
  

 