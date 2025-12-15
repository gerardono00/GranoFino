import mysql from "mysql2/promise";

export const db = mysql.createPool({
  // 🚨 ¡DEBE USAR process.env! 🚨
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});