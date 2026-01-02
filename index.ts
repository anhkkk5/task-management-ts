import express, { Express, Request, Response } from "express";
import * as database from "./config/database";
import dotenv from "dotenv";
import mainV1Routes from "./api/v1/routes/index.route";

dotenv.config();

database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mainV1Routes(app);
// Lắng nghe cổng
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
