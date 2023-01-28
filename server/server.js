// server.js
const express = require('express');
const { renderToString } = require('react-dom/server');
const React = require('react');
const Home = require('../src/App').default;
import StyleContext from 'isomorphic-style-loader-react18/StyleContext'



const app = express();

// app.use(express.static('dist'));
app.use('/',express.static('dist'));

app.get('/', (req, res) => {
  const content = renderToString(<Home />);
  const css = new Set() // CSS for all rendered React components
  const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()))

  const body = ReactDOM.renderToString(
    <StyleContext.Provider value={{ insertCss }}>
      <Home />
    </StyleContext.Provider>
  )


  res.send(`

    <html>
      <head>
      
        <title>SSR with React</title>
          <style>${[...css].join('')}</style>
      </head>
      <body>
      <div id="root">${body}</div>
        <script src="bundle.js"></script>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
