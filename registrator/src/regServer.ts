import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

import { PORT } from "./constants";

const app = express();

const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));

app.use(router);

app.listen(PORT, () => {
    console.log(`App listening to port ${PORT}...`);
});
