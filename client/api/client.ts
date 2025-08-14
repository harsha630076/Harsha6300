
// Frontend API client for QuickCal AI
const API_BASE = '/api';

class ApiClient {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('auth_token');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || 'Request failed');
    }

    return response.json();
  }

  // Auth methods
  async register(email: string, password: string) {
    const result = await this.request<{ user: any; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    this.token = result.token;
    localStorage.setItem('auth_token', result.token);
    return result;
  }

  async login(email: string, password: string) {
    const result = await this.request<{ user: any; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    this.token = result.token;
    localStorage.setItem('auth_token', result.token);
    return result;
  }

  async getMe() {
    return this.request<{ id: string; email: string; profile?: any }>('/auth/me');
  }

  logout() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // Profile methods
  async getProfile() {
    return this.request<any>('/profile');
  }

  async updateProfile(data: any) {
    return this.request<any>('/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Mood methods
  async createMood(category: string, note?: string) {
    return this.request<any>('/mood', {
      method: 'POST',
      body: JSON.stringify({ category, note }),
    });
  }

  async getTodayMoods() {
    return this.request<any[]>('/mood/today');
  }

  async getMoodTimeline(days = 30) {
    return this.request<any[]>(`/mood/timeline?days=${days}`);
  }

  // Meals methods
  async createMeal(data: { time?: string; items: any[] }) {
    return this.request<any>('/meals', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMeal(id: string) {
    return this.request<any>(`/meals/${id}`);
  }

  async getMealsForDay(date: string) {
    return this.request<any[]>(`/meals/day?date=${date}`);
  }

  // Nutrition methods
  async searchFoods(query: string) {
    return this.request<any[]>(`/nutrition/search?q=${encodeURIComponent(query)}`);
  }

  async calculateNutrition(items: any[]) {
    return this.request<any>('/nutrition/calc', {
      method: 'POST',
      body: JSON.stringify({ items }),
    });
  }

  // Coach methods
  async getRecommendations(data: any) {
    return this.request<any>('/coach/recommendations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Assistant methods
  async chat(messages: any[]) {
    return this.request<{ message: { role: string; content: string } }>('/assistant/chat', {
      method: 'POST',
      body: JSON.stringify({ messages }),
    });
  }

  // Recognition methods
  async recognizeFood(imageFile: File) {
    const formData = new FormData();
    formData.append('image', imageFile);

    const url = `${API_BASE}/recognition/photo`;
    const headers: HeadersInit = {};

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || 'Request failed');
    }

    return response.json();
  }
}

export const apiClient = new ApiClient();
