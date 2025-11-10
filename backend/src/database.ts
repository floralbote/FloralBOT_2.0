
import { Pool } from 'pg';
import 'dotenv/config'; // Loads variables from .env file

// The Pool manages multiple connections to the database.
// It automatically reads the connection string from the DATABASE_URL environment variable.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // For production environments with SSL (Nhost requires this):
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// We export the query object from the pool to be used in the routes.
// This allows us to make queries in a simple way.
export const db = {
  query: (text: string, params?: any[]) => pool.query(text, params),
};

// Optional connection test
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client for PostgreSQL connection', err.stack);
  }
  console.log('Successfully connected to PostgreSQL database!');
  client.release(); // Release the client back to the pool
});
