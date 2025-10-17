"use client";

import Link from "next/link";

// Sign Up Links Component - Single Responsibility: Display sign up navigation links
export function SignUpLinks() {
  return (
    <div className="text-center">
      <p className="mb-0">
        Already have an account?
        <Link href="/login" className="ms-2 text-decoration-none">
          Sign in
        </Link>
      </p>
    </div>
  );
}
