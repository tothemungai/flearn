const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const notes = require("./Routes/Notes/Notes");
app.use(bodyParser.json());
app.use(cors());
//routes
app.use("/note", notes);

const PORT = 5500;
app.listen(PORT, console.log(`Online at port ${PORT}`));
