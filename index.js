import express from "express";
import routes from './routes/index.js';

const app = express();
const PORT = 8080;

// app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () =>
  console.log(`Server listening on PORT ${PORT}`)
);
// server.on("error", (err) => console.log(`Error: ${err}`));

app.use("/", routes);


export default app;
