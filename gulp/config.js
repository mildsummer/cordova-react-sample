var src     = 'source/';
var build = 'build/';

// root path
var root = require('path').join(__dirname, '../');

module.exports = {
  // root
  'root' : root,

  // flag処理
  'isBuildFlag' : false,
  'isEjsAllFlag'  : true,

  'src': {
    'root'   : src,
    'html'   : src,
    'css'    : src + 'stylesheets/',
    'js'     : src + 'javascripts/'
  },

  'build': {
    'root'   : build,
    'html'   : build + 'www/',
    'css'    : build + 'www/stylesheets/',
    'js'     : build + 'www/javascripts/'
  },

  // cleanするディレクトリ
  'clean': [
    build + 'plugins',
    build + 'platforms',
    build + 'www'
  ]
};