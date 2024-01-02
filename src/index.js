import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import MockData from "./utils/mockData.js";
import * as db from "./db/db.js";

const result = await db.query('SELECT * FROM athlete');
console.log(result.rows);
const typeDefs = `#graphql
type Athlete {
    id: ID,
    firstname: String,
    middleInitial: String,
    lastname: String,
    age: Int,
    country: String,
    sport: String,
    mainEvent: String

}
type Query {
    athletes: [Athlete]
}
`;
const resolvers = {
    Query: {
        athletes: async () => {
            const result = await db.query('SELECT * FROM athlete')
            return result.rows;
        }
    },
};
const server = new ApolloServer({
    typeDefs,
    resolvers
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 3030 },
});
console.log(`🚀  Server ready at: ${url}`);
