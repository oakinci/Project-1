import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// this component is for adding new products to our store
function AddProduct() {
  const navigate = useNavigate();
  // initialize state for our form
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    inStock: true
  });
  const [error, setError] = useState(null);
  // added this for future use
  const [isSubmitting, setIsSubmitting] = useState(false);

  // this function handles the input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // update the product state
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // clear error when user types
    if(error) {
      setError(null);
    }
  };

  // this submits the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // set submitting state
    
    // check if all fields are filled
    if (!product.name || !product.price || !product.category || !product.description) {
      setError('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    // TODO: add more validation later

    try {
      // convert price from string to number
      const productToSubmit = {
        ...product,
        price: parseFloat(product.price)
      };
      
      // send data to server
      const response = await axios.post('http://localhost:5001/api/products', productToSubmit);
      console.log('Product added:', response.data);
      
      // go back to products page
      navigate('/products');
    } catch (err) {
      setError('Failed to add product');
      console.error('Error adding product:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-product">
      <h1>Add New Product</h1>
      
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
          <button type="submit" className="btn btn-success" disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add Product'}
          </button>
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

export default AddProduct;