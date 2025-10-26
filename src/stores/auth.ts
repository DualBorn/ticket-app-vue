import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '../types';
import { STORAGE_KEYS, DEMO_CREDENTIALS } from '../constants';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const isLoading = ref(true);

  // Check for existing session on initialization
  const initAuth = () => {
    const sessionToken = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (sessionToken) {
      try {
        user.value = JSON.parse(sessionToken);
      } catch (error) {
        localStorage.removeItem(STORAGE_KEYS.SESSION);
      }
    }
    isLoading.value = false;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    isLoading.value = true;
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app, this would be an API call
    if (email === DEMO_CREDENTIALS.ADMIN.email && password === DEMO_CREDENTIALS.ADMIN.password) {
      const userData: User = {
        id: '1',
        email: email,
        name: 'Admin User'
      };
      
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(userData));
      user.value = userData;
      isLoading.value = false;
      return true;
    } else if (email === DEMO_CREDENTIALS.USER.email && password === DEMO_CREDENTIALS.USER.password) {
      const userData: User = {
        id: '2',
        email: email,
        name: 'Test User'
      };
      
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(userData));
      user.value = userData;
      isLoading.value = false;
      return true;
    } else {
      isLoading.value = false;
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    isLoading.value = true;
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock signup - in real app, this would be an API call
    if (password.length < 6) {
      isLoading.value = false;
      return false;
    }
    
    const userData: User = {
      id: Date.now().toString(),
      email: email,
      name: name
    };
    
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(userData));
    user.value = userData;
    isLoading.value = false;
    return true;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    user.value = null;
  };

  return {
    user,
    isLoading,
    initAuth,
    login,
    signup,
    logout
  };
});

