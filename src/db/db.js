import pg from 'pg';
import { config } from 'dotenv'
config({
    override: true,
    path: './development.env'
});

const {Pool} = pg;

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: parseInt(process.env.PORT || '5434')
})

export const query = async (text, params, callback) => {
    const client = await pool.connect();
    try{
        return client.query(text, params, callback);
    } catch(err){
        console.log(err);
    }finally {
        client.release()
    }
};