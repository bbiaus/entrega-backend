import Container from "./containers/Container.js";
import express from "express";

const ProductContainer = new Container("productos");
const app = express();
const PORT = 8080;

app.get("/productos", async (req, res) => {
  const productos = await ProductContainer.getAll();
  res.send(productos);
});

app.get("/productos/random", async (req, res) => {
  const productos = await ProductContainer.getAll();
  const cantidadProductos = productos.length
	const randomIndex = Math.floor(Math.random()*cantidadProductos)
  res.send(productos[randomIndex]);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
