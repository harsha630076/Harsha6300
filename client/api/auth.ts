const API_BASE = '/api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    createdAt: string;
  };
  token: string;
}

export interface User {
  id: string;
  email: string;
  createdAt: string;
  profile?: {
    id: string;
    name?: string;
    age?: number;
    gender?: string;
    heightCm?: number;
    weightKg?: number;
    activity?: string;
    goals?: string;
    preferences?: string;
    conditions?: string;
  };
}

class AuthAPI {
  private getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Login failed' }));
      throw new Error(error.message || 'Login failed');
    }

    const result = await response.json();
    
    // Store token in localStorage
    localStorage.setItem('authToken', result.token);
    
    return result;
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Registration failed' }));
      throw new Error(error.message || 'Registration failed');
    }

    const result = await response.json();
    
    // Store token in localStorage
    localStorage.setItem('authToken', result.token);
    
    return result;
  }

  async getMe(): Promise<User> {
    const response = await fetch(`${API_BASE}/auth/me`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      if (response.status === 401) {
        this.logout();
        throw new Error('Authentication required');
      }
      throw new Error('Failed to get user data');
    }

    return response.json();
  }

  async sendOTP(email: string): Promise<{ message: string }> {
    // For now, simulate OTP sending since backend doesn't have OTP endpoint yet
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { message: 'OTP sent successfully' };
  }

  async verifyOTP(email: string, otp: string): Promise<AuthResponse> {
    // For now, simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock user data
    const mockResponse: AuthResponse = {
      user: {
        id: 'mock-user-id',
        email: email,
        createdAt: new Date().toISOString(),
      },
      token: 'mock-jwt-token-' + Date.now(),
    };
    
    // Store token
    localStorage.setItem('authToken', mockResponse.token);
    
    return mockResponse;
  }

  logout() {
    localStorage.removeItem('authToken');
    window.location.href = '/';
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}

export const authAPI = new AuthAPI();
