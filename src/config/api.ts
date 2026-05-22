const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  login: `${API_BASE_URL}/auth/login`,
  createParent: `${API_BASE_URL}/auth/create-parent`,
  parents: `${API_BASE_URL}/auth/parents`,
  categories: `${API_BASE_URL}/categories`,
  enfants: `${API_BASE_URL}/enfants`,
  entrainements: `${API_BASE_URL}/entrainements`,
  presences: `${API_BASE_URL}/presences`,
  paiements: `${API_BASE_URL}/paiements`,
  stats: `${API_BASE_URL}/stats`,
};

export default API_BASE_URL;
