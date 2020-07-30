import pg from 'pg';
const Pool = pg.Pool;

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
let pool;
if(env === "development"){
    pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'googlekeep_db',
        password: 'postgres',
        port: 5432,
    });
}else{
    pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'googlekeep_testdb',
        password: 'password',
        port: 5433,
    });
}
export default pool;