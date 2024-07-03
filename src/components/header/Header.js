import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">MyBlog</Link>
      </div>
      <nav className="header-nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/myBlogs">My Blogs</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </nav>
      <div className="header-profile">
        <Link to="/profile">Profile</Link>
        <button className="logout-button">Logout</button>
      </div>
    </header>
  );
};

export default Header;
