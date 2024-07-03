import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_BLOGS_QUERY, GET_NOTIFICATIONS_QUERY } from '../graphql/queries';
import { CREATE_BLOG_MUTATION, DELETE_BLOG_MUTATION, UPDATE_BLOG_MUTATION } from '../graphql/mutations';

const DashboardPage = () => {
  const { data: blogsData, refetch: refetchBlogs } = useQuery(GET_BLOGS_QUERY);
  const { data: notificationsData } = useQuery(GET_NOTIFICATIONS_QUERY);
  const [createBlog] = useMutation(CREATE_BLOG_MUTATION, { onCompleted: refetchBlogs });
  const [deleteBlog] = useMutation(DELETE_BLOG_MUTATION, { onCompleted: refetchBlogs });
  const [updateBlog] = useMutation(UPDATE_BLOG_MUTATION, { onCompleted: refetchBlogs });

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editBlogId, setEditBlogId] = useState(null);

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    if (editMode) {
      await updateBlog({ variables: { id: editBlogId, title, content } });
    } else {
      await createBlog({ variables: { title, content } });
    }
    setTitle('');
    setContent('');
    setEditMode(false);
    setEditBlogId(null);
  };

  const handleEdit = (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setEditMode(true);
    setEditBlogId(blog.id);
  };

  const handleDelete = async (id) => {
    await deleteBlog({ variables: { id } });
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <form onSubmit={handleCreateOrUpdate} className="blog-form-container">
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
        ></textarea>
        <button type="submit">{editMode ? 'Update Blog' : 'Create Blog'}</button>
      </form>
      <div className="blog-post-container">
        {blogsData?.blogs.map((blog) => (
          <div key={blog.id} className="blog-post">
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            <button onClick={() => handleEdit(blog)}>Edit</button>
            <button onClick={() => handleDelete(blog.id)}>Delete</button>
          </div>
        ))}
      </div>
      <div className="notification-container">
        {notificationsData?.notifications.length > 0 && (
          <div className="notification-bell">
            🔔 <span className="notification-count">{notificationsData.notifications.length}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
