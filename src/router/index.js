// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const DefaultLayout = () => import('@/layouts/DefaultLayout.vue')
const LoginLayout = () => import('@/layouts/LoginLayout.vue')

const AllTasksView = () => import('@/views/AllTasksView.vue')
const TimelineView = () => import('@/views/TimelineView.vue')
const MessagesView = () => import('@/views/MessagesView.vue')
const ProfileView = () => import('@/views/ProfileView.vue')
const ProfileDetailView = () => import('@/views/ProfileDetailView.vue')
const ContactsView = () => import('@/views/ContactsView.vue')
const CompanyView = () => import('@/views/CompanyView.vue')
const NotificationsView = () => import('@/views/NotificationsView.vue')
const SettingsView = () => import('@/views/SettingsView.vue')
const HelpCenterView = () => import('@/views/HelpCenterView.vue')
const HelpCenterDetailView = () => import('@/views/HelpCenterDetailView.vue')
const AuthenticationView = () => import('@/views/AuthenticationView.vue')
const AdminPagesView = () => import('@/views/AdminPagesView.vue')
const UtilityPagesView = () => import('@/views/UtilityPagesView.vue')
const LoginView = () => import('@/views/LoginView.vue')
const SignUpView = () => import('@/views/SignUp.vue')
const SignInView = () => import('@/views/SignIn.vue')
const ResetPasswordView = () => import('@/views/ResetPassword.vue')

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    redirect: '/tasks',
    children: [
      {
        path: 'tasks',
        name: 'tasks',
        component: AllTasksView,
      },
      {
        path: 'timeline',
        name: 'timeline',
        component: TimelineView,
      },
      {
        path: 'messages',
        name: 'messages',
        component: MessagesView,
      },
      {
        path: 'profile',
        name: 'profile',
        component: ProfileView,
      },
      {
        path: 'profile/:id',
        name: 'profile-detail',
        component: ProfileDetailView,
      },
      {
        path: 'contacts',
        name: 'contacts',
        component: ContactsView,
      },
      {
        path: 'company',
        name: 'company',
        component: CompanyView,
      },
      {
        path: 'notifications',
        name: 'notifications',
        component: NotificationsView,
      },
      {
        path: 'settings',
        name: 'settings',
        component: SettingsView,
      },
      {
        path: 'help-center',
        name: 'help-center',
        component: HelpCenterView,
      },
      {
        path: 'help-center/:id',
        name: 'help-detail',
        component: HelpCenterDetailView,
      },
      {
        path: 'login-policy',
        name: 'login-policy',
        component: () => import('@/views/LoginPolicyView.vue'),
      },

      // Authentication 區塊：父路由 + 三個子路由
      {
        path: 'auth-pages',
        component: AuthenticationView,
        children: [
          {
            path: '',
            name: 'auth-pages',
            component: SignUpView,
          },
          {
            path: 'sign-up',
            name: 'auth-sign-up',
            component: SignUpView,
          },
          {
            path: 'sign-in',
            name: 'auth-sign-in',
            component: SignInView,
          },
          {
            path: 'reset-password',
            name: 'auth-reset-password',
            component: ResetPasswordView,
          },
        ],
      },

      {
        path: 'admin-pages',
        name: 'admin-pages',
        component: AdminPagesView,
      },
      {
        path: 'utility-pages',
        name: 'utility-pages',
        component: UtilityPagesView,
      },
    ],
  },
  {
    path: '/login',
    component: LoginLayout,
    children: [
      {
        path: '',
        name: 'login',
        component: LoginView,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
