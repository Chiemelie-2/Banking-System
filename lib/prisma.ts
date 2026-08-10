// lib/prisma.ts
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  pgPool: Pool | undefined
}

const pool =
  globalForPrisma.pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // Supabase requires SSL
    max: 5,                              // safe per-instance cap for serverless
    idleTimeoutMillis: 30_000,           // close idle clients proactively instead of
                                          // letting Supabase's pooler drop them unexpectedly
    connectionTimeoutMillis: 10_000,
  })

// Prevent an unhandled pool-level error (e.g. a dropped idle connection)
// from crashing the whole dev server process
pool.on('error', (err) => {
  console.error('Unexpected PG pool error:', err.message)
})

const adapter = new PrismaPg(pool)

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
  globalForPrisma.pgPool = pool
}