<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <Navigation
      :user="authStore.user"
      :is-mobile-menu-open="isMobileMenuOpen"
      current-page="dashboard"
      @logout="handleLogout"
      @toggle-mobile-menu="isMobileMenuOpen = !isMobileMenuOpen"
    />

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p class="mt-2 text-gray-600">
          Overview of your ticket management system
        </p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Total Tickets -->
        <Card hover>
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center" aria-hidden="true">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Tickets</p>
              <p class="text-2xl font-bold text-gray-900">{{ ticketsStore.stats.total }}</p>
            </div>
          </div>
        </Card>

        <!-- Open Tickets -->
        <Card hover>
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center" aria-hidden="true">
                <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Open</p>
              <p class="text-2xl font-bold text-success-600">{{ ticketsStore.stats.open }}</p>
            </div>
          </div>
        </Card>

        <!-- In Progress Tickets -->
        <Card hover>
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center" aria-hidden="true">
                <svg class="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">In Progress</p>
              <p class="text-2xl font-bold text-warning-600">{{ ticketsStore.stats.inProgress }}</p>
            </div>
          </div>
        </Card>

        <!-- Closed Tickets -->
        <Card hover>
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center" aria-hidden="true">
                <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Closed</p>
              <p class="text-2xl font-bold text-gray-600">{{ ticketsStore.stats.closed }}</p>
            </div>
          </div>
        </Card>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Quick Actions Card -->
        <Card>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div class="space-y-4">
            <router-link
              to="/tickets"
              class="flex items-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors duration-200"
            >
              <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <p class="font-medium text-gray-900">Create New Ticket</p>
                <p class="text-sm text-gray-600">Start tracking a new issue</p>
              </div>
            </router-link>

            <router-link
              to="/tickets"
              class="flex items-center p-4 bg-success-50 rounded-lg hover:bg-success-100 transition-colors duration-200"
            >
              <div class="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center mr-4">
                <svg class="w-5 h-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p class="font-medium text-gray-900">View All Tickets</p>
                <p class="text-sm text-gray-600">Manage existing tickets</p>
              </div>
            </router-link>
          </div>
        </Card>

        <!-- Recent Activity Card -->
        <Card>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div class="space-y-4">
            <div v-if="ticketsStore.stats.total === 0" class="text-center py-8">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p class="mt-2 text-sm text-gray-500">No tickets created yet</p>
              <router-link
                to="/tickets"
                class="mt-2 inline-block btn-primary"
              >
                Create your first ticket
              </router-link>
            </div>
            <div v-else class="text-sm text-gray-600">
              <p>• {{ ticketsStore.stats.total }} total tickets in the system</p>
              <p>• {{ ticketsStore.stats.open }} tickets are currently open</p>
              <p>• {{ ticketsStore.stats.inProgress }} tickets are in progress</p>
              <p>• {{ ticketsStore.stats.closed }} tickets have been closed</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { Card } from '../components/ui';
import { Navigation } from '../components/layout';
import { useAuthStore } from '../stores/auth';
import { useTicketsStore } from '../stores/tickets';

const isMobileMenuOpen = ref(false);
const authStore = useAuthStore();
const ticketsStore = useTicketsStore();
const router = useRouter();
const toast = useToast();

onMounted(() => {
  ticketsStore.initTickets();
});

const handleLogout = () => {
  authStore.logout();
  toast.success('Logged out successfully');
  router.push('/auth/login');
};
</script>

