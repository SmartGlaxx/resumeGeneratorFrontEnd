<template>
    <main>
      <div>
      <h2>User Sign In</h2>
      <form>
        <table>
            <tr>
              <td>
                <label for="email">Email:</label>
              </td>
              <td>
                <input type="email" id="email" name="email"
                v-model="email"
                ><br><br>
              </td>
            </tr>
            <tr>
              <td>
                <label for="password">Password:</label>
              </td>
              <td>
                <input type="password" id="password" name="password"
                v-model="password"
                ><br><br>
              </td>
            </tr>
            <tr>
              <td>New User? <router-link to="/sign-up" class="sign-up">SIGN UP</router-link></td>
              <td>
                <button type="submit" @click.prevent="signin">SIGN IN</button>
              </td>
            </tr>
        </table>
      </form>
      </div>
      <div>
        <h2>Recruiter Sign In</h2>
        <form>
          <table>
              <tr>
                <td>
                  <label for="email">Email:</label>
                </td>
                <td>
                  <input type="email" id="email" name="email"
                  v-model="recruiterEmail"
                  ><br><br>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="password">Password:</label>
                </td>
                <td>
                  <input type="password" id="password" name="password"
                  v-model="recruiterPassword"
                  ><br><br>
                </td>
              </tr>
              <tr>
                <td>New Recruiter? <router-link to="/sign-up" class="sign-up">SIGN UP</router-link></td>
                <td>
                  <button type="submit" @click.prevent="signinRecruiter">SIGN IN</button>
                </td>
              </tr>
          </table>
        </form>
        </div>
    </main>
  </template>
  
  
<script>
import axios from 'axios';
import User from '../services/User';
import Recruiter from '../services/Recruiter';

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",

      recruiterFirstName: "",
      recruiterLastName: "",
      recruiterEmail: "",
      recruiterPassword: "",

      isLoggedIn: sessionStorage.getItem("isLoggedIn"),
      isRecruiterLoggedIn: sessionStorage.getItem("isRecruiterLoggedIn")
    };
  },
  methods: {
    signin() {
      const user = {
        email: this.email,
        password: this.password,
      };
    User.signInNewUser(this.email, this.password, this.$router)
    },
    signinRecruiter() {
      const recruiter = {
        recruiterEmail: this.recruiterEmail,
        recruiterPassword: this.recruiterPassword,
      };
      Recruiter.signInNewRecruiter(this.recruiterEmail, this.recruiterPassword, this.$router)
    },
  
  },
  // computed: {
  //   showHeader() {
  //     const currentRoute = this.$route
  //     return currentRoute.meta.showHeader
  //   }
  // }
};
</script>

  <style scoped>
  main{
    display: flex;
    justify-content: space-around;
    padding: 2rem 4rem;
    height: 100vh;
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
  button{
    float: right;
    padding: 0.4rem;
    border-radius: 0.5rem;
    color: #ddd;
    background: linear-gradient(123deg, rgb(64, 93, 101),rgb(45, 84, 96));
  }
  .sign-up{
    text-decoration: none;
  }
  </style>
  