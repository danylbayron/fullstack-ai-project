import {
  SignUpRequest,
  SignUpResponse,
  ErrorResponse,
  User,
} from "../types/sign-up";

// Base API configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.realworld.io/api";

// Sign Up Service Class - Single Responsibility: Handle all sign up-related API calls
export class SignUpService {
  private static instance: SignUpService;
  private baseUrl: string;

  private constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // Singleton pattern for service instance
  public static getInstance(baseUrl?: string): SignUpService {
    if (!SignUpService.instance) {
      SignUpService.instance = new SignUpService(baseUrl);
    }
    return SignUpService.instance;
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

  // Register new user
  public async signUp(userData: SignUpRequest): Promise<SignUpResponse> {
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

      const data: SignUpResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error signing up user:", error);
      throw error;
    }
  }

  // Validate username availability (optional feature)
  public async checkUsernameAvailability(username: string): Promise<boolean> {
    // This would typically be a separate endpoint
    // For now, we'll return true as a placeholder
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate API call
        resolve(true);
      }, 500);
    });
  }

  // Validate email availability (optional feature)
  public async checkEmailAvailability(email: string): Promise<boolean> {
    // This would typically be a separate endpoint
    // For now, we'll return true as a placeholder
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate API call
        resolve(true);
      }, 500);
    });
  }
}

// Export singleton instance
export const signUpService = SignUpService.getInstance();
