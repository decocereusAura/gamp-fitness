// First, create a file at /lib/db.ts
import { createPool, Pool } from "@vercel/postgres";

// Check if we've already created a pool
let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    pool = createPool({
      connectionString: process.env.POSTGRES_URL,
      max: 10, // Maximum number of connections in the pool
      ssl: {
        rejectUnauthorized: false, // Required for Vercel Postgres
      },
    });
  }
  return pool;
}

// Export the pool getter
export const db = getPool();
