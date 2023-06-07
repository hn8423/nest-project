import { JsonDB, Config } from 'node-json-db';
// Create an instance of JsonDB
const db = new JsonDB(new Config('movieDatabase', true, false, '/'));

// Create a sample data object
export interface MovieType {
  id?: number;
  title?: string;
  year?: number;
  genres?: string[];
}
const defaultData = [] as MovieType;

// Write the data to the database
db.push('/movieArray', defaultData, true);

export default db;
