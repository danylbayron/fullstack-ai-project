import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  LoginRequest,
  RegisterRequest,
  UpdateUserRequest,
  AuthResponse,
  UserResponse,
} from "../types/auth";
import { authService } from "../services/auth-service";

// Query Keys Factory - Centralized key management
export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
  currentUser: () => [...authKeys.all, "currentUser"] as const,
};

// Hook for getting current user
export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: () => authService.getCurrentUser(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error) => {
      // Don't retry on 401 errors (authentication required)
      if (
        error instanceof Error &&
        error.message.includes("Authentication required")
      ) {
        return false;
      }
      return failureCount < 2;
    },
    enabled: authService.isAuthenticated(), // Only run if authenticated
  });
}

// Hook for login mutation
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: (data: AuthResponse) => {
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
      queryClient.setQueryData(authKeys.currentUser(), { user: data.user });
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
}

// Hook for register mutation
export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: RegisterRequest) => authService.register(userData),
    onSuccess: (data: AuthResponse) => {
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
      queryClient.setQueryData(authKeys.currentUser(), { user: data.user });
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });
}

// Hook for update user mutation
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: UpdateUserRequest) =>
      authService.updateUser(userData),
    onSuccess: (data: UserResponse) => {
      // Update user data in cache
      queryClient.setQueryData(authKeys.currentUser(), data);
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
    },
    onError: (error) => {
      console.error("Update user failed:", error);
    },
  });
}

// Hook for logout
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      authService.logout();
      return Promise.resolve();
    },
    onSuccess: () => {
      // Clear all auth-related queries
      queryClient.removeQueries({ queryKey: authKeys.all });
      queryClient.clear(); // Clear all cached data
    },
  });
}

// Hook for checking authentication status
export function useAuthStatus() {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: () => {
      const isAuth = authService.isAuthenticated();
      const user = authService.getStoredUser();
      return { isAuthenticated: isAuth, user };
    },
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook for authentication actions
export function useAuthActions() {
  const queryClient = useQueryClient();
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const updateUserMutation = useUpdateUser();
  const logoutMutation = useLogout();

  const login = async (credentials: LoginRequest) => {
    try {
      await loginMutation.mutateAsync(credentials);
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: RegisterRequest) => {
    try {
      await registerMutation.mutateAsync(userData);
    } catch (error) {
      throw error;
    }
  };

  const updateUser = async (userData: UpdateUserRequest) => {
    try {
      await updateUserMutation.mutateAsync(userData);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      throw error;
    }
  };

  const refreshToken = async () => {
    try {
      await authService.refreshToken();
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
    } catch (error) {
      // If refresh fails, logout user
      await logout();
      throw error;
    }
  };

  return {
    login,
    register,
    updateUser,
    logout,
    refreshToken,
    isLoading:
      loginMutation.isPending ||
      registerMutation.isPending ||
      updateUserMutation.isPending ||
      logoutMutation.isPending,
    error:
      loginMutation.error ||
      registerMutation.error ||
      updateUserMutation.error ||
      logoutMutation.error,
  };
}

// Hook for authentication state
export function useAuth() {
  const { data: authStatus } = useAuthStatus();
  const { data: currentUser } = useCurrentUser();
  const authActions = useAuthActions();

  return {
    user: currentUser?.user || authStatus?.user || null,
    isAuthenticated: authStatus?.isAuthenticated || false,
    ...authActions,
  };
}
