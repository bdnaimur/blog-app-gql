import { gql } from "@apollo/client";

export const GET_BLOGS_QUERY = gql`
  query GetBlogs {
     getBlogs {
        status {
          code
          message
        }
        blog {
          id
          title
          content
          author {
            email
          }
          created
          updated
        }
      }
  }
`;

export const GET_BLOGS_MY_QUERY = gql`
  query getMyBlogs{
    getMyBlogs {
        status {
          code
          message
        }
        blog {
          id
          title
          content
          author {
            email
          }
          created
          updated
        }
      }
  }
`;

export const GET_NOTIFICATIONS_QUERY = gql`
  query GetNotifications {
    notifications {
      id
      message
    }
  }
`;

export const LOGIN_QUERY = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      status {
        code
        message
      }
      user {
        id
        username
        email
        token
        created
        updated
        role
      }
      token
    }
  }
`;
