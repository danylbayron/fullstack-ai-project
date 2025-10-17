"use client";

import { Article } from "../types/article";

interface ArticleListProps {
  articles: Article[];
  isLoading?: boolean;
  error?: string | null;
}

// Article List Component - Single Responsibility: Display list of articles
export function ArticleList({ articles, isLoading, error }: ArticleListProps) {
  if (isLoading) {
    return (
      <div className="row">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="placeholder-glow">
                  <span className="placeholder col-7"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-6"></span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error!</h4>
        <p>{error}</p>
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        <h4 className="alert-heading">No Articles Found</h4>
        <p>No articles are available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="row">
      {articles.map((article) => (
        <div key={article.slug} className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body d-flex flex-column">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h5 className="card-title">{article.title}</h5>
                <small className="text-muted">
                  {new Date(article.createdAt).toLocaleDateString()}
                </small>
              </div>

              <p className="card-text text-muted flex-grow-1">
                {article.description}
              </p>

              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-wrap gap-1">
                  {article.tagList.map((tag) => (
                    <span key={tag} className="badge bg-secondary">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="d-flex align-items-center">
                  <button className="btn btn-outline-danger btn-sm me-2">
                    <i className="bi bi-heart"></i> {article.favoritesCount}
                  </button>
                  <small className="text-muted">
                    by {article.author.username}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
