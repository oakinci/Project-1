const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory data store
let products = [
  {
    id: 1,
    name: "Smartphone X",
    price: 999.99,
    category: "Electronics",
    description: "Latest smartphone with advanced features",
    inStock: true
  },
  {
    id: 2,
    name: "Laptop Pro",
    price: 1499.99,
    category: "Electronics",
    description: "High-performance laptop for professionals",
    inStock: true
  },
  {
    id: 3,
    name: "Wireless Headphones",
    price: 199.99,
    category: "Audio",
    description: "Noise-cancelling wireless headphones",
    inStock: false
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 299.99,
    category: "Wearables",
    description: "Fitness and health tracking smartwatch",
    inStock: true
  }
];

// GET all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET a single product by ID
app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  res.json(product);
});

// POST a new product
app.post('/api/products', (req, res) => {
  const newProduct = {
    id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
    ...req.body
  };
  
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT (update) a product
app.put('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  products[index] = { ...products[index], ...req.body, id };
  res.json(products[index]);
});

// DELETE a product
app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  const deletedProduct = products[index];
  products = products.filter(p => p.id !== id);
  
  res.json(deletedProduct);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});