const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/gameFlow.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  }
}
//note: to use webpack
//1. npm install webpack webpack-cli --save-dev
//2. in package.json add script "build": "webpack"
//3. create webpack.config.js  and  add the code above
//4. create src folder and put all needed js in
//5. check the path is correct
//6. npm run build  in terminal , to create bundle.js
