import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

import webpack from 'webpack';
import webpackConfig from '../../webpack.config.babel.production';

// product build
// コンパイルされたjsファイルを生成
gulp.task('js:prod', () => {
  const webpackSetting = webpack(webpackConfig);
  webpackSetting.run((err, stats) => {
    if(err){
      throw new Error('webpack build failed');
    }
    $.util.log(stats.toString({
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: true,
      chunkModules: false
    }));
  });
});
