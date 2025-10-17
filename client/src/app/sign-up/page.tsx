"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SignUpCard, SignUpForm, SignUpLinks, useSignUpState } from "./index";
import { SignUpRequest } from "./types/sign-up";

export default function SignUpPage() {
  const router = useRouter();
  const { signUp, isLoading, error, isSuccess, clearError } = useSignUpState();

  // Redirect on successful sign up
  useEffect(() => {
    if (isSuccess) {
      router.push("/");
    }
  }, [isSuccess, router]);

  // Handle sign up submission
  const handleSignUp = async (userData: SignUpRequest) => {
    try {
      await signUp(userData);
    } catch (error) {
      console.error("Sign up failed:", error);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <SignUpCard
        title="Sign Up"
        subtitle="Create your account to get started."
      >
        <SignUpForm
          onSubmit={handleSignUp}
          isLoading={isLoading}
          error={error?.message || null}
        />

        <SignUpLinks />
      </SignUpCard>
    </div>
  );
}
