"use client";

import Link from "next/link";

interface AuthLinksProps {
  mode: "login" | "register";
}

// Auth Links Component - Single Responsibility: Display authentication navigation links
export function AuthLinks({ mode }: AuthLinksProps) {
  const isLogin = mode === "login";

  return (
    <div className="text-center">
      <p className="mb-0">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <Link
          href={isLogin ? "/register" : "/login"}
          className="ms-2 text-decoration-none"
        >
          {isLogin ? "Sign up" : "Sign in"}
        </Link>
      </p>
    </div>
  );
}
