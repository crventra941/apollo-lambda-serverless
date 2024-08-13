import { ApolloServer } from '@apollo/server';
import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';

const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const books = [
    {
      title: 'Athomic Habits',
      author: 'James Clear',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      books: () => books,
    },
  };

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
  });

export const graphqlHandler = startServerAndCreateLambdaHandler(
  apolloServer,
  handlers.createAPIGatewayProxyEventV2RequestHandler()
);
  