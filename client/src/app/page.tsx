"use client";

import { useState, useMemo } from "react";
import {
  ArticleList,
  TagList,
  Pagination,
  FeedTabs,
  useArticles,
  useTags,
  useGlobalArticles,
  useFeedArticles,
  useArticlesByTag,
  ArticleFeedType,
  ArticleQuerySchema,
  PaginationSchema,
} from "../shared";

export default function Home() {
  // State management
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [activeFeed, setActiveFeed] = useState<ArticleFeedType>("global");
  const [isAuthenticated] = useState(false); // TODO: Implement authentication

  // Query parameters
  const itemsPerPage = 10;
  const offset = (currentPage - 1) * itemsPerPage;

  // Query parameters object
  const queryParams = useMemo(() => {
    const baseQuery = {
      limit: itemsPerPage,
      offset,
    };

    if (selectedTag) {
      return { ...baseQuery, feed: "tag" as const, tag: selectedTag };
    }

    return { ...baseQuery, feed: activeFeed };
  }, [activeFeed, selectedTag, itemsPerPage, offset]);

  // Data fetching hooks
  const {
    data: tagsData,
    isLoading: tagsLoading,
    error: tagsError,
  } = useTags();

  // Conditional data fetching based on feed type and tag selection
  const globalQuery = useGlobalArticles(itemsPerPage, offset);
  const feedQuery = useFeedArticles(itemsPerPage, offset);
  const tagQuery = useArticlesByTag(selectedTag || "", itemsPerPage, offset);

  // Select appropriate query result
  const articlesQuery = useMemo(() => {
    if (selectedTag) return tagQuery;
    if (activeFeed === "feed") return feedQuery;
    return globalQuery;
  }, [selectedTag, activeFeed, tagQuery, feedQuery, globalQuery]);

  // Extract data from query
  const {
    data: articlesData,
    isLoading: articlesLoading,
    error: articlesError,
  } = articlesQuery;

  // Process articles data
  const articles = articlesData?.articles || [];
  const articlesCount = articlesData?.articlesCount || 0;

  // Calculate pagination
  const totalPages = Math.ceil(articlesCount / itemsPerPage);
  const pagination = {
    currentPage,
    totalPages,
    totalItems: articlesCount,
    itemsPerPage,
  };

  // Event handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTagSelect = (tag: string | null) => {
    setSelectedTag(tag);
    setCurrentPage(1); // Reset to first page when changing filters
  };

  const handleFeedChange = (feed: ArticleFeedType) => {
    setActiveFeed(feed);
    setSelectedTag(null); // Clear tag filter when changing feed
    setCurrentPage(1);
  };

  // Error handling
  const error = articlesError?.message || tagsError?.message || null;
  const isLoading = articlesLoading || tagsLoading;

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Main Content */}
        <div className="col-lg-8">
          {/* Feed Tabs */}
          <FeedTabs
            activeFeed={activeFeed}
            onFeedChange={handleFeedChange}
            isAuthenticated={isAuthenticated}
          />

          {/* Articles List */}
          <ArticleList
            articles={articles}
            isLoading={isLoading}
            error={error}
          />

          {/* Pagination */}
          {articles.length > 0 && (
            <div className="mt-4">
              <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
                isLoading={isLoading}
              />
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="col-lg-4">
          <div className="sticky-top" style={{ top: "1rem" }}>
            {/* Tags */}
            <TagList
              tags={tagsData?.tags || []}
              selectedTag={selectedTag}
              onTagSelect={handleTagSelect}
              isLoading={tagsLoading}
              error={tagsError?.message || null}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
