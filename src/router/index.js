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
      component: HomeView,
      meta: {
        showHeader: true
      }
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: SignUpView,
      meta: {
        showHeader: false
      }
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: SignInView,
      meta: {
        showHeader: false
      }
    },
    {
      path: '/create-resume',
      name: 'createResume',
      component: CreateResume,
      meta: {
        showHeader: true
      }
    },
    {
      path: '/my-resumes',
      name: 'myResumes',
      component: MyResumes,
      meta: {
        showHeader: true
      }
    },
    {
      path: '/my-resumes/:resumeId',
      name: 'myResume',
      component: MyResume,
      props: true,
      meta: {
        showHeader: true
      }
    },
    {
      path: '/my-resumes/:resumeId/edit',
      name: 'myResumeEditor',
      component: MyResumeEditor,
      props: true,
      meta: {
        showHeader: true
      }
    }
  ]
})


export default router
