import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import './myBlogPage.css';
import { GET_BLOGS_QUERY,GET_BLOGS_MY_QUERY } from '../../graphql/queries';

const MyBlogPage = () => {
//   const { loading, error, data, refetch } = useQuery(GET_BLOGS_MY_QUERY);

const { loading, error, data, refetch } = useQuery(GET_BLOGS_MY_QUERY, {
    fetchPolicy: 'network-only',
  });
  useEffect(() => {
    refetch();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="my-blogs-container">
      <h1>My Blogs</h1>
      {data?.getMyBlogs?.blog?.length > 0 ? (
        <div className="blogs-grid">
          {data.getMyBlogs.blog?.map((blog) => (
            <div key={blog.id} className="blog-card">
              <h2>{blog.title}</h2>
              <p>{blog.content}</p>
              <div className="blog-footer">
                <span>By {blog.author.email}</span>
                <span>{new Date(blog.created).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No blogs found.</p>
      )}
    </div>
  );
};

export default MyBlogPage;
