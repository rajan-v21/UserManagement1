import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from "@apollo/client";
import { fetchAllUsers, fetchUser } from './fetchUsers';

// GraphQL Schema Definition
const typeDefs = gql`
  type Query {
    getAllUsers: [User]
    getUser(id: ID!): User
  }

  type User {
    id: ID!
    name: String!
    email: String!
    username: String!
    phone: String!
    website: String!
    address: Address!
    company: Company!
  }

  type Address {
      street: String!
      suite: String!
      city: String!
      zipcode: String!
    }
  type Company {
      name: String!
  }
`;

// GraphQL Resolvers
const resolvers = {
  Query: {
    getAllUsers: async () => await fetchAllUsers(),
    getUser: async (parent, { id }) => await fetchUser(id),
  },
};

export const config = {
  api: {
    bodyParser: false,
  },
};

// Initialize Apollo Server
const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const POST = startServerAndCreateNextHandler(apolloServer);