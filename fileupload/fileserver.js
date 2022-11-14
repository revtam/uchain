
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const express = require("express");
const morgan = require("morgan")

const router = require("./api.js")
const { DIRECTORY } = require("./fileUpload.js")


const PORT = process.env.PORT || 3000;

const app = express()

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("combined"))

app.use(process.env.FILES_ENDPOINT || "/files", express.static(DIRECTORY))

app.use(router)

app.listen(PORT, () => {
    console.log(`App listening to port ${PORT}...`);
});