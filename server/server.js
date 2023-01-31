// File: server.js
import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
const {StaticRouter, matchPath} = require("react-router-dom");
import App from "../src/App";
const path = require("path");

const app = express();

app.use(express.static('dist'));
// app.use(express.static(path.resolve(__dirname,'...','build')));

app.get("*", (req, res) => {
  const context = {};
  
 
  const html = renderToString(
  
    <StaticRouter location={req.url} context={context}>
    <App />
  </StaticRouter>
  
  );

  if (context.url) {
    res.redirect(context.url);
  } else {
    res.send(`
      <html>
        <head>
          <title>React SSR</title>
        </head>
        <body>
          <div id="root">${html}</div>
          <script src="/bundle.js" defer></script>
        </body>
      </html>
    `);
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
