const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry:"./script.js",
  output: {
    path: path.resolve(__dirname, '../docs'),
    filename: 'bundle.js',
    clean: true
  },
  mode: 'production',
  plugins: [
    new CopyPlugin({
      patterns: [
        {from: path.resolve(__dirname, 'index.html'), to: path.resolve(__dirname, '../docs/index.html')},
        {from: path.resolve(__dirname, 'style.css'), to: path.resolve(__dirname, '../docs/style.css')}
      ]
    })
  ],
  devtool: "source-map"
};
