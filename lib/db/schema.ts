import { pgTable, serial, varchar, text, boolean, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const blogPosts = pgTable('blog_posts', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).unique().notNull(),
  title: varchar('title', { length: 500 }).notNull(),
  h1: varchar('h1', { length: 500 }).notNull(),
  description: text('description').notNull(),
  content: text('content').notNull(),
  category: varchar('category', { length: 100 }).notNull().default('Unterkunft & Tipps'),
  keywords: jsonb('keywords').$type<string[]>().notNull().default([]),
  heroImage: varchar('hero_image', { length: 1000 }).notNull().default('/images/hero/hero-sonnenhof.jpg'),
  faqItems: jsonb('faq_items').$type<{ question: string; answer: string }[]>().notNull().default([]),
  published: boolean('published').notNull().default(false),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const adminUsers = pgTable('admin_users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export type BlogPostInsert = typeof blogPosts.$inferInsert;
export type BlogPostSelect = typeof blogPosts.$inferSelect;
export type AdminUserSelect = typeof adminUsers.$inferSelect;
