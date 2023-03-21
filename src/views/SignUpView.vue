<template>
  <main>
    <h2>Sign Up</h2>
    <form>
      <table>
        <tr>
          <td>
            <label for="firstName">First Name:</label>
          </td>
          <td>
            <input type="text" id="firstName" name="firstName"
             v-model="firstName" required
            ><br><br>
          </td>
        </tr>
        <tr>
          <td>
            <label for="lastName">Last Name:</label>
          </td>
          <td>
            <input type="text" id="lastName" name="lastName"
            v-model="lastName" required
            ><br><br>
          </td>
          </tr>
          <tr>
            <td>
              <label for="email">Email:</label>
            </td>
            <td>
              <input type="email" id="email" name="email"
              v-model="email" required
              ><br><br>
            </td>
          </tr>
          <tr>
            <td>
              <label for="password">Password:</label>
            </td>
            <td>
              <input type="password" id="password" name="password"
              v-model="password" required
              ><br><br>
            </td>
          </tr>
          <tr>
            <td>
              <label for="confirmPassword">Confirm Password:</label>
            </td>
            <td>
              <input type="password" id="confirmPassword" name="confirmPassword"
              v-model="confirmPassword" required
              ><br><br>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button type="submit" @click.prevent="signup">SIGN UP</button>
            </td>
          </tr>
      </table>
    </form>
  </main>
</template>

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
      confirmPassword: "",
    };
  },
  methods: {
    getUsers(){
      User.getUserData().then(response =>{
        console.log(response)
      });
    },
    signup() {
      if (this.password != this.confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      User.signUpNewUser(this.firstName, this.lastName, this.email, this.password)
    },
  },
};
</script>




