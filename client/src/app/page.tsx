"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <h1 className="text-center mb-4">Fullstack AI Project</h1>
          <p className="text-center text-muted mb-5">
            Built with Next.js, Bootstrap, React Hook Form, TanStack Query, and
            Zod
          </p>

          <div className="card">
            <div className="card-body text-center">
              <h3 className="card-title">
                Welcome to the Fullstack AI Project
              </h3>
              <p className="card-text">
                This application demonstrates a modular architecture with
                resource-based pages. Each page contains its own components,
                hooks, services, and types.
              </p>

              <div className="mt-4">
                <Link href="/user-profile" className="btn btn-primary me-3">
                  User Profile Management
                </Link>
                <Link href="/about" className="btn btn-outline-secondary">
                  About
                </Link>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Architecture Features</h5>
                  <ul className="list-unstyled">
                    <li>✅ Modular resource-based structure</li>
                    <li>✅ Page-specific components and logic</li>
                    <li>✅ Shared functionality in shared folder</li>
                    <li>✅ TypeScript with full type safety</li>
                    <li>✅ Bootstrap 5 for styling</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Technology Stack</h5>
                  <ul className="list-unstyled">
                    <li>🔧 Next.js 15 with App Router</li>
                    <li>🔧 React Hook Form + Zod</li>
                    <li>🔧 TanStack Query</li>
                    <li>🔧 Bootstrap 5</li>
                    <li>🔧 TypeScript</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
