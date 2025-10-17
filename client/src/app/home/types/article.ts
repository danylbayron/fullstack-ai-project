import { z } from "zod";

// Article Author Schema
export const AuthorSchema = z.object({
  id: z.number(),
  username: z.string(),
  bio: z.string().nullable(),
  image: z.string().nullable(),
  following: z.boolean().optional(),
});

// Article Schema
export const ArticleSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  body: z.string(),
  tagList: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
  favorited: z.boolean(),
  favoritesCount: z.number(),
  author: AuthorSchema,
});

// Articles Response Schema
export const ArticlesResponseSchema = z.object({
  articles: z.array(ArticleSchema),
  articlesCount: z.number(),
});

// Tags Response Schema
export const TagsResponseSchema = z.object({
  tags: z.array(z.string()),
});

// Article Feed Type
export const ArticleFeedTypeSchema = z.enum(["feed", "global", "tag"]);

// Article Query Parameters Schema
export const ArticleQuerySchema = z.object({
  feed: ArticleFeedTypeSchema.optional(),
  tag: z.string().optional(),
  limit: z.number().min(1).max(100).default(10),
  offset: z.number().min(0).default(0),
});

// Pagination Schema
export const PaginationSchema = z.object({
  currentPage: z.number().min(1).default(1),
  totalPages: z.number().min(0).default(0),
  totalItems: z.number().min(0).default(0),
  itemsPerPage: z.number().min(1).default(10),
});

// TypeScript Types
export type Author = z.infer<typeof AuthorSchema>;
export type Article = z.infer<typeof ArticleSchema>;
export type ArticlesResponse = z.infer<typeof ArticlesResponseSchema>;
export type TagsResponse = z.infer<typeof TagsResponseSchema>;
export type ArticleFeedType = z.infer<typeof ArticleFeedTypeSchema>;
export type ArticleQuery = z.infer<typeof ArticleQuerySchema>;
export type Pagination = z.infer<typeof PaginationSchema>;

// Article List State
export interface ArticleListState {
  articles: Article[];
  pagination: Pagination;
  selectedTag: string | null;
  feedType: ArticleFeedType;
  isLoading: boolean;
  error: string | null;
}
