<script setup>
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import GoatList from '@/components/GoatList.vue'
import SessionPlayground from '@/components/SessionPlayground.vue'

const { logout } = inject('auth'); 
const router = useRouter();

const onLogout = async () => {
    await logout();
    alert('You have been logged out.');
    router.push('/login');
};
</script>

<template>
  <main>
    <p> There b goats on this here home page</p>
    <GoatList />
    <p>Congrats you're logged in!</p>
    <button @click="onLogout">Logout</button>
    <h1>Session info!</h1>
    <SessionPlayground/>
  </main>
</template>
