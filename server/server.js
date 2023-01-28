// server.js
const express = require('express');
const { renderToString } = require('react-dom/server');
const React = require('react');
const Home = require('../src/App').default;


const app = express();

// app.use(express.static('dist'));
app.use('/',express.static('dist'));

app.get('/', (req, res) => {
  const content = renderToString(<Home />);

  res.send(`
    <html>
      <head>
        <title>SSR with React</title>
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="bundle.js"></script>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
