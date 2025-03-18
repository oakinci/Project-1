import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    inStock: true
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/products/${id}`);
        const productData = response.data;
        setProduct({
          ...productData,
          price: productData.price.toString()
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product');
        setLoading(false);
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!product.name || !product.price || !product.category || !product.description) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Convert price to number
      const productToSubmit = {
        ...product,
        price: parseFloat(product.price)
      };
      
      await axios.put(`http://localhost:5001/api/products/${id}`, productToSubmit);
      navigate('/products');
    } catch (err) {
      setError('Failed to update product');
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="edit-product">
      <h1>Edit Product</h1>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              name="inStock"
              checked={product.inStock}
              onChange={handleChange}
            />
            In Stock
          </label>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Update Product</button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/products')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;