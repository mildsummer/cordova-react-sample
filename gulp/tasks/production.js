var gulp = require('gulp');
var runSequence = require('run-sequence');

var config = require('../config');

// production
gulp.task('production', function() {
  return runSequence(
    ['clean', 'setEnvProduction'],
    ['html', 'css', 'js:prod'],
    'setConfigProduction');
});

gulp.task('setEnvProduction', function() {
  return gulp.src('env/production/Env.js')
    .pipe(gulp.dest('env'));
});

gulp.task('setConfigProduction', function() {
  return gulp.src('env/production/config.xml')
    .pipe(gulp.dest(config.build.root));
});