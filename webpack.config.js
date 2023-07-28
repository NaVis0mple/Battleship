const path = require('path')

module.exports = {
  entry: './src/gameFlow.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  }
}
