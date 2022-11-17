import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

import router from "./api";
import { PORT, FILES_ENDPOINT } from "./constants"
import { DIRECTORY } from "./fileUpload";


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("combined"));

app.use(FILES_ENDPOINT, express.static(DIRECTORY));

app.use(router);

app.listen(PORT, () => {
    console.log(`App listening to port ${PORT}...`);
});
