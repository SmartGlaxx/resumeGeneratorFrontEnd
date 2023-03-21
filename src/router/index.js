import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUpView from '../views/SignUpView.vue'
import SignInView from '../views/SignInView.vue'
import CreateResume from '../views/CreateResume.vue'
import MyResumes from '../views/MyResumes.vue'
import MyResume from '../views/MyResume.vue'
import MyResumeEditor from '../views/MyResumeEditor.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: SignUpView
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: SignInView
    },
    {
      path: '/create-resume',
      name: 'createResume',
      component: CreateResume
    },
    {
      path: '/my-resumes',
      name: 'myResumes',
      component: MyResumes
    },
    {
      path: '/my-resumes/:resumeId',
      name: 'myResume',
      component: MyResume,
      props: true
    },
    {
      path: '/my-resumes/:resumeId/edit',
      name: 'myResumeEditor',
      component: MyResumeEditor,
      props: true
    }
  ]
})

export default router
