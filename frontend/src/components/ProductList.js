import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5001/api/products');
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch products');
      setLoading(false);
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5001/api/products/${id}`);
        fetchProducts();
      } catch (err) {
        setError('Failed to delete product');
        console.error(err);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-list">
      <div className="product-list-header">
        <h1>Products</h1>
        <Link to="/products/add" className="btn btn-success">
          Add New Product
        </Link>
      </div>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Description:</strong> {product.description}</p>
              <p><strong>In Stock:</strong> {product.inStock ? 'Yes' : 'No'}</p>
              <div className="product-actions">
                <Link to={`/products/edit/${product.id}`} className="btn btn-primary">
                  Edit
                </Link>
                <button 
                  onClick={() => handleDelete(product.id)} 
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;