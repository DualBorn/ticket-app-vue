import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Ticket, TicketStats } from '../types';
import { loadTickets, saveTickets, calculateTicketStats } from '../utils/ticketUtils';

export const useTicketsStore = defineStore('tickets', () => {
  const tickets = ref<Ticket[]>([]);

  // Initialize tickets from localStorage
  const initTickets = () => {
    tickets.value = loadTickets();
  };

  // Computed stats
  const stats = computed<TicketStats>(() => {
    return calculateTicketStats(tickets.value);
  });

  // Update tickets and save to localStorage
  const updateTickets = (newTickets: Ticket[]) => {
    tickets.value = newTickets;
    saveTickets(newTickets);
  };

  // Add a single ticket
  const addTicket = (ticket: Ticket) => {
    updateTickets([...tickets.value, ticket]);
  };

  // Update a single ticket
  const updateTicket = (ticketId: string, updatedTicket: Partial<Ticket>) => {
    const updatedTickets = tickets.value.map(ticket =>
      ticket.id === ticketId ? { ...ticket, ...updatedTicket } : ticket
    );
    updateTickets(updatedTickets);
  };

  // Delete a single ticket
  const deleteTicket = (ticketId: string) => {
    updateTickets(tickets.value.filter(ticket => ticket.id !== ticketId));
  };

  return {
    tickets,
    stats,
    initTickets,
    updateTickets,
    addTicket,
    updateTicket,
    deleteTicket
  };
});

