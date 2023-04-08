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
                    <!-- <td><textarea v-model="experience.tasks" placeholder="Task description" rows="4" cols="35"></textarea></td><br/> -->
                    <h6>Tasks</h6>
                   <div class="task">
                      <div v-for="(task, taskIndex) in experience.tasks" :key="taskIndex">
                        <input type="text" v-model="experience.tasks[taskIndex]" placeholder="Task description" /><br />
                        <button @click.prevent="removeTask(experience, taskIndex)">Remove Task</button>
                      </div>
                      <br/>
                      <button @click.prevent="addTask(experience)">Add Task</button>
                      <br/><br/>
                    </div>
                    <td><button @click.prevent="removeExperience(index)">Remove Experience</button></td>
                    <td><button @click.prevent="addExperience">Add Experience</button></td>  
            </div> 
              <tr>
                <td><h5>Education</h5></td><td></td>
                </tr>              
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
        <h4>Please  create an account or sign in to create a resume</h4>
      </div>
    </main>
  </template>
  

  
  <script>
  import UserResume from "../services/UserResume"
//   import Vue from 'vue';

  export default {
    data() {
      return {
        experiences: [{ title: '', company: '', date: '', tasks: [] }],
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
        signout(){
            sessionStorage.removeItem('userEmail');
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('recruiterEmail');
            sessionStorage.removeItem('isRecruiterLoggedIn');
            this.isLoggedIn = false
            this.isRecruiterLoggedIn = false
        },
        addExperience() {
        this.experiences.push({ title: '', company: '', date: '', tasks: [] })
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
        addTask(experience) {
          experience.tasks.push("");
        },
        removeTask(experience, index) {
          experience.tasks.splice(index, 1);
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
    min-height: calc(100vh - 5rem);
    padding: 2rem 4rem;
    height: auto;
    padding-bottom: 5rem;
    margin-top: 4rem;
    width: 100%;
    background: linear-gradient(to right, #0f2027, #203a43, #2c5364); 
    color: #fafae4;
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

  .task{
    margin-left: 2rem;
  }
  
  </style>
  

 