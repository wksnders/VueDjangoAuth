<script setup>
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';

const { handleLogin } = inject('auth');
const router = useRouter();

const username = ref('');
const password = ref('');
const errorMessage = ref('');

const isValidLoginForm = () => {
    if (!username.value || !password.value) {
        errorMessage.value = "Username and password are required.";
        return false;
    }
    return true;
};

const onSubmit = async () => {
    console.log("Attempting login with form submission");
    errorMessage.value = '';

    if (!isValidLoginForm()) {
        console.log("Login invalid with user:", username.value);
        return;
    }

    try {
        await handleLogin(username.value, password.value);
        alert('Login successful!');
        router.push('/');
    } catch (error) {
        errorMessage.value = error.message;
    }
};
</script>

<template>
    <div class="login-form">
        <h2>Login</h2>
        <form @submit.prevent="onSubmit">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" v-model="username" required aria-label="Enter your username" />
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" required aria-label="Enter your password" />
            </div>

            <div class="form-group">
                <button type="submit">Login</button>
            </div>

            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </form>
    </div>
</template>


<style scoped>
.login-form {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    background-color: var(--color-background-soft);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.error-message {
    color: red;
    font-size: 14px;
    margin-top: 10px;
    text-align: center;
}
</style>