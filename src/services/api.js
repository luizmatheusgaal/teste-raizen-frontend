const PROD_URL = 'https://teste-raizen-backend.vercel.app/api/v1';
const rawUrl = import.meta.env.VITE_API_BASE_URL || PROD_URL;
const API_BASE_URL = /^https?:\/\//.test(rawUrl) ? rawUrl : PROD_URL;

function getToken() {
  return localStorage.getItem('verzel_token');
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
    const error = new Error(data.detail || data.message || `Erro ${response.status}`);
    error.status = response.status;
    error.data = data;
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
