import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    token: String
    created: String!
    updated: String!
    role: String!
  }

  type Blog {
    id: ID!
    title: String!
    content: String!
    author: User!
    created: String!
    updated: String!
  }

  type Status {
    code: Int!
    message: String!
  }

  type BlogResponse {
    status: Status!
    blog: Blog
  }
  type MyBlogResponse{
  status: Status!
  blog: [Blog]
  }

  type UserResponse {
    status: Status!
    user: User
    token: String
  }

  type DeleteResponse {
    status: Status!
  }

  type Query {
    getBlogs: [BlogResponse]
    getMyBlogs: MyBlogResponse
    getUser(username: String!): UserResponse
    getBlog(id: ID!): BlogResponse
    getUsers: [UserResponse]
    login(email: String!, password: String!): UserResponse
  }

  type Mutation {
    register(username: String!, email: String!, password: String!, role: String!): UserResponse
    createBlog(title: String!, content: String!): BlogResponse
    deleteBlog(id: ID!, token: String!): DeleteResponse
    updateBlog(id: ID!, title: String, content: String): BlogResponse
  }
`;

export { typeDefs };
