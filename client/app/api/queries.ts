// graphql/queries.ts
"use client";
import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      name
    }
  }
`;


export const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
    name
    username
    email
    website
    phone
    address {
      street
      suite
      city
      zipcode
    }
    company {
      name
    }
  }
  }
`;