const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
module.exports = {
    entry: {
        Shell: './components/main/Shell.component.js'
    },
    output: {
        path: path.resolve(__dirname,'build'),
        filename: '[name].component.min.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: [/node_modules/],
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react']
            }
        }]
    },
    plugins : [new uglify()]
}