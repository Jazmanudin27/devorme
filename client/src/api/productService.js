import { apiClient } from './axiosClient';

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
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE'
      });
      return await res.json();
    } catch (err) {
      console.error('[Delete Product Error]:', err);
      return { success: false, message: err.message };
    }
  }
};
