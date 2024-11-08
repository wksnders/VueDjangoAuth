import './style.css'
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';


import { useAuth } from '@/composables/useAuth.js';
const auth = useAuth();

const app = createApp(App);
app.provide('auth', auth);

app.use(router);

app.mount('#app');
