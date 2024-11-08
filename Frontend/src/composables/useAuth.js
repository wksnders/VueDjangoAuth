import { ref, computed } from 'vue';
import authService from '../services/authService';
import { useLocalPersistence } from './useLocalPersistence'; 

export function useAuth() {
  const { getItem, setItem, removeItem } = useLocalPersistence('authUser');

  const user = ref(getItem() || null);

  const isAuthenticated = computed(() => !!user.value);

  const login = async (username, password) => {
    try {
      const response = await authService.login(username, password);
      user.value = response.user;
      setItem(response.user);
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed');
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      user.value = null;
      removeItem();
    } catch (error) {
      console.error('Logout failed:', error);
      throw new Error('Logout failed');
    }
  };

  const fetchUser = async () => {
    try {
      const response = await authService.fetchUser();
      user.value = response.user;
      setItem(response.user);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      user.value = null;
      removeItem();
    }
  };
  return {
    user,
    isAuthenticated,
    login,
    logout,
    fetchUser,
  };
}