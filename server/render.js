import React from 'react';
import { renderToString } from 'react-dom/server';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import App from '../src/components/App';

const generateHtml = (clientStats, app) => {
  const chunkNames = flushChunkNames();

  const { js } = flushChunks(clientStats, { chunkNames });

  const html = [
    '<!doctype html>',
    '<html>',
    '<head>',
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1" />',
    '<link href="https://fonts.googleapis.com/css?family=Nunito:300,400,600,700" rel="stylesheet">',
    '</head>',
    '<body>',
    `<div id="root">${renderToString(app)}</div>`,
    js,
    '</body>',
    '</html>',
  ]
    .filter((h) => !!h)
    .join('');

  return html;
};

export default ({ clientStats }) => (req, res, next) => {
  const app = <App />;

  const html = generateHtml(clientStats, app);
  res.send(html);
};
