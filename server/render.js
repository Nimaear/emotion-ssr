import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from 'store';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import Helmet from 'react-helmet';
import reactTreeWalker from 'react-tree-walker';
import App from '../src/components/App';

const generateHtml = (clientStats, store, app) => {
  const chunkNames = flushChunkNames();

  const initialData = JSON.stringify({
    state: store.getState(),
  });

  const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames });

  const head = Helmet.renderStatic();

  const html = [
    '<!doctype html>',
    '<html>',
    '<head>',
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1" />',
    '<link href="https://fonts.googleapis.com/css?family=Nunito:300,400,600,700" rel="stylesheet">',
    head.base.toString(),
    head.title.toString(),
    head.meta.toString(),
    head.link.toString(),
    head.script.toString(),
    styles,
    '</head>',
    '<body>',
    `<div id="root">${renderToString(app)}</div>`,
    `<script>window.__INITIAL_DATA__ = ${initialData}</script>`,
    cssHash,
    js,
    '</body>',
    '</html>',
  ]
    .filter((h) => !!h)
    .join('');

  return html;
};

export default ({ clientStats }) => (req, res, next) => {
  const settings = req.session ? req.session.user : {};
  const { store, getRootTask } = configureStore({
    initialState: {
      app: {
        settings,
      },
    },
    middleware: [],
  });

  const { url } = req;
  const context = {};
  const app = (
    <Provider store={store}>
      <StaticRouter location={url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );

  const visitor = async (element, instance) => {
    if (instance && typeof instance.getData === 'function') {
      instance.getData();
    }
    if (instance && instance.handlers && typeof instance.handlers.getData === 'function') {
      instance.handlers.getData();
    }
    return true;
  };

  const finalize = () => {
    const html = generateHtml(clientStats, store, app);
    store.close();
    getRootTask().done.then(() => {
      res.send(html);
    });
  };

  reactTreeWalker(app, visitor)
    .then(() => {
      store.close();
      return getRootTask().done;
    })
    .then(() => finalize())
    .catch((err) => next(err));
};
