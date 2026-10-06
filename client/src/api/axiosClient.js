export const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return '/api/v1';
  }
  return 'http://localhost:5000/api/v1';
};

const getAuthHeaders = () => {
  const token = localStorage.getItem('admin_token');
  return token ? { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } : { 'Content-Type': 'application/json' };
};

export const apiClient = {
  get: async (endpoint) => {
    try {
      const res = await fetch(`${getApiBaseUrl()}${endpoint}`, {
        headers: getAuthHeaders()
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn(`[API Client Fallback] Endpoint ${endpoint} tidak terjangkau backend:`, err.message);
      return null;
    }
  },
  post: async (endpoint, data) => {
    try {
      const res = await fetch(`${getApiBaseUrl()}${endpoint}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch (err) {
      console.error(`[API Post Error]:`, err.message);
      throw err;
    }
  }
};

