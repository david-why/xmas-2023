import './assets/main.css'

import { createApp } from 'vue'
// @ts-ignore no typescript support :-(
import VueConfetti from 'vue-confetti'
import App from './App.vue'

const app = createApp(App)
app.use(VueConfetti)
app.provide('confetti', app.config.globalProperties.$confetti)
app.mount('#app')
