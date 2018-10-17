const postcssPresetEnv = require('postcss-preset-env');
const paths = require('./config/paths');

module.exports = {
  plugins: [
    require('postcss-import')({
      path: paths.srcStyle,
    }),
    require('postcss-nested')(),
    require('postcss-flexbugs-fixes')(),
    require('autoprefixer')({
      browsers: ['last 3 versions', 'IE >= 9', 'Edge <= 15'],
    }),
    require('postcss-each')(),
    require('postcss-advanced-variables')(),
    require('postcss-easy-media-query')({
      breakpoints: {
        sm: '544px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
      },
    }),
    postcssPresetEnv({
      browsers: 'last 2 versions',
      stage: 2,
      features: {
        'nesting-rules': true,
        'color-mod-function': {
          unresolved: 'warn',
        },
      },
    }),
  ],
  sourceMap: true,
};
