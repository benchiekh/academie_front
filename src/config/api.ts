// Configuration API pour le déploiement
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  login: `${API_BASE_URL}/auth/login`,
  // Ajoutez d'autres endpoints ici si nécessaire
};

export default API_BASE_URL;
