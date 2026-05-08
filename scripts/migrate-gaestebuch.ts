/**
 * Migration: Adds dog fields to inquiries + creates guestbook_entries table.
 *
 * Usage:
 *   npx tsx scripts/migrate-gaestebuch.ts
 *
 * Idempotent — safe to run multiple times. Uses IF NOT EXISTS guards.
 */

import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL environment variable is required');
  process.exit(1);
}

const sql = neon(DATABASE_URL);

async function migrate() {
  console.log('Migration: gaestebuch + dog fields');

  console.log('  -> ALTER inquiries (dog fields)');
  await sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS has_dog boolean NOT NULL DEFAULT false`;
  await sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS dog_count integer NOT NULL DEFAULT 0`;
  await sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS dog_size varchar(20)`;
  await sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS dog_breed varchar(200)`;

  console.log('  -> CREATE guestbook_entries');
  await sql`
    CREATE TABLE IF NOT EXISTS guestbook_entries (
      id serial PRIMARY KEY,
      name varchar(100) NOT NULL,
      ort varchar(120),
      stay_period varchar(80),
      accommodation varchar(80),
      rating integer,
      message text NOT NULL,
      submitter_email varchar(255),
      status varchar(20) NOT NULL DEFAULT 'pending',
      source varchar(20) NOT NULL DEFAULT 'web',
      photo_url varchar(1000),
      ip_hash varchar(64),
      honeypot varchar(255),
      approved_at timestamptz,
      approved_by integer,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    )
  `;

  console.log('  -> CREATE indexes');
  await sql`CREATE INDEX IF NOT EXISTS guestbook_status_idx ON guestbook_entries(status)`;
  await sql`CREATE INDEX IF NOT EXISTS guestbook_created_idx ON guestbook_entries(created_at DESC)`;

  console.log('Migration complete.');
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
