<template>
    <main>
      <h3>An easy resume builder</h3>
      <section class="hero">
        <h1>Build the Perfect Resume in Minutes</h1>
        <p>With our easy-to-use online resume builder, you can create a professional resume that stands out and gets you hired.</p>
        <a href="/create-resume"><button>Create Your Resume</button></a>
      </section>
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
        <h3>Diverse Careers, Same Builder</h3>
        <p>No matter your career, you can build an effective resume</p>
        <ul>
          <li>Software Engineer</li>
          <li>Marketing Coordinator</li>
          <li>Teacher</li>
          <li>Nurse Practitioner</li>
          <li>Sales Manager</li>
        </ul>
      </section>
    
      <section class="cta">
        <h3>Ready to Build Your Resume?</h3>
        <p>Start creating your resume now and land your dream job with ease.</p>
        <a href="/create-resume"><button class="sec-btn">Create Your Resume</button></a>
      </section>
    </main>
    
    <footer>
      <p>Copyright &copy; {{new Date().getFullYear()}} CSIS 3275 Project </p>
    </footer>
</template>

<script>
 import "../assets/home.css"
 import User from "../services/User";

 export default{
   data(){
    return{
      user : [],
    }
   },
   methods:{
    getAllUsers(){
      User.getUserData().then(response =>{
      this.user = response.data
    })
    }
   },
  created(){
    this.getAllUsers();
  }
 }
</script>


<style scoped>
main{
  margin-top: 4rem;
  min-height: 100vh;
}
h3, p{
  text-align:center
}
li{
  padding: 1rem;
  font-size: 1.4rem;
  color: #ddd;
}
footer{
  padding-bottom: 1.2rem;
}
button{
  padding: 0.4rem;
  border-radius: 0.5rem;
  color: #ddd;
  background: linear-gradient(123deg, rgb(64, 93, 101),rgb(45, 84, 96));
}

.sec-btn{
  margin-left: 50%;
  transform: translateX(-50%);
}


</style>
