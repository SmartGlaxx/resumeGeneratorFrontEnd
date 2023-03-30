<template>
    <main>
      <h2>Easy resume builder</h2>
      <section class="hero">
        <h1>Build the Perfect Resume in Minutes</h1>
        <p>With our easy-to-use online resume builder, you can create a professional resume that stands out and gets you hired.</p>
        <a href="#" class="btn">Create Your Resume</a>
      </section>
    <table>
      <tr>
        <th>
          fname
        </th>
        <th>
          Experience
        </th>
      </tr>
      <div v-for="res in userResume">
        <tr>
          <td>{{ res.userId }}</td>
          <td>{{ res.firstName }}</td>
          <td>{{ res.lastName }}</td>
          <td>{{ res.email }}</td>
          <td>{{ res.address }}</td>
          <td>{{ res.phone }}</td>
          <td>{{ res.experience }}</td>
          <td>{{ res.education }}</td>
          <td>{{ res.skills }}</td>
        </tr>
      </div>
  
    </table>
      <section class="features">
        <h2>Features</h2>
        <ul>
          <li>
            <h3>Customizable Templates</h3>
            <p>Choose from a wide selection of professionally-designed templates and customize them to fit your style.</p>
          </li>
          <li>
            <h3>Easy to Use</h3>
            <p>Our intuitive builder lets you create a resume in minutes, without the need for technical skills or experience.</p>
          </li>
          <li>
            <h3>Optimized for ATS</h3>
            <p>Ensure your resume gets past applicant tracking systems and lands on the desk of a hiring manager.</p>
          </li>
          <li>
            <h3>PDF and Word Downloads</h3>
            <p>Download your resume in both PDF and Word format for easy sharing and printing.</p>
          </li>
        </ul>
      </section>
    
      <section class="examples">
        <h2>Examples</h2>
        <p>See how others have used our platform to create professional, effective resumes:</p>
        <ul>
          <li><a href="#">Sales Manager</a></li>
          <li><a href="#">Software Engineer</a></li>
          <li><a href="#">Marketing Coordinator</a></li>
          <li><a href="#">Nurse Practitioner</a></li>
          <li><a href="#">Teacher</a></li>
        </ul>
      </section>
    
      <section class="cta">
        <h2>Ready to Build Your Resume?</h2>
        <p>Start creating your resume now and land your dream job with ease.</p>
        <a href="#" class="btn">Create Your Resume</a>
      </section>
    </main>
    
    <footer>
      <p>Copyright &copy; {{new Date().getFullYear()}} CSIS 3275 Project </p>
    </footer>
</template>

<script>
 import "../assets/home.css"
 import User from "../services/User";
import UserResume from "../services/UserResume"
//  import Resume from "../services/Resume";

 export default{
   data(){
    return{
      user : [],
      userResume: []
    }
   },
   methods:{
    getAllUsers(){
      User.getUserData().then(response =>{
      this.user = response.data
    })
    },
    // getAllResumes(){
    //   UserResume.getAllResumes().then(response =>{
    //     this.userResume = response.data
    //   })
    // }
   },
  created(){
    this.getAllUsers();
    // this.getAllResumes();
  }
 }
</script>


<style scoped>
main{
  margin-top: 4rem;
}


</style>
