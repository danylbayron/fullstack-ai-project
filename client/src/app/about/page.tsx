import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <h1 className="text-center mb-4">About This Project</h1>

          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">Architecture Overview</h3>
              <p className="card-text">
                This project demonstrates a modular, resource-based architecture
                where each page contains its own components, hooks, services,
                and types. This approach provides better organization and
                maintainability for large applications.
              </p>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">Key Features</h3>
              <ul>
                <li>
                  <strong>Modular Structure:</strong> Each page has its own
                  resource module
                </li>
                <li>
                  <strong>Shared Functionality:</strong> Common code in the
                  shared folder
                </li>
                <li>
                  <strong>Type Safety:</strong> Full TypeScript support
                  throughout
                </li>
                <li>
                  <strong>Modern Stack:</strong> Next.js 15, React Hook Form,
                  TanStack Query
                </li>
                <li>
                  <strong>Validation:</strong> Zod schemas for form validation
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Link href="/" className="btn btn-primary me-3">
              Back to Home
            </Link>
            <Link href="/user-profile" className="btn btn-outline-primary">
              User Profile Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
