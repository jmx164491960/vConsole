const pkg = require('./package.json');
const Webpack = require('webpack');
const Path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: false,
  entry: {
    vcnetwork : Path.resolve(__dirname, './src/vconsole.js')
  },
  output: {
    path: Path.resolve(__dirname, './dist'),
    filename: '[name].min.js',
    library: 'VCnetwork',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.html$/, loader: 'html-loader?minimize=false'
      },
      {
        test: /\.js$/, loader: 'babel-loader'
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      }
    ]
  },
  stats: {
    colors: true,
  },
  plugins: [
    new Webpack.BannerPlugin([
        'vConsole v' + pkg.version + ' (' + pkg.homepage + ')',
        '',
    ].join('\n')),
    new CopyWebpackPlugin([
      {
        from: Path.resolve(__dirname, './src/vconsole.d.ts'),
        to: Path.resolve(__dirname, './dist/vcnetwork.min.d.ts')
      }
    ])
  ]
};