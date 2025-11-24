import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './assets/main.css'
import 'animate.css'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'

// 全域註冊 PrimeVue 元件
import Button from 'primevue/button'
import Card from 'primevue/card'
import ConfirmationService from 'primevue/confirmationservice'
import ConfirmDialog from 'primevue/confirmdialog'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: 'system',
    },
  },
})

app.component('Button', Button)
app.component('Card', Card)
app.component('ConfirmDialog', ConfirmDialog)

app.use(ConfirmationService)
app.mount('#app')
