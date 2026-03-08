/**
 * Seed script: Creates the initial admin user.
 *
 * Usage:
 *   npx tsx scripts/seed-admin.ts
 *
 * Requirements:
 *   - DATABASE_URL environment variable must be set
 *   - Database tables must exist (run `npx drizzle-kit push` first)
 *
 * Default credentials (change after first login!):
 *   Email: admin@sonnenhof-herrsching.de
 *   Password: sonnenhof2026
 */

import bcrypt from 'bcryptjs';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { adminUsers } from '../lib/db/schema';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL environment variable is required');
  process.exit(1);
}

const sql = neon(DATABASE_URL);
const db = drizzle(sql);

async function seed() {
  const email = process.argv[2] || 'admin@sonnenhof-herrsching.de';
  const password = process.argv[3] || 'sonnenhof2026';
  const name = process.argv[4] || 'Sonnenhof Admin';

  console.log('Creating admin user...');
  console.log(`  Email: ${email}`);
  console.log(`  Name:  ${name}`);

  const passwordHash = await bcrypt.hash(password, 12);

  try {
    await db.insert(adminUsers).values({
      email,
      passwordHash,
      name,
    });
    console.log('\nAdmin user created successfully!');
    console.log('\nBitte ändere das Passwort nach dem ersten Login.');
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes('unique')) {
      console.log('\nAdmin user already exists.');
    } else {
      console.error('\nError creating admin user:', err);
    }
  }
}

seed().catch(console.error);
