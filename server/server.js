import React from "react";
import express from "express";
import { renderToString } from "react-dom/server";
import App from "../src/App";
// const App = require("../src/App");
const ReactDOMServer = require("react-dom/server");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const { StaticRouter } = require("react-router-dom");

const app = express();


app.use(cors());
app.get(
  /\.(js|css|map|ico|png)$/,
  express.static(path.resolve(__dirname, "../dist"))
);
app.get("/", async (req, res) => {
  try {
    let componentData = {};
    let indexHTML = fs.readFileSync(
      path.resolve(__dirname, "../dist/index.html"),
      { encoding: "utf8" }
    );
    let appHTML = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={componentData}>
        <App />
      </StaticRouter>
    );
    indexHTML = indexHTML.replace(
      '<div id="root"></div>',
      `<div id="root">${appHTML}</div>`
    );
    res.contentType("text/html");
    res.status(200);
    return res.send(indexHTML);
  } catch (error) {
    console.error(error);
  }
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
