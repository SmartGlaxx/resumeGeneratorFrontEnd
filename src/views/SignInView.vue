<template>
    <main>
      <h2>Sign In</h2>
      <div v-if="isLoggedIn">
          Logged in
      </div>
      <div v-else>
        Not logged in
      </div>
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
              <td></td>
              <td>
                <button type="submit" @click.prevent="signin">SIGN IN</button>
              </td>
            </tr>
        </table>
      </form>
    </main>
  </template>
  
  
<script>
import axios from 'axios';
import User from '../services/User';

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      isLoggedIn: sessionStorage.getItem("isLoggedIn")
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
   
  
  }
};
</script>

  <style scoped>
  main{
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
  </style>
  