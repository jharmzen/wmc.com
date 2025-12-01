import axios from 'axios';
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import type { AjaxResponse } from '../types';

// Create axios instance with base configuration
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common responses
api.interceptors.response.use(
  (response: AxiosResponse<AjaxResponse>) => {
    // Handle AjaxResponse format
    if (response.data && typeof response.data.Success !== 'undefined') {
      if (!response.data.Success) {
        // Handle API error responses
        const error = new Error(response.data.Msg || 'An error occurred');
        (error as any).response = response;
        return Promise.reject(error);
      }
    }
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }

    // Extract error message from AjaxResponse or use default
    let errorMessage = 'An unexpected error occurred';

    if (error.response?.data && typeof error.response.data === 'object') {
      const data = error.response.data as any;
      if (data.Msg) {
        errorMessage = data.Msg;
      } else if (data.message) {
        errorMessage = data.message;
      }
    }

    const customError = new Error(errorMessage);
    (customError as any).response = error.response;
    return Promise.reject(customError);
  }
);

// API service methods
export const authService = {
  login: async (email: string, password: string): Promise<AjaxResponse & { token?: string; user?: any }> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
  }): Promise<AjaxResponse> => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  forgotPassword: async (email: string): Promise<AjaxResponse> => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  getProfile: async (): Promise<AjaxResponse & { user?: any }> => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (userData: {
    firstName: string;
    lastName: string;
    phone?: string;
  }): Promise<AjaxResponse> => {
    const response = await api.put('/auth/profile', userData);
    return response.data;
  },
};

export const documentService = {
  uploadDocument: async (file: File, type: string): Promise<AjaxResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const response = await api.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getDocuments: async (): Promise<AjaxResponse & { documents?: any[] }> => {
    const response = await api.get('/documents');
    return response.data;
  },

  deleteDocument: async (documentId: number): Promise<AjaxResponse> => {
    const response = await api.delete(`/documents/${documentId}`);
    return response.data;
  },
};

export const invoiceService = {
  submitInvoice: async (invoiceData: {
    invoiceNumber: string;
    amount: number;
    description: string;
    dueDate: string;
  }): Promise<AjaxResponse> => {
    const response = await api.post('/invoices/submit', invoiceData);
    return response.data;
  },

  getInvoices: async (): Promise<AjaxResponse & { invoices?: any[] }> => {
    const response = await api.get('/invoices');
    return response.data;
  },
};

export const eventService = {
  getEvents: async (): Promise<AjaxResponse & { events?: any[] }> => {
    const response = await api.get('/events');
    return response.data;
  },

  bookEvent: async (eventId: number): Promise<AjaxResponse> => {
    const response = await api.post('/events/book', { eventId });
    return response.data;
  },

  getBookings: async (): Promise<AjaxResponse & { bookings?: any[] }> => {
    const response = await api.get('/events/bookings');
    return response.data;
  },
};

export const webinarService = {
  getWebinars: async (): Promise<AjaxResponse & { webinars?: any[] }> => {
    const response = await api.get('/webinars');
    return response.data;
  },

  registerForWebinar: async (webinarId: number): Promise<AjaxResponse> => {
    const response = await api.post('/webinars/register', { webinarId });
    return response.data;
  },

  getRegistrations: async (): Promise<AjaxResponse & { registrations?: any[] }> => {
    const response = await api.get('/webinars/registrations');
    return response.data;
  },
};

export default api;