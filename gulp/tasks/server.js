var gulp = require('gulp');
var browserSync = require('browser-sync');

var config  = require('../config');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const webpackConfig = require('../../webpack.config.babel.development');
const bundler = webpack(webpackConfig);

gulp.task('server', function() {
  browserSync({
    notify: false,
    port: 3000,
    open: false,
    reloadOnRestart: true,
    server: {
      baseDir: config.build.html,
      routes: {},
      middleware: [
        webpackDevMiddleware(bundler, {
          publicPath: webpackConfig.output.publicPath,
          noInfo: false,
          quiet: false,
          stats: {
            colors: true,
            version: false,
            hash: false,
            timings: false,
            chunks: true,
            chunkModules: false
          }
        }),
        webpackHotMiddleware(bundler)
      ]
    }
  });
});
