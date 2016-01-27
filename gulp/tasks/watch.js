var gulp = require('gulp');

var config  = require('../config');

// watch
gulp.task('watch', function(){

  // html
  gulp.watch(config.src.html + '**/*.jade', function() {
    config.isHtmlAllFlag = false;
    gulp.start('html');
  });

  // css
  gulp.watch(config.src.css + '**/*.sass', ['css']);

  // img
  gulp.watch(config.src.img+'**/*.png', function() {
    gulp.start('imgMinPng');
  });

  // ファイルが追加された時にも実行
  gulp.watch(config.src.img+'**/*.+(jpg|jpeg|gif|svg)', function() {
    gulp.start('imgMin');
  });

});

