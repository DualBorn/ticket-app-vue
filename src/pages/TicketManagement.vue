<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <Navigation
      :user="authStore.user"
      :is-mobile-menu-open="isMobileMenuOpen"
      current-page="tickets"
      @logout="handleLogout"
      @toggle-mobile-menu="isMobileMenuOpen = !isMobileMenuOpen"
    />

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div class="flex-1 min-w-0">
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Ticket Management</h1>
          <p class="mt-2 text-gray-600">
            Create, view, edit, and delete tickets
          </p>
        </div>
        <div>
          <Button
            @click="openModal"
            class="w-full sm:w-auto whitespace-nowrap"
          >
            Create Ticket
          </Button>
        </div>
      </div>

      <!-- Tickets Grid -->
      <div v-if="ticketsStore.tickets.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No tickets</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by creating a new ticket.</p>
        <div class="mt-6">
          <Button @click="openModal">
            Create Ticket
          </Button>
        </div>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          v-for="ticket in ticketsStore.tickets"
          :key="ticket.id"
          hover
        >
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-lg font-semibold text-gray-900 line-clamp-2">
              {{ ticket.title }}
            </h3>
            <div class="flex space-x-2">
              <button
                @click="handleEdit(ticket)"
                class="text-primary-600 hover:text-primary-800 transition-colors"
                title="Edit ticket"
                :aria-label="`Edit ticket: ${ticket.title}`"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                @click="handleDelete(ticket.id)"
                class="text-danger-600 hover:text-danger-800 transition-colors"
                title="Delete ticket"
                :aria-label="`Delete ticket: ${ticket.title}`"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          <p v-if="ticket.description" class="text-gray-600 text-sm mb-4 line-clamp-3">
            {{ ticket.description }}
          </p>

          <div class="flex items-center justify-between mb-4">
            <span :class="['px-2 py-1 rounded-full text-xs font-medium', getStatusColor(ticket.status)]">
              {{ ticket.status.replace('_', ' ') }}
            </span>
            <span :class="['px-2 py-1 rounded-full text-xs font-medium', getPriorityColor(ticket.priority)]">
              {{ ticket.priority }}
            </span>
          </div>

          <div class="text-xs text-gray-500">
            <p>Created: {{ new Date(ticket.createdAt).toLocaleDateString() }}</p>
            <p>Updated: {{ new Date(ticket.updatedAt).toLocaleDateString() }}</p>
          </div>
        </Card>
      </div>
    </div>

    <!-- Modal -->
    <Modal
      :is-open="isModalOpen"
      :title="editingTicket ? 'Edit Ticket' : 'Create New Ticket'"
      @close="resetForm"
    >
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <Input
          type="text"
          id="title"
          label="Title *"
          v-model="formData.title"
          placeholder="Enter ticket title"
          :error="errors.title"
        />

        <Textarea
          id="description"
          label="Description"
          :rows="3"
          v-model="formData.description"
          placeholder="Enter ticket description"
        />

        <Select
          id="status"
          label="Status *"
          v-model="formData.status"
          :options="statusOptions"
          :error="errors.status"
        />

        <Select
          id="priority"
          label="Priority"
          v-model="formData.priority"
          :options="priorityOptions"
        />

        <div class="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            @click="resetForm"
          >
            Cancel
          </Button>
          <Button type="submit">
            {{ editingTicket ? 'Update Ticket' : 'Create Ticket' }}
          </Button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { v4 } from 'uuid';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { Button, Card, Input, Textarea, Select, Modal } from '../components/ui';
import { Navigation } from '../components/layout';
import { useAuthStore } from '../stores/auth';
import { useTicketsStore } from '../stores/tickets';
import { useFormValidation } from '../composables/useFormValidation';
import { getStatusColor, getPriorityColor } from '../utils/ticketUtils';
import { TICKET_STATUSES, TICKET_PRIORITIES } from '../constants';
import type { Ticket, TicketFormData } from '../types';

const isModalOpen = ref(false);
const isMobileMenuOpen = ref(false);
const editingTicket = ref<Ticket | null>(null);

const authStore = useAuthStore();
const ticketsStore = useTicketsStore();
const router = useRouter();
const toast = useToast();
const { errors, validateTicket, clearErrors } = useFormValidation();
const formData = ref<TicketFormData>({
  title: '',
  description: '',
  status: 'open',
  priority: 'medium'
});


const statusOptions = TICKET_STATUSES.map(status => ({
  value: status,
  label: status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
}));

const priorityOptions = TICKET_PRIORITIES.map(priority => ({
  value: priority,
  label: priority.charAt(0).toUpperCase() + priority.slice(1)
}));

onMounted(() => {
  ticketsStore.initTickets();
});

const validateForm = () => {
  return validateTicket(formData.value.title, formData.value.status);
};

const handleSubmit = () => {
  if (!validateForm()) {
    return;
  }

  const now = new Date().toISOString();
  
  if (editingTicket.value) {
    // Update existing ticket
    ticketsStore.updateTicket(editingTicket.value.id, {
      ...formData.value,
      updatedAt: now
    });
    toast.success('Ticket updated successfully!');
  } else {
    // Create new ticket
    const newTicket: Ticket = {
      id: v4(),
      ...formData.value,
      createdAt: now,
      updatedAt: now
    };
    ticketsStore.addTicket(newTicket);
    toast.success('Ticket created successfully!');
  }

  resetForm();
};

const resetForm = () => {
  formData.value = {
    title: '',
    description: '',
    status: 'open',
    priority: 'medium'
  };
  clearErrors();
  editingTicket.value = null;
  isModalOpen.value = false;
};

const handleEdit = (ticket: Ticket) => {
  formData.value = {
    title: ticket.title,
    description: ticket.description,
    status: ticket.status,
    priority: ticket.priority
  };
  editingTicket.value = ticket;
  isModalOpen.value = true;
};

const handleDelete = (ticketId: string) => {
  if (window.confirm('Are you sure you want to delete this ticket?')) {
    ticketsStore.deleteTicket(ticketId);
    toast.success('Ticket deleted successfully!');
  }
};

const openModal = () => {
  isModalOpen.value = true;
};

const handleLogout = () => {
  authStore.logout();
  toast.success('Logged out successfully');
  router.push('/auth/login');
};
</script>

