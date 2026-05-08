/**
 * Migration: Adds dog fields to inquiries + creates guestbook_entries table.
 *
 * Usage:
 *   npx tsx scripts/migrate-gaestebuch.ts
 *
 * Idempotent — safe to run multiple times.
 * - Creates `inquiries` if it does not exist (with dog fields built in)
 * - Adds dog fields to `inquiries` if the table already existed without them
 * - Creates `guestbook_entries` if it does not exist
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

  console.log('  -> CREATE inquiries (if not exists)');
  await sql`
    CREATE TABLE IF NOT EXISTS inquiries (
      id serial PRIMARY KEY,
      name varchar(255) NOT NULL,
      email varchar(255) NOT NULL,
      check_in varchar(20) NOT NULL,
      check_out varchar(20) NOT NULL,
      adults integer NOT NULL DEFAULT 1,
      children integer NOT NULL DEFAULT 0,
      accommodation varchar(50) NOT NULL,
      message text,
      has_dog boolean NOT NULL DEFAULT false,
      dog_count integer NOT NULL DEFAULT 0,
      dog_size varchar(20),
      dog_breed varchar(200),
      email_sent_to_customer boolean NOT NULL DEFAULT false,
      email_sent_to_owner boolean NOT NULL DEFAULT false,
      created_at timestamptz NOT NULL DEFAULT now()
    )
  `;

  console.log('  -> ALTER inquiries (ensure dog fields)');
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

  // Verify
  const tables = await sql`
    SELECT table_name FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name IN ('inquiries', 'guestbook_entries')
    ORDER BY table_name
  ` as { table_name: string }[];
  console.log('  -> Verified tables:', tables.map((t) => t.table_name).join(', '));

  console.log('Migration complete.');
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
