import React from 'react';
import lodash from 'lodash';
import { renderToNodeStream } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './store/configure-store';

const DELIMITER = 'UniqueTemplateDelimiter';

const getTemplate = (app, preloadedState) => `
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <meta name="theme-color" content="#000000">
          <link rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/foundation/6.4.3/css/foundation.min.css"
                integrity="sha256-GSio8qamaXapM8Fq9JYdGNTvk/dgs+cMLgPeevOYEx0="
                crossorigin="anonymous" />
          <title>React App</title>
        </head>
        <body>
          <noscript>
            You need to enable JavaScript to run this app.
          </noscript>
          <div id="root">${app}</div>
          <script>
            window.PRELOADED_STATE = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
          </script>
          <script src="/public/dist/client-bundle.js"></script>
        </body>
    </html>`;

export default (req, res) => {
  res.setHeader('content-type', 'text/html');
  const context = {};
  const store = configureStore();

  const app = (
    <Provider store={store}>
      <Router location={req.url} context={context}>
        <App />
      </Router>
    </Provider>
  );

  if (context.url) {
    return res.redirect(context.url);
  }

  const streamApp = renderToNodeStream(app);
  const preloadedState = store.getState();
  const templateParts = getTemplate(DELIMITER, preloadedState).split(DELIMITER);

  res.write(lodash.first(templateParts));
  streamApp.pipe(res, { end: false });
  streamApp.on('end', () => {
    res.write(lodash.last(templateParts));
    res.end();
  });
};
