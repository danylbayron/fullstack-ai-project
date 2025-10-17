import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArticleQuery, ArticleFeedType } from "../types/article";
import { articleService } from "../services/article-service";

// Query Keys Factory - Centralized key management
export const articleKeys = {
  all: ["articles"] as const,
  lists: () => [...articleKeys.all, "list"] as const,
  list: (query: ArticleQuery) => [...articleKeys.lists(), query] as const,
  tags: () => [...articleKeys.all, "tags"] as const,
  feed: (query: ArticleQuery) => [...articleKeys.all, "feed", query] as const,
  global: (query: ArticleQuery) =>
    [...articleKeys.all, "global", query] as const,
  byTag: (tag: string, query: ArticleQuery) =>
    [...articleKeys.all, "tag", tag, query] as const,
};

// Hook for fetching articles with different feed types
export function useArticles(query: ArticleQuery) {
  return useQuery({
    queryKey: articleKeys.list(query),
    queryFn: () => articleService.getArticles(query),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook for fetching global articles
export function useGlobalArticles(limit: number = 10, offset: number = 0) {
  return useQuery({
    queryKey: articleKeys.global({ feed: "global", limit, offset }),
    queryFn: () => articleService.getGlobalArticles(limit, offset),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// Hook for fetching feed articles (authenticated)
export function useFeedArticles(limit: number = 10, offset: number = 0) {
  return useQuery({
    queryKey: articleKeys.feed({ feed: "feed", limit, offset }),
    queryFn: () => articleService.getFeedArticles(limit, offset),
    staleTime: 2 * 60 * 1000, // 2 minutes (shorter for personal feed)
    gcTime: 5 * 60 * 1000,
    enabled: false, // Disabled by default - requires authentication
  });
}

// Hook for fetching articles by tag
export function useArticlesByTag(
  tag: string,
  limit: number = 10,
  offset: number = 0
) {
  return useQuery({
    queryKey: articleKeys.byTag(tag, { feed: "tag", tag, limit, offset }),
    queryFn: () => articleService.getArticlesByTag(tag, limit, offset),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!tag, // Only run if tag is provided
  });
}

// Hook for fetching all tags
export function useTags() {
  return useQuery({
    queryKey: articleKeys.tags(),
    queryFn: () => articleService.getTags(),
    staleTime: 10 * 60 * 1000, // 10 minutes (tags change less frequently)
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Hook for invalidating article queries
export function useArticleInvalidation() {
  const queryClient = useQueryClient();

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: articleKeys.all });
  };

  const invalidateByFeed = (feedType: ArticleFeedType) => {
    queryClient.invalidateQueries({
      queryKey: [...articleKeys.all, feedType],
    });
  };

  const invalidateByTag = (tag: string) => {
    queryClient.invalidateQueries({
      queryKey: [...articleKeys.all, "tag", tag],
    });
  };

  return {
    invalidateAll,
    invalidateByFeed,
    invalidateByTag,
  };
}
