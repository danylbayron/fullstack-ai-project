import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SignUpRequest, SignUpResponse } from "../types/sign-up";
import { signUpService } from "../services/sign-up-service";

// Query Keys Factory - Centralized key management
export const signUpKeys = {
  all: ["signUp"] as const,
  user: () => [...signUpKeys.all, "user"] as const,
  availability: () => [...signUpKeys.all, "availability"] as const,
  username: (username: string) =>
    [...signUpKeys.availability(), "username", username] as const,
  email: (email: string) =>
    [...signUpKeys.availability(), "email", email] as const,
};

// Hook for sign up mutation
export function useSignUp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: SignUpRequest) => signUpService.signUp(userData),
    onSuccess: (data: SignUpResponse) => {
      // Store user data in cache
      queryClient.setQueryData(signUpKeys.user(), data);
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: signUpKeys.all });
    },
    onError: (error) => {
      console.error("Sign up failed:", error);
    },
  });
}

// Hook for checking username availability
export function useUsernameAvailability(
  username: string,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: signUpKeys.username(username),
    queryFn: () => signUpService.checkUsernameAvailability(username),
    enabled: enabled && username.length >= 3,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook for checking email availability
export function useEmailAvailability(email: string, enabled: boolean = true) {
  return useQuery({
    queryKey: signUpKeys.email(email),
    queryFn: () => signUpService.checkEmailAvailability(email),
    enabled: enabled && email.includes("@"),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook for sign up actions
export function useSignUpActions() {
  const queryClient = useQueryClient();
  const signUpMutation = useSignUp();

  const signUp = async (userData: SignUpRequest) => {
    try {
      await signUpMutation.mutateAsync(userData);
    } catch (error) {
      throw error;
    }
  };

  const clearCache = () => {
    queryClient.removeQueries({ queryKey: signUpKeys.all });
  };

  return {
    signUp,
    clearCache,
    isLoading: signUpMutation.isPending,
    error: signUpMutation.error,
    isSuccess: signUpMutation.isSuccess,
    data: signUpMutation.data,
  };
}

// Hook for sign up state management
export function useSignUpState() {
  const signUpActions = useSignUpActions();

  return {
    ...signUpActions,
    // Additional state management can be added here
    clearError: () => {
      // Clear any error state
      signUpActions.clearCache();
    },
  };
}
