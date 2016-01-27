var gulp = require('gulp');
var replace = require('gulp-replace');

var config  = require('../config');

// html
gulp.task('html', function() {
  var Env = require('../../env/Env');
  var domains = Object.keys(Env.serverDomains).map(function(key) {
    return Env.serverDomains[key]
  }).join(' ');
  return gulp.src(config.src.html + 'index.html')
    .pipe(replace('__SERVER_DOMAINS__', domains))
    .pipe(gulp.dest(config.build.html));
});