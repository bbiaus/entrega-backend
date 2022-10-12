import express from 'express';

import product from './product.js';
import products from './products.js';

const api = express.Router();

api.use('/product', product);
api.use('/products', products);

export default api;