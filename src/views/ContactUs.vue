<template>
    <main>
      <h2>Contact Us</h2>
      <form @submit.prevent="submitForm" class="form">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="form.name" required>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" required>
        <label for="message">Message:</label>
        <textarea id="message" v-model="form.message" required></textarea>
        <button type="submit">Submit</button>
      </form>
    </main>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          name: '',
          email: '',
          message: ''
        }
      }
    },
    methods: {
      submitForm() {
        this.form.name = '';
        this.form.email = '';
        this.form.message = '';
        alert('Thank you for contacting us!');
      }
    }
  }
  </script>
  
  <style scoped>
  main{
    margin-top: 5rem;
    min-height: 100vh;
  }
  h2{
    padding: 1rem;
    padding-left: 4rem;
  }
  label {
    display: block;
    margin-top: 1rem;
  }
  input[type="text"],
  input[type="email"],
  textarea {
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #ccc;
  }
  textarea {
    height: 10rem;
  }
 
  button[type="submit"] {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
  }
  .form{
    margin: 4rem;
    width: 40rem;
    min-height: calc(100vh - 4rem);
  }
  </style>