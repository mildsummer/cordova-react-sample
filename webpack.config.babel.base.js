import path from 'path';

export default {
  contentBase: path.resolve(__dirname, 'source'),

  cache: true,

  entry: [],

  output: {
    // build時のパス
    path: path.join(__dirname, 'build', 'www', 'javascripts'),
    // devServerのパス
    publicPath: '/javascripts/',
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
    sourceMapFilename: '[name].map'
  },

  module: {
    preLoaders: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|bower_components)/,
      include: __dirname,
      loaders: ['eslint']
    }],

    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        include: __dirname,
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ],

    modulesDirectories: ['src', 'src/js', 'web_modules', 'bower_components', 'node_modules'],

    alias:{}
  },

  eslint: { fix: true },

  resolve:{
    extensions: ['', '.js', '.jsx', '.json']
  }
};
