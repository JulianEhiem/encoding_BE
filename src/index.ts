// noinspection TypeScriptValidateTypes

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import MockData from "./utils/mockData.js";
import pg from 'pg';
import { config } from 'dotenv'

const {Pool} = pg;
config({
    override: true,
    path: '.env'
});

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: parseInt(process.env.PORT || '5432')
});

(async () => {
    const client = await pool.connect();
    try{
        const {rows} = await client.query('SELECT current_user');
        const currentUser = rows[0]['current_user'];
        console.log(currentUser);
    } catch(err){
        console.log(err)
    }finally {
        client.release()
    }
})();


const typeDefs = `#graphql
type Athlete {
    name: String
    sex: String
    specialty: String
}
type Query {
    athletes: [Athlete]
}
`;

const resolvers = {
    Query: {
        athletes: () => MockData,
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: { port: 3030 },
});

console.log(`🚀  Server ready at: ${url}`);