import { ApolloServer } from '@apollo/server';
import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';
import resolvers from './graphql/images/resolvers';
import imageSchema from './graphql/images/schema';

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.

const apolloServer = new ApolloServer({
    typeDefs: imageSchema,
    resolvers,
    introspection: true,
  });

export const graphqlHandler = startServerAndCreateLambdaHandler(
  apolloServer,
  handlers.createAPIGatewayProxyEventV2RequestHandler()
);
  