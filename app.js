const express = require("express");
const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

const urls = require("./urls/urls");

app.use(express.static("public"));

app.use("/urls", urls);

app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
  console.log("Started chota-url service");
});
