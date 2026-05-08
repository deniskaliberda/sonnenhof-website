import { pgTable, serial, varchar, text, boolean, timestamp, jsonb, integer } from 'drizzle-orm/pg-core';

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

export const inquiries = pgTable('inquiries', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  checkIn: varchar('check_in', { length: 20 }).notNull(),
  checkOut: varchar('check_out', { length: 20 }).notNull(),
  adults: integer('adults').notNull().default(1),
  children: integer('children').notNull().default(0),
  accommodation: varchar('accommodation', { length: 50 }).notNull(),
  message: text('message'),
  hasDog: boolean('has_dog').notNull().default(false),
  dogCount: integer('dog_count').notNull().default(0),
  dogSize: varchar('dog_size', { length: 20 }),
  dogBreed: varchar('dog_breed', { length: 200 }),
  emailSentToCustomer: boolean('email_sent_to_customer').notNull().default(false),
  emailSentToOwner: boolean('email_sent_to_owner').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const guestbookEntries = pgTable('guestbook_entries', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  ort: varchar('ort', { length: 120 }),
  stayPeriod: varchar('stay_period', { length: 80 }),
  accommodation: varchar('accommodation', { length: 80 }),
  rating: integer('rating'),
  message: text('message').notNull(),
  submitterEmail: varchar('submitter_email', { length: 255 }),
  status: varchar('status', { length: 20 }).notNull().default('pending'),
  source: varchar('source', { length: 20 }).notNull().default('web'),
  photoUrl: varchar('photo_url', { length: 1000 }),
  ipHash: varchar('ip_hash', { length: 64 }),
  honeypot: varchar('honeypot', { length: 255 }),
  approvedAt: timestamp('approved_at', { withTimezone: true }),
  approvedBy: integer('approved_by'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export type BlogPostInsert = typeof blogPosts.$inferInsert;
export type BlogPostSelect = typeof blogPosts.$inferSelect;
export type AdminUserSelect = typeof adminUsers.$inferSelect;
export type InquiryInsert = typeof inquiries.$inferInsert;
export type InquirySelect = typeof inquiries.$inferSelect;
export type GuestbookInsert = typeof guestbookEntries.$inferInsert;
export type GuestbookSelect = typeof guestbookEntries.$inferSelect;
