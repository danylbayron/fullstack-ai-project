"use client";

import { Pagination as PaginationType } from "../types/article";

interface PaginationProps {
  pagination: PaginationType;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

// Pagination Component - Single Responsibility: Handle pagination navigation
export function Pagination({
  pagination,
  onPageChange,
  isLoading,
}: PaginationProps) {
  const { currentPage, totalPages, totalItems, itemsPerPage } = pagination;

  if (totalPages <= 1) {
    return null;
  }

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="text-muted">
        Showing {startItem} to {endItem} of {totalItems} articles
      </div>

      <nav aria-label="Article pagination">
        <ul className="pagination pagination-sm mb-0">
          {/* Previous button */}
          <li
            className={`page-item ${
              currentPage === 1 || isLoading ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1 || isLoading}
              aria-label="Previous page"
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>

          {/* Page numbers */}
          {pageNumbers.map((page, index) => (
            <li
              key={index}
              className={`page-item ${page === currentPage ? "active" : ""} ${
                page === "..." ? "disabled" : ""
              }`}
            >
              {page === "..." ? (
                <span className="page-link">...</span>
              ) : (
                <button
                  className="page-link"
                  onClick={() => onPageChange(page as number)}
                  disabled={isLoading}
                  aria-label={`Go to page ${page}`}
                  aria-current={page === currentPage ? "page" : undefined}
                >
                  {page}
                </button>
              )}
            </li>
          ))}

          {/* Next button */}
          <li
            className={`page-item ${
              currentPage === totalPages || isLoading ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages || isLoading}
              aria-label="Next page"
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
