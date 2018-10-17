//@flow
const paths = require('../config/paths');

module.exports = {
  extensions: ['.js', '.mjs', '.json', '.jsx', '.css'],
  modules: paths.resolveModules,
  alias: {
    '../../theme.config$': `${paths.srcStyle}/semantic-theme/theme.config`,
  },
};
