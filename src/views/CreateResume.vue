<template>
    <main>
      <h2>Create Resume</h2>
      <div v-if="isLoggedIn">
      <form>
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
                    v-model="firstName" required placeholder="Firstname"><br><br>
                </td>
            </tr>
            <tr>
                <!-- <td>
                    <label for="full-name">Last Name:</label>
                </td> -->
                <td>
                    <input type="text" id="full-name" 
                    v-model="lastName" required placeholder="Lastname"><br><br>
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
                    v-model="phone" required placeholder="778 1234 567"><br><br>
                </td>
            </tr>
            <tr>
                <td><h4>Education</h4></td>
            </tr>
            <tr><div v-for="(experience, index) in experiences" :key="index">
                <tr><td><input type="text" v-model="experience.title" placeholder="Title" /></td></tr>
                <tr><td><input type="text" v-model="experience.company" placeholder="Company" /></td></tr>
                <tr><td><input type="text" v-model="experience.date" placeholder="Date" /></td></tr>
                <tr><td><textarea v-model="experience.tasks" placeholder="Task description" rows="4" cols="50"></textarea></td></tr>
                <tr><td><button @click.prevent="removeExperience(index)">Remove</button></td></tr>
              </div>
              <tr><td><button @click.prevent="addExperience">Add Experience</button></td></tr>
              </tr>   
              <tr><div v-for="(education, index) in educations" :key="index">
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
                <!-- <td>
                    <label for="skills">Skills:</label>
                </td> -->
                <!-- <td>
                    <textarea id="skills" 
                    v-model="skills" required placeholder=""></textarea><br><br>
                </td> -->
                <label for="skill">Add skill:</label>
                <input type="text" id="skill" v-model="newSkill">
                <button @click.prevent="addSkill">Add</button>
                <ul>
                    <li v-for="skill in skills" :key="skill">
                      {{ skill }}
                      <button @click="removeSkill(skill)">X</button>
                    </li>
                  </ul>
                </tr>
                <tr>
                    <td></td>
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
  
  export default {
    data() {
      return {
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
  

 