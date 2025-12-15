import { Pool, PoolClient } from 'pg'; 

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.connect()
  .then((client: PoolClient) => { 
    console.log('PostgreSQL Pool conectado exitosamente a la base de datos.');
    
    client.release(); 
  })
  .catch((err: Error) => { 
    
 
    console.error('Error al conectar el Pool de PostgreSQL:', err.message);

 
  });


export default pool;