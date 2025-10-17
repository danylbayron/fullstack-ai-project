import { z } from "zod";

// User Schema for sign up
export const UserSchema = z.object({
  id: z.number(),
  email: z.email(),
  username: z.string().min(3).max(20),
  bio: z.string().nullable(),
  image: z.string().nullable(),
});

// Sign Up Request Schema
export const SignUpRequestSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be less than 20 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      ),
    email: z.email("Please enter a valid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one lowercase letter, one uppercase letter, and one number"
      ),
    confirmPassword: z.string().min(6, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Sign Up Response Schema
export const SignUpResponseSchema = z.object({
  user: UserSchema,
  token: z.string(),
});

// Error Response Schema
export const ErrorResponseSchema = z.object({
  errors: z.record(z.string(), z.array(z.string())),
});

// Sign Up State Schema
export const SignUpStateSchema = z.object({
  user: UserSchema.nullable(),
  token: z.string().nullable(),
  isAuthenticated: z.boolean(),
  isLoading: z.boolean(),
  error: z.string().nullable(),
});

// TypeScript Types
export type User = z.infer<typeof UserSchema>;
export type SignUpRequest = z.infer<typeof SignUpRequestSchema>;
export type SignUpResponse = z.infer<typeof SignUpResponseSchema>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
export type SignUpState = z.infer<typeof SignUpStateSchema>;

// Form Field Types
export interface SignUpFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Sign Up Context Type
export interface SignUpContextType {
  signUpState: SignUpState;
  signUp: (userData: SignUpRequest) => Promise<void>;
  clearError: () => void;
}
