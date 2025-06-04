import axios, { AxiosInstance } from 'axios';
import { ApiResponse } from '../types';

export class ApiClient {
  private static instance: ApiClient;
  private client: AxiosInstance;

  private constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor for auth
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  public static getInstance(baseURL: string): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient(baseURL);
    }
    return ApiClient.instance;
  }

  // Event Manager API methods
  async createEvent(eventData: any): Promise<ApiResponse<any>> {
    const response = await this.client.post('/api/events', eventData);
    return response.data;
  }

  async updateEvent(eventId: string, eventData: any): Promise<ApiResponse<any>> {
    const response = await this.client.patch(`/api/events/${eventId}`, eventData);
    return response.data;
  }

  async deleteEvent(eventId: string): Promise<ApiResponse<any>> {
    const response = await this.client.delete(`/api/events/${eventId}`);
    return response.data;
  }

  // Admin Dashboard API methods
  async getUsers(): Promise<ApiResponse<any>> {
    const response = await this.client.get('/api/admin/users');
    return response.data;
  }

  async updateUser(userId: string, userData: any): Promise<ApiResponse<any>> {
    const response = await this.client.patch(`/api/admin/users/${userId}`, userData);
    return response.data;
  }

  async getAnalytics(): Promise<ApiResponse<any>> {
    const response = await this.client.get('/api/admin/analytics');
    return response.data;
  }

  // EventMingle API methods
  async getEvents(): Promise<ApiResponse<any>> {
    const response = await this.client.get('/api/events');
    return response.data;
  }

  async getEventDetails(eventId: string): Promise<ApiResponse<any>> {
    const response = await this.client.get(`/api/events/${eventId}`);
    return response.data;
  }

  async joinEvent(eventId: string): Promise<ApiResponse<any>> {
    const response = await this.client.post(`/api/events/${eventId}/join`);
    return response.data;
  }

  // Common API methods
  async login(credentials: { email: string; password: string }): Promise<ApiResponse<any>> {
    const response = await this.client.post('/api/auth/login', credentials);
    return response.data;
  }

  async register(userData: any): Promise<ApiResponse<any>> {
    const response = await this.client.post('/api/auth/register', userData);
    return response.data;
  }

  async getProfile(): Promise<ApiResponse<any>> {
    const response = await this.client.get('/api/users/profile');
    return response.data;
  }

  async updateProfile(userData: any): Promise<ApiResponse<any>> {
    const response = await this.client.patch('/api/users/profile', userData);
    return response.data;
  }
} 