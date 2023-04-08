<template>
  <main >
    <div>
    <h2>User Sign Up</h2>
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
            <td>Registered? <router-link to="/sign-in" class="sign-in">SIGN IN</router-link></td>
            <td>
              <button type="submit" @click.prevent="signup">SIGN UP</button>
            </td>
          </tr>
      </table>
    </form>
    </div>

    <div>
      <h2>Recruiter Sign Up</h2>
      <form>
        <table>
          <tr>
            <td>
              <label for="firstName">First Name:</label>
            </td>
            <td>
              <input type="text" id="firstName" name="firstName"
               v-model="recruiterFirstName" required
              ><br><br>
            </td>
          </tr>
          <tr>
            <td>
              <label for="lastName">Last Name:</label>
            </td>
            <td>
              <input type="text" id="lastName" name="lastName"
              v-model="recruiterLastName" required
              ><br><br>
            </td>
            </tr>
            <tr>
              <td>
                <label for="email">Email:</label>
              </td>
              <td>
                <input type="email" id="email" name="email"
                v-model="recruiterEmail" required
                ><br><br>
              </td>
            </tr>
            <tr>
              <td>
                <label for="password">Password:</label>
              </td>
              <td>
                <input type="password" id="password" name="password"
                v-model="recruiterPassword" required
                ><br><br>
              </td>
            </tr>
            <tr>
              <td>
                <label for="confirmPassword">Confirm Password:</label>
              </td>
              <td>
                <input type="password" id="confirmPassword" name="confirmPassword"
                v-model="confirmRecruiterPassword" required
                ><br><br>
              </td>
            </tr>
            <tr>
              <td>Registered? <router-link to="/sign-in" class="sign-in">SIGN IN</router-link></td>
              <td>
                <button type="submit" @click.prevent="signupRecruiter">SIGN UP</button>
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
      confirmPassword: "",

      recruiterFirstName: "",
      recruiterLastName: "",
      recruiterEmail: "",
      recruiterPassword: "",
      confirmRecruiterPassword: "",
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
    signupRecruiter() {
      if (this.password != this.confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      Recruiter.signUpNewRecruiter(this.recruiterFirstName, this.recruiterLastName, this.recruiterEmail, this.recruiterPassword, this.$router)
    },
  },
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
.sign-in{
  text-decoration: none;
}
</style>


