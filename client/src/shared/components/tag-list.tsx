"use client";

import { useState } from "react";

interface TagListProps {
  tags: string[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
  isLoading?: boolean;
  error?: string | null;
}

// Tag List Component - Single Responsibility: Display and handle tag selection
export function TagList({
  tags,
  selectedTag,
  onTagSelect,
  isLoading,
  error,
}: TagListProps) {
  const [showAll, setShowAll] = useState(false);
  const maxVisibleTags = 10;

  if (isLoading) {
    return (
      <div className="card">
        <div className="card-body">
          <h6 className="card-title">Popular Tags</h6>
          <div className="d-flex flex-wrap gap-1">
            {Array.from({ length: 8 }).map((_, index) => (
              <span key={index} className="badge bg-secondary placeholder">
                Loading...
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="card-body">
          <h6 className="card-title">Popular Tags</h6>
          <div className="alert alert-warning alert-sm mb-0">
            Failed to load tags
          </div>
        </div>
      </div>
    );
  }

  if (!tags || tags.length === 0) {
    return (
      <div className="card">
        <div className="card-body">
          <h6 className="card-title">Popular Tags</h6>
          <p className="text-muted mb-0">No tags available</p>
        </div>
      </div>
    );
  }

  const visibleTags = showAll ? tags : tags.slice(0, maxVisibleTags);
  const hasMoreTags = tags.length > maxVisibleTags;

  return (
    <div className="card">
      <div className="card-body">
        <h6 className="card-title">Popular Tags</h6>
        <div className="d-flex flex-wrap gap-1">
          {/* Clear filter button */}
          {selectedTag && (
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => onTagSelect(null)}
            >
              Clear Filter
            </button>
          )}

          {/* Tag buttons */}
          {visibleTags.map((tag) => (
            <button
              key={tag}
              className={`btn btn-sm ${
                selectedTag === tag ? "btn-primary" : "btn-outline-secondary"
              }`}
              onClick={() => onTagSelect(selectedTag === tag ? null : tag)}
            >
              {tag}
            </button>
          ))}

          {/* Show more/less button */}
          {hasMoreTags && (
            <button
              className="btn btn-link btn-sm text-decoration-none"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : `+${tags.length - maxVisibleTags} More`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
