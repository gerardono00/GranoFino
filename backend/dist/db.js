"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
pool.connect()
    .then((client) => {
    console.log('PostgreSQL Pool conectado exitosamente a la base de datos.');
    client.release();
})
    .catch((err) => {
    console.error('Error al conectar el Pool de PostgreSQL:', err.message);
});
exports.default = pool;
