<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <!-- Decorative Circles -->
    <DecorativeCircles class-name="absolute" />
    
    <div class="max-w-md w-full space-y-8 relative z-10">
      <div class="text-center">
        <router-link to="/" class="text-3xl font-bold text-primary-600">
          TicketApp
        </router-link>
        <h2 class="mt-6 text-3xl font-bold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Or
          <router-link
            to="/auth/signup"
            class="font-medium text-primary-600 hover:text-primary-500 transition-colors"
          >
            create a new account
          </router-link>
        </p>
      </div>

      <Card>
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <Input
            id="email"
            name="email"
            type="email"
            label="Email address"
            auto-complete="email"
            required
            placeholder="Enter your email"
            v-model="email"
            :error="errors.email"
          />

          <Input
            id="password"
            name="password"
            type="password"
            label="Password"
            auto-complete="current-password"
            required
            placeholder="Enter your password"
            v-model="password"
            :error="errors.password"
          />

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <a href="#" class="font-medium text-primary-600 hover:text-primary-500 transition-colors">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              :disabled="isLoading"
              class="w-full"
            >
              <div v-if="isLoading" class="flex items-center justify-center">
                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Signing in...
              </div>
              <span v-else>Sign in</span>
            </Button>
          </div>
        </form>

        <!-- Demo Credentials -->
        <div class="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 class="text-sm font-medium text-gray-900 mb-2">Demo Credentials:</h4>
          <div class="text-xs text-gray-600 space-y-1">
            <p><strong>Admin:</strong> {{ DEMO_CREDENTIALS.ADMIN.email }} / {{ DEMO_CREDENTIALS.ADMIN.password }}</p>
            <p><strong>User:</strong> {{ DEMO_CREDENTIALS.USER.email }} / {{ DEMO_CREDENTIALS.USER.password }}</p>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { Input, Button, Card } from '../components/ui';
import { DecorativeCircles } from '../components/layout';
import { useAuthStore } from '../stores/auth';
import { useFormValidation } from '../composables/useFormValidation';
import { DEMO_CREDENTIALS } from '../constants';

const email = ref('');
const password = ref('');
const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();
const { errors, validateLogin } = useFormValidation();
const isLoading = ref(false);

const handleSubmit = async () => {
  if (!validateLogin(email.value, password.value)) {
    return;
  }

  isLoading.value = true;
  const success = await authStore.login(email.value, password.value);
  isLoading.value = false;
  
  if (success) {
    toast.success('Login successful!');
    router.push('/dashboard');
  } else {
    toast.error('Invalid email or password');
  }
};
</script>

