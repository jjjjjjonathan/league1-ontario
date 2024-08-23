import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import dotenv from 'dotenv';
// import { migrate } from 'drizzle-orm/postgres-js/migrator';

dotenv.config();

// for migrations
export const migrationClient = postgres(process.env.PG_URL || '', { max: 1 });

// for query purposes
const queryClient = postgres(process.env.PG_URL || '');
const db = drizzle(queryClient);

export default db;
