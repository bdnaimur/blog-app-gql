import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_BLOG_MUTATION } from '../graphql/mutations';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // const [createBlog, { loading, error }] = useMutation(CREATE_BLOG_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await createBlog({ variables: { title, content } });
      setTitle('');
      setContent('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="blog-form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" disabled={loading}>Create Blog</button>
        {/* {error && <p>Error: {error.message}</p>} */}
      </form>
    </div>
  );
};

export default BlogForm;
