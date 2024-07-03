import { gql } from '@apollo/client';

// export const LOGIN_MUTATION = gql`
//   mutation Login($username: String!, $password: String!) {
//     login(username: $username, password: $password) {
//       token
//     }
//   }
// `;

export const CREATE_BLOG_MUTATION = gql`
  mutation CreateBlog($title: String!, $content: String!) {
    createBlog(title: $title, content: $content) {
      id
      title
      content
      approved
    }
  }
`;

export const DELETE_BLOG_MUTATION = gql`
  mutation DeleteBlog($id: ID!) {
    deleteBlog(id: $id)
  }
`;

export const UPDATE_BLOG_MUTATION = gql`
  mutation UpdateBlog($id: ID!, $title: String!, $content: String!) {
    updateBlog(id: $id, title: $title, content: $content) {
      id
      title
      content
      approved
    }
  }
`;
