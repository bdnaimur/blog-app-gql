import React from 'react';
import BlogForm from './BlogForm';
import BlogPost from './BlogPost';
import Notification from './Notification';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* <Notification /> */}
      <BlogForm />
      <BlogPost />
    </div>
  );
};

export default Dashboard;
