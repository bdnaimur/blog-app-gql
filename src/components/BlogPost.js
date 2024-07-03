import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { DELETE_BLOG_MUTATION, UPDATE_BLOG_MUTATION } from '../graphql/mutations';
import { GET_BLOGS_QUERY } from '../graphql/queries';

const BlogPost = () => {
  const { data, loading, error } = useQuery(GET_BLOGS_QUERY);
  const [deleteBlog] = useMutation(DELETE_BLOG_MUTATION);
  const [updateBlog] = useMutation(UPDATE_BLOG_MUTATION);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDelete = (id) => {
    deleteBlog({ variables: { id } });
  };

  const handleUpdate = (id, title, content) => {
    updateBlog({ variables: { id, title, content } });
  };

  return (
    <div className="blog-post-container">
      {data.blogs.map((blog) => (
        <div key={blog.id} className="blog-post">
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
          <button onClick={() => handleDelete(blog.id)}>Delete</button>
          <button onClick={() => handleUpdate(blog.id, blog.title, blog.content)}>Update</button>
        </div>
      ))}
    </div>
  );
};

export default BlogPost;
