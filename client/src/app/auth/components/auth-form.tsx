"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LoginRequestSchema,
  RegisterRequestSchema,
  LoginRequest,
  RegisterRequest,
} from "../types/auth";

interface AuthFormProps {
  mode: "login" | "register";
  onSubmit: (data: LoginRequest | RegisterRequest) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

// Auth Form Component - Single Responsibility: Handle authentication form logic
export function AuthForm({ mode, onSubmit, isLoading, error }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form setup based on mode
  const isLogin = mode === "login";
  const schema = isLogin ? LoginRequestSchema : RegisterRequestSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<LoginRequest | RegisterRequest>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  // Watch password for confirm password validation
  const password = watch("password");

  // Handle form submission
  const handleFormSubmit = async (data: LoginRequest | RegisterRequest) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="needs-validation"
      noValidate
    >
      {/* Error Display */}
      {error && (
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Username Field (Register only) */}
      {!isLogin && (
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
            id="username"
            {...register("username")}
            disabled={isLoading}
            placeholder="Enter your username"
          />
          {errors.username && (
            <div className="invalid-feedback">{errors.username.message}</div>
          )}
        </div>
      )}

      {/* Email Field */}
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          id="email"
          {...register("email")}
          disabled={isLoading}
          placeholder="Enter your email"
        />
        {errors.email && (
          <div className="invalid-feedback">{errors.email.message}</div>
        )}
      </div>

      {/* Password Field */}
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            id="password"
            {...register("password")}
            disabled={isLoading}
            placeholder="Enter your password"
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.password && (
          <div className="invalid-feedback">{errors.password.message}</div>
        )}
      </div>

      {/* Confirm Password Field (Register only) */}
      {!isLogin && (
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <div className="input-group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className={`form-control ${
                errors.confirmPassword ? "is-invalid" : ""
              }`}
              id="confirmPassword"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              disabled={isLoading}
              placeholder="Confirm your password"
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={isLoading}
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.confirmPassword && (
            <div className="invalid-feedback">
              {errors.confirmPassword.message}
            </div>
          )}
        </div>
      )}

      {/* Submit Button */}
      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary btn-lg"
          disabled={isLoading || !isValid}
        >
          {isLoading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              {isLogin ? "Signing In..." : "Creating Account..."}
            </>
          ) : isLogin ? (
            "Sign In"
          ) : (
            "Sign Up"
          )}
        </button>
      </div>
    </form>
  );
}
