import {
  LoginRequest,
  RegisterRequest,
  UpdateUserRequest,
  AuthResponse,
  UserResponse,
  ErrorResponse,
  JwtPayload,
  AuthStorage,
  User,
} from "../types/auth";

// Base API configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.realworld.io/api";

// JWT Token Utilities
export class JwtUtils {
  // Decode JWT token without verification (client-side only)
  static decodeToken(token: string): JwtPayload | null {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error decoding JWT token:", error);
      return null;
    }
  }

  // Check if token is expired
  static isTokenExpired(token: string): boolean {
    const payload = this.decodeToken(token);
    if (!payload) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  }

  // Get token expiration time
  static getTokenExpiration(token: string): Date | null {
    const payload = this.decodeToken(token);
    if (!payload) return null;

    return new Date(payload.exp * 1000);
  }
}

// Local Storage Implementation
export class LocalStorageAuthStorage implements AuthStorage {
  private readonly TOKEN_KEY = "auth_token";
  private readonly USER_KEY = "auth_user";

  getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  removeToken(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getUser(): User | null {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  setUser(user: User): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  removeUser(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(this.USER_KEY);
  }

  clear(): void {
    this.removeToken();
    this.removeUser();
  }
}

// Authentication Service Class - Single Responsibility: Handle all authentication-related API calls
export class AuthService {
  private static instance: AuthService;
  private baseUrl: string;
  private storage: AuthStorage;

  private constructor(
    baseUrl: string = API_BASE_URL,
    storage: AuthStorage = new LocalStorageAuthStorage()
  ) {
    this.baseUrl = baseUrl;
    this.storage = storage;
  }

  // Singleton pattern for service instance
  public static getInstance(
    baseUrl?: string,
    storage?: AuthStorage
  ): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService(baseUrl, storage);
    }
    return AuthService.instance;
  }

  // Get authorization header
  private getAuthHeaders(): Record<string, string> {
    const token = this.storage.getToken();
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  // Handle API errors
  private async handleApiError(response: Response): Promise<never> {
    let errorMessage = `HTTP error! status: ${response.status}`;

    try {
      const errorData: ErrorResponse = await response.json();
      if (errorData.errors) {
        const errorMessages = Object.values(errorData.errors).flat();
        errorMessage = errorMessages.join(", ");
      }
    } catch {
      // If we can't parse the error response, use the default message
    }

    throw new Error(errorMessage);
  }

  // Login user
  public async login(credentials: LoginRequest): Promise<AuthResponse> {
    const url = `${this.baseUrl}/users/login`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: credentials }),
      });

      if (!response.ok) {
        await this.handleApiError(response);
      }

      const data: AuthResponse = await response.json();

      // Store token and user data
      this.storage.setToken(data.token);
      this.storage.setUser(data.user);

      return data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }

  // Register user
  public async register(userData: RegisterRequest): Promise<AuthResponse> {
    const url = `${this.baseUrl}/users`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: userData }),
      });

      if (!response.ok) {
        await this.handleApiError(response);
      }

      const data: AuthResponse = await response.json();

      // Store token and user data
      this.storage.setToken(data.token);
      this.storage.setUser(data.user);

      return data;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }

  // Get current user
  public async getCurrentUser(): Promise<UserResponse> {
    const url = `${this.baseUrl}/user`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token is invalid, clear storage
          this.storage.clear();
          throw new Error("Authentication required");
        }
        await this.handleApiError(response);
      }

      const data: UserResponse = await response.json();

      // Update stored user data
      this.storage.setUser(data.user);

      return data;
    } catch (error) {
      console.error("Error getting current user:", error);
      throw error;
    }
  }

  // Update user
  public async updateUser(userData: UpdateUserRequest): Promise<UserResponse> {
    const url = `${this.baseUrl}/user`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ user: userData }),
      });

      if (!response.ok) {
        await this.handleApiError(response);
      }

      const data: UserResponse = await response.json();

      // Update stored user data
      this.storage.setUser(data.user);

      return data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  // Logout user
  public logout(): void {
    this.storage.clear();
  }

  // Check if user is authenticated
  public isAuthenticated(): boolean {
    const token = this.storage.getToken();
    if (!token) return false;

    return !JwtUtils.isTokenExpired(token);
  }

  // Get stored user
  public getStoredUser(): User | null {
    return this.storage.getUser();
  }

  // Get stored token
  public getStoredToken(): string | null {
    return this.storage.getToken();
  }

  // Refresh token (if needed)
  public async refreshToken(): Promise<void> {
    if (!this.isAuthenticated()) {
      throw new Error("No valid token to refresh");
    }

    // For JWT tokens, we typically need to re-authenticate
    // This method can be extended to implement token refresh logic
    try {
      await this.getCurrentUser();
    } catch (error) {
      this.logout();
      throw error;
    }
  }
}

// Export singleton instance
export const authService = AuthService.getInstance();
