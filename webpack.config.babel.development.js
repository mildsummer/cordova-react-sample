import baseConfig from './webpack.config.babel.base';
import webpack from 'webpack';

// 開発用Webpack

const config = Object.create(baseConfig);
config.entry = [
  'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
  './source/javascripts/main.jsx'
];

config.debug = true;
config.devtool = '#source-map';

config.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  }),
];

export default config;
