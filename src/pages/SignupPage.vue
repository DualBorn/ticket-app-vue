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
          Create your account
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Or
          <router-link
            to="/auth/login"
            class="font-medium text-primary-600 hover:text-primary-500 transition-colors"
          >
            sign in to your existing account
          </router-link>
        </p>
      </div>

      <Card>
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <Input
            id="name"
            name="name"
            type="text"
            label="Full name"
            auto-complete="name"
            required
            placeholder="Enter your full name"
            v-model="name"
            :error="errors.name"
          />

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
            auto-complete="new-password"
            required
            placeholder="Create a password"
            v-model="password"
            :error="errors.password"
          />

          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm password"
            auto-complete="new-password"
            required
            placeholder="Confirm your password"
            v-model="confirmPassword"
            :error="errors.confirmPassword"
          />

          <div class="flex items-center">
            <input
              id="agree-terms"
              name="agree-terms"
              type="checkbox"
              required
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label for="agree-terms" class="ml-2 block text-sm text-gray-900">
              I agree to the
              <a href="#" class="text-primary-600 hover:text-primary-500 transition-colors">Terms of Service</a>
              and
              <a href="#" class="text-primary-600 hover:text-primary-500 transition-colors">Privacy Policy</a>
            </label>
          </div>

          <div>
            <Button
              type="submit"
              :disabled="isLoading"
              class="w-full"
            >
              <div v-if="isLoading" class="flex items-center justify-center">
                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating account...
              </div>
              <span v-else>Create account</span>
            </Button>
          </div>
        </form>
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

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();
const { errors, validateSignup } = useFormValidation();
const isLoading = ref(false);

const handleSubmit = async () => {
  if (!validateSignup(name.value, email.value, password.value, confirmPassword.value)) {
    return;
  }

  isLoading.value = true;
  const success = await authStore.signup(name.value, email.value, password.value);
  isLoading.value = false;
  
  if (success) {
    toast.success('Account created successfully!');
    router.push('/dashboard');
  } else {
    toast.error('Password must be at least 6 characters long');
  }
};
</script>

