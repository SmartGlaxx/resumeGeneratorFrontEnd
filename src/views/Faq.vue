<template>
    <main>
      <h2>Frequently Asked Questions</h2>
      <div v-for="(faq, index) in faqs" :key="index" class="faqs">
        <h3>{{ faq.question }}</h3>
        <p>{{ faq.answer }}</p>
      </div>
    </main>
  </template>
  
  <script>
  export default {
    name: "Faq",
    data() {
      return {
        faqs: [
          {
            question: "How do I get started with the resume generator?",
            answer: "Simply create an account and follow the prompts to input your information and choose a template. The resume generator will then generate a professional-looking resume for you."
          },
          {
            question: "Is my information secure?",
            answer: "Yes, we take the security of your information very seriously. We use industry-standard encryption and take steps to ensure that your data is protected."
          },
          {
            question: "Can I customize my resume?",
            answer: "Yes, you can customize your resume by choosing different templates, fonts, colors, and layouts. You can also edit the content of your resume to highlight your skills and experience."
          }
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  main{
    margin-top: 2rem;
    padding: 4rem;
    min-height: calc(100vh);
  }
  h2 {
    margin-bottom: 2rem;
  }
  
  
  p {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  .faqs{
    width: 40rem;
  }
  </style>