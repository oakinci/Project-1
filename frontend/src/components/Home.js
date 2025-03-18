import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <h1>Welcome to Product Management</h1>
      <p>This application allows you to manage products with CRUD operations.</p>
      <div className="home-actions">
        <Link to="/products" className="btn btn-primary">
          View Products
        </Link>
      </div>
    </div>
  );
}

export default Home;