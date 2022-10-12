
import express from "express";

import Container from "../../containers/Container.js";

const product = express.Router();
product.use(express.json());

const ProductContainer = new Container("productos");

product.get("/:id", async (req, res) => {
  const producto = await ProductContainer.getById(req.params.id);
  res.send({product: producto});
});

product.put("/:id", async (req, res) => {
  await ProductContainer.updateById(req.params.id, req.body);
  res.send({message: `Producto ${req.params.id} actualizado`});
});

product.delete("/:id", async (req, res) => {
  await ProductContainer.deleteById(req.params.id);
  res.send({message: `Producto ${req.params.id} eliminado`});
});

export default product;
