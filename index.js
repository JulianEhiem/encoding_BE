import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import MockData from "./utils/mockData.js";
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
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 3030 },
});
console.log(`🚀  Server ready at: ${url}`);
