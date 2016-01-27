var gulp = require('gulp');
var runSequence = require('run-sequence');

var config = require('../config');

// development
gulp.task('development', function() {
  console.log('development');
  return runSequence(['clean', 'setEnvDevelopment'],
    ['html', 'css',
  // 'js',
  'watch'], 'server');
});

gulp.task('setEnvDevelopment', function() {
  return gulp.src('env/development/Env.js')
    .pipe(gulp.dest('env'));
});
