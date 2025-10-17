import { z } from "zod";

// User Schema for authentication
export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  username: z.string().min(3).max(20),
  bio: z.string().nullable(),
  image: z.string().nullable(),
});

// Login Request Schema
export const LoginRequestSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Register Request Schema
export const RegisterRequestSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one lowercase letter, one uppercase letter, and one number"
    ),
});

// Update User Request Schema
export const UpdateUserRequestSchema = z.object({
  email: z.string().email().optional(),
  username: z.string().min(3).max(20).optional(),
  bio: z.string().optional(),
  image: z.string().url().optional(),
  password: z.string().min(6).optional(),
});

// Authentication Response Schema
export const AuthResponseSchema = z.object({
  user: UserSchema,
  token: z.string(),
});

// Login Response Schema
export const LoginResponseSchema = AuthResponseSchema;

// Register Response Schema
export const RegisterResponseSchema = AuthResponseSchema;

// User Response Schema
export const UserResponseSchema = z.object({
  user: UserSchema,
});

// Error Response Schema
export const ErrorResponseSchema = z.object({
  errors: z.record(z.array(z.string())),
});

// Authentication State Schema
export const AuthStateSchema = z.object({
  user: UserSchema.nullable(),
  token: z.string().nullable(),
  isAuthenticated: z.boolean(),
  isLoading: z.boolean(),
  error: z.string().nullable(),
});

// JWT Token Payload Schema
export const JwtPayloadSchema = z.object({
  sub: z.string(), // user ID
  iat: z.number(), // issued at
  exp: z.number(), // expiration
  email: z.string().email(),
  username: z.string(),
});

// TypeScript Types
export type User = z.infer<typeof UserSchema>;
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
export type UpdateUserRequest = z.infer<typeof UpdateUserRequestSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
export type AuthState = z.infer<typeof AuthStateSchema>;
export type JwtPayload = z.infer<typeof JwtPayloadSchema>;

// Authentication Context Type
export interface AuthContextType {
  authState: AuthState;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  updateUser: (userData: UpdateUserRequest) => Promise<void>;
  refreshToken: () => Promise<void>;
}

// Authentication Storage Interface
export interface AuthStorage {
  getToken: () => string | null;
  setToken: (token: string) => void;
  removeToken: () => void;
  getUser: () => User | null;
  setUser: (user: User) => void;
  removeUser: () => void;
  clear: () => void;
}
