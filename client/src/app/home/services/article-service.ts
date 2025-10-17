import { ArticleQuery, ArticlesResponse, TagsResponse } from "../types/article";

// Base API configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.realworld.io/api";

// Article Service Class - Single Responsibility: Handle all article-related API calls
export class ArticleService {
  private static instance: ArticleService;
  private baseUrl: string;

  private constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // Singleton pattern for service instance
  public static getInstance(baseUrl?: string): ArticleService {
    if (!ArticleService.instance) {
      ArticleService.instance = new ArticleService(baseUrl);
    }
    return ArticleService.instance;
  }

  // Get articles with query parameters
  public async getArticles(query: ArticleQuery): Promise<ArticlesResponse> {
    const searchParams = new URLSearchParams();

    if (query.limit) searchParams.append("limit", query.limit.toString());
    if (query.offset) searchParams.append("offset", query.offset.toString());
    if (query.tag) searchParams.append("tag", query.tag);

    const endpoint = query.feed === "feed" ? "/articles/feed" : "/articles";
    const url = `${this.baseUrl}${endpoint}?${searchParams.toString()}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw new Error("Failed to fetch articles");
    }
  }

  // Get all available tags
  public async getTags(): Promise<TagsResponse> {
    const url = `${this.baseUrl}/tags`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching tags:", error);
      throw new Error("Failed to fetch tags");
    }
  }

  // Get articles by tag
  public async getArticlesByTag(
    tag: string,
    limit: number = 10,
    offset: number = 0
  ): Promise<ArticlesResponse> {
    return this.getArticles({ feed: "tag", tag, limit, offset });
  }

  // Get global articles
  public async getGlobalArticles(
    limit: number = 10,
    offset: number = 0
  ): Promise<ArticlesResponse> {
    return this.getArticles({ feed: "global", limit, offset });
  }

  // Get feed articles (requires authentication)
  public async getFeedArticles(
    limit: number = 10,
    offset: number = 0
  ): Promise<ArticlesResponse> {
    return this.getArticles({ feed: "feed", limit, offset });
  }
}

// Export singleton instance
export const articleService = ArticleService.getInstance();
