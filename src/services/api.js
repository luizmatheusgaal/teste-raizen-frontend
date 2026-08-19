import { notifyToast } from './toast.js';

const PROD_URL = 'https://teste-raizen-backend.vercel.app/api/v1';
const rawUrl = import.meta.env.VITE_API_BASE_URL || PROD_URL;
const API_BASE_URL = /^https?:\/\//.test(rawUrl) ? rawUrl : PROD_URL;

function getToken() {
  return localStorage.getItem('verzel_token');
}

function extractErrorMessage(data, status) {
  if (data && typeof data === 'object') {
    if (typeof data.msg === 'string') {
      return data.msg;
    }
    if (typeof data.detail === 'string') {
      return data.detail;
    }
    if (typeof data.message === 'string') {
      return data.message;
    }
    const messages = [];
    for (const value of Object.values(data)) {
      if (Array.isArray(value)) {
        messages.push(value.join(', '));
      } else if (typeof value === 'string') {
        messages.push(value);
      }
    }
    if (messages.length) {
      return messages.join(' ');
    }
  }
  return `Erro ${status}`;
}

export async function apiRequest(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Token ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = extractErrorMessage(data, response.status);
    const error = new Error(message);
    error.status = response.status;
    error.data = data;

    if (response.status === 403) {
      window.location.replace('/');
      throw error;
    }

    notifyToast(message, 'error', 4000);
    throw error;
  }

  return data;
}

export const api = {
  register: (payload) => apiRequest('/users/register/', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => apiRequest('/users/login/', { method: 'POST', body: JSON.stringify(payload) }),
  profile: () => apiRequest('/users/profile/'),

  listEvents: (params = '') => apiRequest(`/events/${params}`),
  getEvent: (id) => apiRequest(`/events/${id}/`),
  createEvent: (payload) => apiRequest('/events/', { method: 'POST', body: JSON.stringify(payload) }),

  listCategories: () => apiRequest('/categories/'),
  listVenues: () => apiRequest('/venues/'),

  listTicketTypes: (eventId) => apiRequest(`/ticket-types/?event=${eventId}`),
  createTicketType: (payload) => apiRequest('/ticket-types/', { method: 'POST', body: JSON.stringify(payload) }),
  listTickets: () => apiRequest('/tickets/'),

  createOrder: (payload) => apiRequest('/orders/', { method: 'POST', body: JSON.stringify(payload) }),
  payOrder: (id) => apiRequest(`/orders/${id}/pay/`, { method: 'POST' }),

  validateTicket: (code) => apiRequest('/validate/', { method: 'POST', body: JSON.stringify({ code }) }),
};
