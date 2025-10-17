"use client";

import { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

// Auth Card Component - Single Responsibility: Display authentication card layout
export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-body p-4">
              {/* Header */}
              <div className="text-center mb-4">
                <h2 className="card-title mb-2">{title}</h2>
                {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
              </div>

              {/* Content */}
              {children}

              {/* Footer */}
              {footer && <div className="mt-4 pt-3 border-top">{footer}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
