<template>
  <nav class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center min-w-0 flex-1">
          <router-link to="/dashboard" class="text-xl sm:text-2xl font-bold text-primary-600 truncate">
            TicketApp
          </router-link>
        </div>
        
        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-4">
          <span class="text-gray-700">Welcome, {{ props.user?.name }}</span>
          <router-link
            v-if="props.currentPage === 'dashboard'"
            to="/tickets"
            class="text-gray-600 hover:text-primary-600 transition-colors duration-200"
          >
            Manage Tickets
          </router-link>
          <router-link
            v-if="props.currentPage === 'tickets'"
            to="/dashboard"
            class="text-gray-600 hover:text-primary-600 transition-colors duration-200"
          >
            Dashboard
          </router-link>
          <Button variant="secondary" @click="$emit('logout')">
            Logout
          </Button>
        </div>

        <!-- Mobile Navigation -->
        <div class="md:hidden flex items-center space-x-2">
          <!-- Greeting -->
          <span class="text-gray-700 text-sm truncate max-w-40">Welcome, {{ props.user?.name }}</span>
          
          <!-- Hamburger Menu Button -->
          <button
            @click="$emit('toggle-mobile-menu')"
            class="text-gray-600 hover:text-primary-600 focus:outline-none focus:text-primary-600 flex-shrink-0"
            aria-label="Toggle mobile menu"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path
                v-if="!props.isMobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="props.isMobileMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 border-t border-gray-200">
          <router-link
            v-if="props.currentPage === 'dashboard'"
            to="/tickets"
            class="block px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-md transition-colors duration-200"
            @click="$emit('toggle-mobile-menu')"
          >
            Manage Tickets
          </router-link>
          <router-link
            v-if="props.currentPage === 'tickets'"
            to="/dashboard"
            class="block px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-md transition-colors duration-200"
            @click="$emit('toggle-mobile-menu')"
          >
            Dashboard
          </router-link>
          <button
            @click="handleLogout"
            class="block w-full text-left px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-md transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Button } from '../ui';
import type { User } from '../../types';

interface Props {
  user: User | null;
  isMobileMenuOpen: boolean;
  currentPage?: 'dashboard' | 'tickets';
}

const props = withDefaults(defineProps<Props>(), {
  currentPage: 'dashboard'
});

const emit = defineEmits<{
  'logout': [];
  'toggle-mobile-menu': [];
}>();

const handleLogout = () => {
  emit('logout');
  emit('toggle-mobile-menu');
};
</script>

