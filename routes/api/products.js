import express from "express";

import Container from "../../containers/Container.js";

const products = express.Router();
products.use(express.json());

const ProductContainer = new Container("productos");

products.get("/", async (req, res) => {
  const productos = await ProductContainer.getAll();
  res.send({products: productos});
});

products.post("/", async (req, res) => {
	const productoId = await ProductContainer.save(req.body);
	res.send({message:`Producto ${productoId} agregado`});
});

export default products;
