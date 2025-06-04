import { initializeDatabase } from '@event-mingle/database';

// Initialize database client with environment variables
const db = initializeDatabase(process.env);

// Export the database client
export { db }; 