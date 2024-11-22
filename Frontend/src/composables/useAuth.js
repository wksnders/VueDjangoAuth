import { ref, computed } from 'vue';
import { login, logout, getUser } from '../services/authservice';
import { getCsrfToken } from '../services/useAPIData';

const user = ref(null);
const error = ref(null);
const isLoading = ref(false);
const csrfToken = ref(null);

async function handleLogin(username, password) {
  isLoading.value = true;
  error.value = null;

  try {
      csrfToken.value = await getCsrfToken();

      const userData = await login(username, password,csrfToken.value);
      user.value = userData;
  } catch (err) {
      console.error('Login failed:', err);
      error.value = 'Login failed. Please check your credentials.';
  } finally {
      isLoading.value = false;
  }
}

async function handleLogout() {
  isLoading.value = true;
  error.value = null;

  try {
      await logout(csrfToken.value);
      user.value = null;
      csrfToken.value = null;
  } catch (err) {
      console.error('Logout failed:', err);
      error.value = 'Logout failed. Please try again.';
  } finally {
      isLoading.value = false;
  }
}
async function fetchUser() {
  isLoading.value = true;
  error.value = null;

  try {
      const userData = await getUser();
      user.value = userData;

      if (userData) {
          csrfToken.value = await getCsrfToken();
      }
  } catch (err) {
      console.error('Fetching user failed:', err);
      user.value = null;
      csrfToken.value = null; 
  } finally {
      isLoading.value = false;
  }
}

export function useAuth() {
    return {
        user,
        csrfToken,
        error,
        isLoading,
        handleLogin,
        handleLogout,
        fetchUser,
    };
}