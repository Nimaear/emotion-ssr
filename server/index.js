require('colors');
const express = require('express');
const webpack = require('webpack');
const noFavicon = require('express-no-favicons');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const clientConfig = require('../webpack/client.dev');
const serverConfig = require('../webpack/server.dev');
const clientConfigProd = require('../webpack/client.prod');
const serverConfigProd = require('../webpack/server.prod');
const pino = require('express-pino-logger')();
const bodyParser = require('body-parser');
const session = require('express-session');

const { publicPath } = clientConfig.output;
const outputPath = clientConfig.output.path;
const DEV = process.env.NODE_ENV === 'development';
const app = express();
app.use(noFavicon());
app.use(bodyParser.json());
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use((req, res, next) => {
  if (!req.session.user) {
    req.session.user = {
      viewMode: 'normal',
    };
  }
  next();
});

app.use('/api/settings', (req, res) => {
  try {
    const { settings } = req.body;
    req.session.user = {
      ...req.session.user,
      ...settings,
    };
    res.json({
      settings: req.session.user,
    });
  } catch (e) {
    res.json({
      error: e.message,
    });
  }
});

let isBuilt = false;

const done = () =>
  !isBuilt &&
  app.listen(3001, () => {
    isBuilt = true;
    console.log('BUILD COMPLETE -- Listening @ http://localhost:3001'.magenta);
  });

if (DEV) {
  const compiler = webpack([clientConfig, serverConfig]);
  const clientCompiler = compiler.compilers[0];
  const options = { publicPath, stats: { colors: true } };
  const devMiddleware = webpackDevMiddleware(compiler, options);

  // app.use(pino);
  app.use(devMiddleware);
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(webpackHotServerMiddleware(compiler));

  devMiddleware.waitUntilValid(done);
} else {
  webpack([clientConfigProd, serverConfigProd]).run((err, stats) => {
    const clientStats = stats.toJson().children[0];
    const serverRender = require('../build/server/main.js').default;
    // app.use(pino);
    app.use(publicPath, express.static(outputPath));
    app.use(serverRender({ clientStats }));

    done();
  });
}
