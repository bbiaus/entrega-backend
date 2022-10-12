import express from "express";
import routes from './routes/index.js';

const app = express();
const PORT = 8080;

app.listen(PORT, () =>
  console.log(`Server listening on PORT ${PORT}`)
);

app.use("/", routes);


export default app;
