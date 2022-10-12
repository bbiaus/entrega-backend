import express from 'express';

import api from './api/index.js';

const routes = express.Router();

routes.get('/', (req, res) => res.sendStatus(200));
routes.use('/api', api);

export default routes;