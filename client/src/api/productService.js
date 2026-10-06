import { apiClient, getApiBaseUrl } from './axiosClient';

export const productService = {
  // 1. READ ALL
  getAllProducts: async () => {
    const res = await apiClient.get('/products');
    if (res && res.success && res.data) {
      return res.data;
    }
    return [];
  },

  // 2. READ ONE
  getProductById: async (id) => {
    const res = await apiClient.get(`/products/${id}`);
    if (res && res.success && res.data) {
      return res.data;
    }
    return null;
  },

  // 3. CREATE
  createProduct: async (productData) => {
    const res = await apiClient.post('/products', productData);
    return res;
  },

  // 4. UPDATE
  updateProduct: async (id, updateData) => {
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch(`${getApiBaseUrl()}/products/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(updateData)
      });
      return await res.json();
    } catch (err) {
      console.error('[Update Product Error]:', err);
      return { success: false, message: err.message };
    }
  },

  // 5. DELETE
  deleteProduct: async (id) => {
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch(`${getApiBaseUrl()}/products/${id}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      return await res.json();
    } catch (err) {
      console.error('[Delete Product Error]:', err);
      return { success: false, message: err.message };
    }
  },

  // 6. SITE SETTINGS (DEFAULT BANNER IMAGE & CAPTION DATABASE)
  getSettings: async () => {
    try {
      const res = await apiClient.get('/company/settings');
      if (res && res.success && res.data) {
        return res.data;
      }
    } catch (e) {
      console.error('[Get Settings Error]:', e);
    }
    return {
      default_banner_image: '',
      default_banner_caption: ''
    };
  },

  updateSettings: async (settingsData) => {
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch(`${getApiBaseUrl()}/company/settings`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(settingsData)
      });
      return await res.json();
    } catch (err) {
      console.error('[Update Settings Error]:', err);
      return { success: false, message: err.message };
    }
  },

  // 7. LOGIN ADMIN
  loginAdmin: async (email, password) => {
    try {
      const res = await fetch(`${getApiBaseUrl()}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data && data.success && data.data?.token) {
        localStorage.setItem('admin_token', data.data.token);
        localStorage.setItem('admin_user', JSON.stringify(data.data.user));
      }
      return data;
    } catch (err) {
      console.error('[Login Error]:', err);
      return { success: false, message: err.message };
    }
  },

  // 8. UPLOAD FILE GAMBAR
  uploadImage: async (file) => {
    const token = localStorage.getItem('admin_token');
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch(`${getApiBaseUrl()}/products/upload`, {
        method: 'POST',
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: formData
      });
      return await res.json();
    } catch (err) {
      console.error('[Upload Image Error]:', err);
      return { success: false, message: err.message };
    }
  },

  // 9. INQUIRIES & DEMO REQUESTS
  sendInquiry: async (inquiryData) => {
    try {
      const res = await apiClient.post('/inquiries', inquiryData);
      return res;
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  getInquiries: async () => {
    try {
      const res = await apiClient.get('/inquiries');
      if (res && res.success && res.data) {
        return res.data;
      }
    } catch (err) {
      console.error('[Get Inquiries Error]:', err);
    }
    return [];
  },

  updateInquiryStatus: async (id, status) => {
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch(`${API_BASE_URL}/inquiries/${id}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ status })
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: err.message };
    }
  }
};
